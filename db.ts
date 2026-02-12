
/**
 * Al-Areiqi Industrial Local Engine (v10.0 Production Edition)
 * Pure IndexedDB persistence layer for Frontend-only deployment.
 */

export interface Project {
  id?: number;
  title: string;
  category: string;
  image: string;
  description: string;
  status?: 'published' | 'draft' | 'archived';
  createdAt?: string;
  updatedAt?: string;
  location?: string;
  client_name?: string;
  end_date?: string;
}

export interface User {
  id?: number;
  name: string;
  username: string;
  password?: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'VIEWER';
  status: 'active' | 'suspended';
  permissions?: Record<string, string[]>;
}

export interface Settings {
  id: string;
  logo: string;
  heroImage: string;
  maintenanceMode: boolean;
  theme: 'dark' | 'light';
  announcement?: string;
}

const DB_NAME = 'AreiqiIndustrial_v10';
const DB_VERSION = 1;
const STORES = ['projects', 'gallery', 'messages', 'partners', 'settings', 'users', 'activity_logs', 'trash'];

const listeners: Record<string, Set<(data: any) => void>> = {};

function notify(store: string, data: any) {
  if (listeners[store]) {
    listeners[store].forEach(callback => callback(data));
  }
}

const dbPromise: Promise<IDBDatabase> = new Promise((resolve, reject) => {
  const request = indexedDB.open(DB_NAME, DB_VERSION);

  request.onupgradeneeded = (event: any) => {
    const db = event.target.result;
    STORES.forEach(store => {
      if (!db.objectStoreNames.contains(store)) {
        db.createObjectStore(store, { keyPath: 'id', autoIncrement: true });
      }
    });
  };

  request.onsuccess = () => resolve(request.result);
  request.onerror = () => reject(request.error);
});

export const compressImage = (file: File, maxWidth = 1000, quality = 0.6): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
    };
  });
};

