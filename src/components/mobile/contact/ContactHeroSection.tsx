"use client";

import { Mail, Phone, MessageCircle } from "lucide-react";

export default function ContactHeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-20 px-6 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-white/30 to-purple-300/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-pink-300/20 to-white/30 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-300/10 to-purple-300/10 rounded-full blur-3xl animate-pulse-slow"></div>

        {/* Mesh Grid Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                           linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-8 animate-float-gentle">
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <Mail className="w-6 h-6 text-white/80" />
          </div>
        </div>
        <div className="absolute top-32 right-12 animate-float-delayed">
          <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <Phone className="w-7 h-7 text-white/80" />
          </div>
        </div>
        <div className="absolute bottom-24 right-8 animate-float-gentle">
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white/80" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center animate-fade-in-up">
        {/* Glassmorphism Container */}
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            <span className="inline-block animate-slide-in-left">ติดต่อ</span>
            <span className="block mt-2 bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent animate-slide-in-right">
              เรา
            </span>
          </h1>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-white to-transparent rounded-full mb-6 animate-scale-in"></div>
          <p className="text-lg text-white/90 leading-relaxed animate-fade-in delay-100">
            ยินดีให้คำปรึกษาและรับฟังความต้องการของคุณ
            <br />
            <span className="inline-block mt-2 font-medium text-white">
              ติดต่อเราได้ทุกช่องทาง พร้อมให้บริการ
            </span>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-30px, 30px) scale(1.1);
          }
          66% {
            transform: translate(20px, -20px) scale(0.9);
          }
        }

        @keyframes float-gentle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scale-in {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 25s ease-in-out infinite;
        }

        .animate-float-gentle {
          animation: float-gentle 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-scale-in {
          animation: scale-in 0.6s ease-out 0.4s forwards;
          transform: scaleX(0);
        }

        .animate-fade-in {
          animation: fade-in-up 0.8s ease-out 0.6s forwards;
          opacity: 0;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }
      `}</style>
    </section>
  );
}
