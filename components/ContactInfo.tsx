
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const ContactInfo = () => {
  const email = "engaliareeki@yahoo.com";
  const phone = "+967777403614";
  const location = "صنعاء - الدائري - جوار شركة سويد";

  const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:العريقي للهندسة
TEL:${phone}
EMAIL:${email}
ADR:;;${location};;;;
END:VCARD`;

  return (
    <div className="py-6 md:py-12 font-['Tajawal']" dir="rtl">
      <div className="max-w-3xl mx-auto px-4">
        
        {/* Compact Industrial Card */}
        <div className="relative group bg-slate-900 border border-white/10 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-500 hover:border-yellow-500/30">
          
          {/* Internal Grid - Responsive Layout */}
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 p-6 md:p-10">
            
            {/* Left: QR Code (Digital Link) */}
            <div className="shrink-0">
              <div className="relative p-3 bg-white rounded-2xl md:rounded-3xl shadow-lg transition-transform group-hover:rotate-3">
                <QRCodeSVG value={vCardData} size={110} level={"H"} />
              </div>
            </div>

            {/* Right: Info & Actions */}
            <div className="flex-1 text-center md:text-right space-y-4 w-full">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-0.5 bg-yellow-500/10 rounded-full mb-1">
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></span>
                  <span className="text-yellow-500 font-black text-[8px] uppercase tracking-widest">Live_Support</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white leading-none">تواصل <span className="text-yellow-500">مباشر</span></h3>
              </div>

              {/* Action Buttons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Phone Link */}
                <a href={`tel:${phone}`} className="flex items-center justify-center md:justify-start gap-3 p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-yellow-500 hover:text-slate-950 transition-all">
                  <div className="w-8 h-8 bg-slate-950 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M3 5.25a.75.75 0 01.75-.75H8.1a.75.75 0 01.704.493l1.1 3.3a.75.75 0 01-.19.824l-1.92 1.92a15.42 15.42 0 006.52 6.52l1.92-1.92a.75.75 0 01.824-.19l3.3 1.1a.75.75 0 01.493.704v4.35a.75.75 0 01-.75.75h-1.35C9.76 22.5 1.5 14.24 1.5 4.11V5.25z" /></svg>
                  </div>
                  <span className="font-black text-base" dir="ltr">777 403 614</span>
                </a>

                {/* Email Link */}
                <a href={`mailto:${email}`} className="flex items-center justify-center md:justify-start gap-3 p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-blue-600 transition-all overflow-hidden group/mail">
                  <div className="w-8 h-8 bg-slate-950 rounded-lg flex items-center justify-center text-blue-400 group-hover/mail:text-white">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <span className="font-black text-[11px] md:text-xs truncate">{email}</span>
                </a>
              </div>

              {/* Location Bar */}
              <div className="flex items-center justify-center md:justify-start gap-3 px-4 py-2 bg-white/[0.02] border border-white/5 rounded-xl text-slate-400 text-[10px] md:text-xs font-bold">
                <svg className="w-4 h-4 text-rose-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                {location}
              </div>
            </div>
          </div>

          {/* Bottom Terminal Bar */}
          <div className="bg-white/5 border-t border-white/5 px-6 py-2 flex items-center justify-between">
            <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Status: Ready</span>
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_5px_#10b981]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
