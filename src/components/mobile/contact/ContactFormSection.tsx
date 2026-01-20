"use client";

import {
  Send,
  User,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { useContactForm } from "@/hooks/contact";
import SectionHeading from "@/components/shared/SectionHeading";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function ContactFormSection() {
  const {
    form,
    isSubmitting,
    submitSuccess,
    onSubmit,
    completedFields,
    progressPercent,
  } = useContactForm();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    watch,
  } = form;

  const messageLength = watch("message")?.length || 0;

  const getFieldState = (fieldName: "name" | "phone" | "email" | "message") => {
    if (!touchedFields[fieldName]) return "default";
    if (errors[fieldName]) return "error";
    if (watch(fieldName)) return "success";
    return "default";
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-white via-indigo-50/30 to-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-pink-200/20 to-rose-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-2xl mx-auto relative z-10">
        <SectionHeading
          badge={
            <>
              <MessageSquare className="w-4 h-4" />
              <span>ส่งข้อความ</span>
            </>
          }
          title="ส่งข้อความถึงเรา"
          description="กรอกแบบฟอร์มด้านล่าง ทีมงานจะติดต่อกลับโดยเร็วที่สุด"
        />

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">ความสมบูรณ์ของฟอร์ม</span>
            <span className="font-medium text-indigo-600">
              {completedFields}/4 ช่อง
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="mb-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl shadow-lg animate-bounce-in">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-emerald-800 text-lg">
                  ส่งข้อความสำเร็จ! 🎉
                </h3>
                <p className="text-emerald-700">เราจะติดต่อกลับโดยเร็วที่สุด</p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Form Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100/80">
            <div className="space-y-5">
              {/* Name Field */}
              <div className="group">
                <label
                  htmlFor="name"
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"
                >
                  <User className="w-4 h-4 text-indigo-500" />
                  ชื่อ-นามสกุล <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    {...register("name")}
                    className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 outline-none text-gray-900
                      ${
                        getFieldState("name") === "error"
                          ? "border-red-300 bg-red-50 focus:border-red-400"
                          : getFieldState("name") === "success"
                            ? "border-emerald-300 bg-emerald-50 focus:border-emerald-400"
                            : "border-gray-200 bg-gray-50 focus:border-indigo-400 focus:bg-white"
                      }
                      focus:ring-4 focus:ring-indigo-100`}
                    placeholder="กรุณากรอกชื่อ-นามสกุล"
                  />
                  {getFieldState("name") === "success" && (
                    <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                  )}
                  {getFieldState("name") === "error" && (
                    <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                  )}
                </div>
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1 animate-shake">
                    <AlertCircle className="w-4 h-4" /> {errors.name.message}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div className="group">
                <label
                  htmlFor="phone"
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"
                >
                  <Phone className="w-4 h-4 text-emerald-500" />
                  เบอร์โทรศัพท์ <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    {...register("phone")}
                    className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 outline-none text-gray-900
                      ${
                        getFieldState("phone") === "error"
                          ? "border-red-300 bg-red-50 focus:border-red-400"
                          : getFieldState("phone") === "success"
                            ? "border-emerald-300 bg-emerald-50 focus:border-emerald-400"
                            : "border-gray-200 bg-gray-50 focus:border-indigo-400 focus:bg-white"
                      }
                      focus:ring-4 focus:ring-indigo-100`}
                    placeholder="0XX-XXX-XXXX"
                  />
                  {getFieldState("phone") === "success" && (
                    <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                  )}
                  {getFieldState("phone") === "error" && (
                    <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                  )}
                </div>
                {errors.phone && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1 animate-shake">
                    <AlertCircle className="w-4 h-4" /> {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="group">
                <label
                  htmlFor="email"
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"
                >
                  <Mail className="w-4 h-4 text-amber-500" />
                  อีเมล <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 outline-none text-gray-900
                      ${
                        getFieldState("email") === "error"
                          ? "border-red-300 bg-red-50 focus:border-red-400"
                          : getFieldState("email") === "success"
                            ? "border-emerald-300 bg-emerald-50 focus:border-emerald-400"
                            : "border-gray-200 bg-gray-50 focus:border-indigo-400 focus:bg-white"
                      }
                      focus:ring-4 focus:ring-indigo-100`}
                    placeholder="example@email.com"
                  />
                  {getFieldState("email") === "success" && (
                    <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                  )}
                  {getFieldState("email") === "error" && (
                    <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                  )}
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1 animate-shake">
                    <AlertCircle className="w-4 h-4" /> {errors.email.message}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div className="group">
                <label
                  htmlFor="message"
                  className="flex items-center justify-between text-sm font-semibold text-gray-700 mb-2"
                >
                  <span className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-purple-500" />
                    ข้อความ / รายละเอียด <span className="text-red-500">*</span>
                  </span>
                  <span
                    className={`text-xs ${messageLength > 450 ? "text-amber-600" : "text-gray-400"}`}
                  >
                    {messageLength}/500
                  </span>
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    {...register("message")}
                    rows={5}
                    maxLength={500}
                    className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 outline-none resize-none text-gray-900
                      ${
                        getFieldState("message") === "error"
                          ? "border-red-300 bg-red-50 focus:border-red-400"
                          : getFieldState("message") === "success"
                            ? "border-emerald-300 bg-emerald-50 focus:border-emerald-400"
                            : "border-gray-200 bg-gray-50 focus:border-indigo-400 focus:bg-white"
                      }
                      focus:ring-4 focus:ring-indigo-100`}
                    placeholder="กรุณาระบุรายละเอียดที่ต้องการสอบถาม..."
                  />
                </div>
                {errors.message && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1 animate-shake">
                    <AlertCircle className="w-4 h-4" /> {errors.message.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group w-full relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            <span className="relative flex items-center justify-center gap-3">
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" color="border-white" />
                  <span className="text-lg">กำลังส่ง...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
                  <span className="text-lg">ส่งข้อความ</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </span>
          </button>
        </form>
      </div>

      <style jsx>{`
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(-10px);
          }
          50% {
            transform: scale(1.02) translateY(0);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          20%,
          60% {
            transform: translateX(-5px);
          }
          40%,
          80% {
            transform: translateX(5px);
          }
        }

        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out forwards;
        }

        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </section>
  );
}
