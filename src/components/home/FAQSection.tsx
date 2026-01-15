"use client";

import { useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { FAQ_DATA } from "@/config/content/faq.data";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-4">
            <MessageCircleQuestion className="w-4 h-4" />
            คำถามที่พบบ่อย
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ข้อสงสัยเกี่ยวกับการผลิตเสื้อ?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            รวมคำถามยอดฮิตจากลูกค้าของเรา หากมีข้อสงสัยเพิ่มเติม
            สามารถทักแชทสอบถามฝ่ายขายได้ตลอดเวลาครับ
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQ_DATA.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                openIndex === index
                  ? "border-indigo-200 bg-white shadow-lg shadow-indigo-500/10"
                  : "border-gray-200 bg-white hover:border-indigo-100"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
              >
                <span
                  className={`text-lg font-semibold transition-colors ${
                    openIndex === index ? "text-indigo-600" : "text-gray-900"
                  }`}
                >
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180 text-indigo-600" : ""
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-48 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-transparent">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
