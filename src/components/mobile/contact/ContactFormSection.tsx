"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {
      name: "",
      phone: "",
      email: "",
      message: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "กรุณากรอกชื่อ-นามสกุล";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "กรุณากรอกเบอร์โทรศัพท์";
    } else if (!/^[0-9]{9,10}$/.test(formData.phone.replace(/-/g, ""))) {
      newErrors.phone = "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง";
    }

    if (!formData.email.trim()) {
      newErrors.email = "กรุณากรอกอีเมล";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "กรุณากรอกอีเมลให้ถูกต้อง";
    }

    if (!formData.message.trim()) {
      newErrors.message = "กรุณากรอกข้อความ";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // TODO: Implement actual API call here
    console.log("Form submitted:", formData);

    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Reset form
    setFormData({
      name: "",
      phone: "",
      email: "",
      message: "",
    });

    // Hide success message after 5 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <section className="py-12 px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          ส่งข้อความถึงเรา
        </h2>
        <p className="text-gray-600 text-center mb-8">
          กรอกแบบฟอร์มด้านล่าง ทีมงานจะติดต่อกลับโดยเร็วที่สุด
        </p>

        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
            <p className="text-green-800 text-center font-medium">
              ส่งข้อความสำเร็จ! เราจะติดต่อกลับโดยเร็วที่สุด
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              ชื่อ-นามสกุล <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.name
                  ? "border-red-300 bg-red-50"
                  : "border-gray-200 bg-gray-50"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
              placeholder="กรุณากรอกชื่อ-นามสกุล"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              เบอร์โทรศัพท์ <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.phone
                  ? "border-red-300 bg-red-50"
                  : "border-gray-200 bg-gray-50"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
              placeholder="0XX-XXX-XXXX"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              อีเมล <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.email
                  ? "border-red-300 bg-red-50"
                  : "border-gray-200 bg-gray-50"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
              placeholder="example@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              ข้อความ / รายละเอียด <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.message
                  ? "border-red-300 bg-red-50"
                  : "border-gray-200 bg-gray-50"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none`}
              placeholder="กรุณาระบุรายละเอียดที่ต้องการสอบถาม..."
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">{errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>กำลังส่ง...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>ส่งข้อความ</span>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
