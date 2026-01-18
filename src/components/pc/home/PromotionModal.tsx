"use client";

import { X, Gift, Clock, Percent } from "lucide-react";
import { usePromotion } from "@/hooks/usePromotion";

export default function PromotionModal() {
  const { isOpen, timeLeft, closePromo } = usePromotion();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
        onClick={closePromo}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-3xl shadow-2xl overflow-hidden animate-scaleIn">
        {/* Close Button */}
        <button
          onClick={closePromo}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-1/4 translate-y-1/4" />

        {/* Content */}
        <div className="relative p-8 text-center text-white">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 mb-6">
            <Gift className="w-10 h-10" />
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">
            โปรโมชั่นพิเศษ!
          </h2>
          <p className="text-white/80 mb-6">เฉพาะลูกค้าใหม่เท่านั้น</p>

          {/* Discount Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-indigo-600 font-bold text-2xl sm:text-3xl mb-6 shadow-xl">
            <Percent className="w-8 h-8" />
            <span>ลด 70%</span>
          </div>

          {/* Countdown */}
          <div className="mb-6">
            <div className="flex items-center justify-center gap-1 text-white/80 mb-3">
              <Clock className="w-4 h-4" />
              <span className="text-sm">เหลือเวลาอีก</span>
            </div>
            <div className="flex justify-center gap-3">
              {[
                { value: timeLeft.days, label: "วัน" },
                { value: timeLeft.hours, label: "ชม." },
                { value: timeLeft.minutes, label: "นาที" },
                { value: timeLeft.seconds, label: "วิ" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center bg-white/20 rounded-xl px-3 py-2 min-w-[60px]"
                >
                  <span className="text-2xl sm:text-3xl font-bold">
                    {String(item.value).padStart(2, "0")}
                  </span>
                  <span className="text-xs text-white/80">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={closePromo}
            className="w-full py-4 rounded-full bg-white text-indigo-600 font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
          >
            รับสิทธิ์เลย!
          </button>

          <p className="mt-4 text-sm text-white/60">
            *เงื่อนไขเป็นไปตามที่บริษัทกำหนด
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
