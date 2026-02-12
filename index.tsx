
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// نظام حماية الصور: منع النقر بزر الفأرة الأيمن على الصور
document.addEventListener('contextmenu', (e) => {
  const target = e.target as HTMLElement;
  if (target && target.tagName === 'IMG') {
    e.preventDefault();
  }
}, false);

// نظام حماية الصور: منع سحب الصور وإفلاتها
document.addEventListener('dragstart', (e) => {
  const target = e.target as HTMLElement;
  if (target && target.tagName === 'IMG') {
    e.preventDefault();
  }
}, false);

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
