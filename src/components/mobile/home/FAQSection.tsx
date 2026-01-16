"use client";

import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { FAQ_DATA } from "@/config/content/home";
import SectionHeading from "@/components/shared/SectionHeading";
import { useFAQ } from "@/hooks/useFAQ";

export default function FAQSection() {
  const { toggleFAQ, isOpen } = useFAQ(0);

  return (
    <section className="py-16 bg-white">
      <div className="px-5">
        <SectionHeading
          badge={
            <span className="flex items-center gap-1">
              <MessageCircleQuestion className="w-3.5 h-3.5" />
              คำถามที่พบบ่อย
            </span>
          }
          title="ข้อสงสัย?"
          description="รวมคำถามยอดฮิตจากลูกค้าของเรา"
          className="mb-8"
        />

        <div className="space-y-3">
          {FAQ_DATA.map((faq, index) => (
            <div
              key={index}
              className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                isOpen(index)
                  ? "border-indigo-200 bg-indigo-50/30 shadow-sm"
                  : "border-gray-100 bg-white"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-start justify-between p-4 text-left focus:outline-none"
              >
                <span
                  className={`text-sm font-semibold pr-4 ${
                    isOpen(index) ? "text-indigo-700" : "text-gray-900"
                  }`}
                >
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 shrink-0 mt-0.5 transition-transform duration-300 ${
                    isOpen(index) ? "rotate-180 text-indigo-600" : ""
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  isOpen(index) ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-4 pt-0 text-sm text-gray-600 leading-relaxed">
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
