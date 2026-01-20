"use client";

import { MapPin, Navigation, Copy, Check, ExternalLink } from "lucide-react";
import { CONTACT_INFO } from "@/config/seo/contact.metadata";
import { useCopyToClipboard } from "@/hooks/contact";
import SectionHeading from "@/components/shared/SectionHeading";

export default function MapSection() {
  const { handleCopy, isCopied } = useCopyToClipboard();

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-gradient-to-br from-indigo-100/50 to-purple-100/50 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-48 h-48 bg-gradient-to-br from-pink-100/40 to-rose-100/40 rounded-full blur-3xl"></div>

      <div className="max-w-2xl mx-auto relative z-10">
        <SectionHeading
          badge={
            <>
              <MapPin className="w-4 h-4" />
              <span>ที่ตั้ง</span>
            </>
          }
          title="แผนที่ตั้งโรงงาน"
        />

        {/* Floating Address Card */}
        <div className="mb-6 bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-gray-100/80 relative">
          {/* Accent Line */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-500 to-pink-600 rounded-l-2xl"></div>

          <div className="flex items-center gap-4 pl-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg shrink-0">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 mb-1">
                ที่อยู่โรงงาน
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {CONTACT_INFO.address.full}
              </p>
            </div>
          </div>
        </div>

        {/* Map Container with Gradient Border */}
        <div className="relative group">
          {/* Animated Gradient Border */}
          <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 rounded-3xl opacity-70 blur group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Map Frame */}
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
            {/* Location Pin Animation */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
              <div className="flex flex-col items-center animate-bounce-gentle">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="w-2 h-2 bg-rose-500 rounded-full mt-1 opacity-50"></div>
              </div>
            </div>

            {/* Map iframe */}
            <div className="relative w-full" style={{ paddingBottom: "70%" }}>
              <iframe
                src={CONTACT_INFO.googleMaps.embedUrl}
                className="absolute top-0 left-0 w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="แผนที่ตั้งโรงงาน ธน พลัส 153"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">
          <a
            href={CONTACT_INFO.googleMaps.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            <Navigation className="w-5 h-5" />
            <span>นำทาง</span>
            <ExternalLink className="w-4 h-4 opacity-70" />
          </a>
          <button
            onClick={() => handleCopy(CONTACT_INFO.address.full, "address")}
            className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 ${
              isCopied("address")
                ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                : "bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300"
            }`}
          >
            {isCopied("address") ? (
              <>
                <Check className="w-5 h-5" />
                <span>คัดลอกแล้ว!</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                <span>คัดลอกที่อยู่</span>
              </>
            )}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-gentle {
          0%,
          100% {
            transform: translateY(0) translateX(-50%);
          }
          50% {
            transform: translateY(-10px) translateX(-50%);
          }
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