export const db = {
  async logActivity(action: string, details: string) {
    const user = this.getCurrentUser();
    const log = {
      user: user?.name || 'Guest',
      role: user?.role || 'VIEWER',
      action,
      details,
      createdAt: new Date().toISOString()
    };
    await this.addItem('activity_logs', log, false);
  },

  async uploadMediaBatch(storeName: string, files: File[]) {
    for (const file of files) {
      try {
        const compressed = await compressImage(file);
        await this.addItem(storeName, { image: compressed });
      } catch (err) {}
    }
  },

  async getItems(storeName: string): Promise<any[]> {
    const database = await dbPromise;
    return new Promise((resolve) => {
      const transaction = database.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();
      request.onsuccess = () => {
        const data = request.result.sort((a, b) => 
          new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        );
        resolve(data);
      };
    });
  },

  async addItem(storeName: string, data: any, log = true) {
    const database = await dbPromise;
    const item = { ...data, createdAt: new Date().toISOString(), status: data.status || 'published' };
    return new Promise((resolve, reject) => {
      const transaction = database.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(item);
      request.onsuccess = async (e: any) => {
        const result = { ...item, id: e.target.result };
        if (log) await this.logActivity('إضافة', `${storeName}`);
        const all = await this.getItems(storeName);
        notify(storeName, all);
        resolve(result);
      };
      request.onerror = () => reject(request.error);
    });
  },

  async updateItem(storeName: string, id: any, updates: any) {
    const database = await dbPromise;
    const transaction = database.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    return new Promise((resolve, reject) => {
      const getReq = store.get(id);
      getReq.onsuccess = () => {
        const original = getReq.result || {};
        const updated = { ...original, ...updates, id, updatedAt: new Date().toISOString() };
        const putReq = store.put(updated);
        putReq.onsuccess = async () => {
          await this.logActivity('تعديل', `${storeName}`);
          const all = await this.getItems(storeName);
          notify(storeName, all);
          resolve(updated);
        };
      };
      getReq.onerror = () => reject(getReq.error);
    });
  },

  async deleteItem(storeName: string, id: any, soft = true) {
    const database = await dbPromise;
    if (soft && storeName !== 'trash' && storeName !== 'activity_logs') {
      const transaction = database.transaction([storeName, 'trash'], 'readwrite');
      const mainStore = transaction.objectStore(storeName);
      const trashStore = transaction.objectStore('trash');
      
      return new Promise((resolve) => {
        const getReq = mainStore.get(id);
        getReq.onsuccess = () => {
          const item = getReq.result;
          if (item) {
            trashStore.add({ ...item, originalStore: storeName, deletedAt: new Date().toISOString() });
            mainStore.delete(id);
          }
        };
        transaction.oncomplete = async () => {
          const all = await this.getItems(storeName);
          notify(storeName, all);
          notify('trash', await this.getItems('trash'));
          resolve(true);
        };
      });
    }

    return new Promise((resolve) => {
      const transaction = database.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);
      request.onsuccess = async () => {
        const all = await this.getItems(storeName);
        notify(storeName, all);
        resolve(true);
      };
    });
  },

  async getSettings(): Promise<Settings> {
    const database = await dbPromise;
    return new Promise((resolve) => {
      const transaction = database.transaction('settings', 'readonly');
      const store = transaction.objectStore('settings');
      const request = store.get('main_config');
      request.onsuccess = () => resolve(request.result || {
        id: 'main_config',
        logo: 'https://engaliareeki.github.io/web/assets/images/logo.png',
        heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
        maintenanceMode: false,
        theme: 'dark'
      });
    });
  },

  async updateSettings(updates: Partial<Settings>) {
    const database = await dbPromise;
    const current = await this.getSettings();
    const transaction = database.transaction('settings', 'readwrite');
    const store = transaction.objectStore('settings');
    const item = { ...(current || {}), ...(updates || {}), id: 'main_config' };
    return new Promise((resolve) => {
      const request = store.put(item);
      request.onsuccess = () => { notify('settings', item); resolve(item); };
    });
  },

  async login(username: string, password: string): Promise<User> {
    if (username === 'admin' && password === 'sami2025') {
      const admin: User = { id: 0, name: 'Sami Al-Areiqi', username: 'admin', role: 'SUPER_ADMIN', status: 'active', permissions: { all: [] } };
      localStorage.setItem('areiqi_session_v10', JSON.stringify(admin));
      notify('auth', { user: admin });
      return admin;
    }
    const users = await this.getItems('users');
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('areiqi_session_v10', JSON.stringify(user));
      notify('auth', { user });
      return user;
    }
    throw new Error("بيانات الدخول خاطئة");
  },

  logout() {
    localStorage.removeItem('areiqi_session_v10');
    notify('auth', { user: null });
  },

  getCurrentUser(): User | null {
    const session = localStorage.getItem('areiqi_session_v10');
    return session ? JSON.parse(session) : null;
  },

  onAuthChange(callback: (user: any) => void): () => void {
    callback(this.getCurrentUser());
    const wrapped = (data: any) => callback(data.user);
    (listeners['auth'] = listeners['auth'] || new Set()).add(wrapped);
    return () => { listeners['auth']?.delete(wrapped); };
  },

  listenProjects: (cb: any) => { db.getItems('projects').then(cb); (listeners['projects'] = listeners['projects'] || new Set()).add(cb); return () => { listeners['projects']?.delete(cb); }; },
  listenGallery: (cb: any) => { db.getItems('gallery').then(cb); (listeners['gallery'] = listeners['gallery'] || new Set()).add(cb); return () => { listeners['gallery']?.delete(cb); }; },
  listenMessages: (cb: any) => { db.getItems('messages').then(cb); (listeners['messages'] = listeners['messages'] || new Set()).add(cb); return () => { listeners['messages']?.delete(cb); }; },
  listenPartners: (cb: any) => { db.getItems('partners').then(cb); (listeners['partners'] = listeners['partners'] || new Set()).add(cb); return () => { listeners['partners']?.delete(cb); }; },
  listenUsers: (cb: any) => { db.getItems('users').then(cb); (listeners['users'] = listeners['users'] || new Set()).add(cb); return () => { listeners['users']?.delete(cb); }; },
  listenSettings: (cb: any) => { db.getSettings().then(cb); (listeners['settings'] = listeners['settings'] || new Set()).add(cb); return () => { listeners['settings']?.delete(cb); }; },
  listenActivity: (cb: any) => { db.getItems('activity_logs').then(cb); (listeners['activity_logs'] = listeners['activity_logs'] || new Set()).add(cb); return () => { listeners['activity_logs']?.delete(cb); }; },
  listenTrash: (cb: any) => { db.getItems('trash').then(cb); (listeners['trash'] = listeners['trash'] || new Set()).add(cb); return () => { listeners['trash']?.delete(cb); }; },

  async initializeDefaults() {
    const users = await this.getItems('users');
    if (users.length === 0) {
      await this.addItem('users', { 
        name: 'Sami Admin', username: 'admin', password: 'password', role: 'ADMIN', status: 'active',
        permissions: { projects: ['view', 'add', 'edit', 'delete'] } 
      }, false);
    }
  },

  async getSpecializations() {
    return [
      { title: "أتمتة المصانع", description: "نظم تحكم رقمي متطورة", icon: "PLC", unit: "UNIT_A1" },
      { title: "مجموعات التوليد", description: "صيانة وتركيب المولدات الضخمة", icon: "Generator", unit: "UNIT_G2" },
      { title: "التحكم والمراقبة", description: "أنظمة SCADA و HMI", icon: "Control", unit: "UNIT_C3" },
      { title: "الطاقة الهجينة", description: "حلول طاقة شمسية وديزل", icon: "Battery", unit: "UNIT_P4" }
    ];
  },
  initNotifications: () => {},
  sendMessage: async (data: any) => { await db.addItem('messages', data); return { success: true }; }
};

export const optimizeImageUrl = (url: string, _w?: number, _q?: number) => url;
