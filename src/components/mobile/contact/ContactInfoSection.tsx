"use client";

import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building2,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { CONTACT_INFO } from "@/config/seo/contact.metadata";
import { useCopyToClipboard } from "@/hooks/contact";
import SectionHeading from "@/components/shared/SectionHeading";

// สร้าง contact items จาก CONTACT_INFO
const getContactItems = () => [
  {
    id: "company",
    icon: Building2,
    label: "ชื่อบริษัท",
    value: CONTACT_INFO.company.name,
    color: "indigo",
    gradient: "from-indigo-500 to-indigo-600",
    bgGradient: "from-indigo-50 to-indigo-100",
  },
  {
    id: "address",
    icon: MapPin,
    label: "ที่อยู่",
    value: CONTACT_INFO.address.multiline,
    color: "rose",
    gradient: "from-rose-500 to-pink-600",
    bgGradient: "from-rose-50 to-pink-100",
    copyable: true,
  },
  {
    id: "phone",
    icon: Phone,
    label: "เบอร์โทรศัพท์",
    value: CONTACT_INFO.phone.display,
    href: CONTACT_INFO.phone.href,
    color: "emerald",
    gradient: "from-emerald-500 to-teal-600",
    bgGradient: "from-emerald-50 to-teal-100",
  },
  {
    id: "email",
    icon: Mail,
    label: "อีเมล",
    value: CONTACT_INFO.email.display,
    href: CONTACT_INFO.email.href,
    color: "amber",
    gradient: "from-amber-500 to-orange-600",
    bgGradient: "from-amber-50 to-orange-100",
  },
  {
    id: "hours",
    icon: Clock,
    label: "เวลาทำการ",
    value: `${CONTACT_INFO.businessHours.days}\n${CONTACT_INFO.businessHours.hours}`,
    color: "purple",
    gradient: "from-purple-500 to-violet-600",
    bgGradient: "from-purple-50 to-violet-100",
  },
];

export default function ContactInfoSection() {
  const { handleCopy, isCopied } = useCopyToClipboard();
  const contactItems = getContactItems();

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-2xl mx-auto">
        <SectionHeading
          title="ข้อมูลการติดต่อ"
          description="เลือกช่องทางที่สะดวกสำหรับคุณ"
        />

        {/* Contact Cards */}
        <div className="space-y-4">
          {contactItems.map((item, index) => {
            const Icon = item.icon;
            const isClickable = !!item.href;
            const isCopyable = item.copyable;

            return (
              <div
                key={item.id}
                className="group relative"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "slideInUp 0.5s ease-out forwards",
                  opacity: 0,
                }}
              >
                {/* Card */}
                <div
                  className={`
                    relative overflow-hidden rounded-2xl p-5
                    bg-white/80 backdrop-blur-sm
                    border border-gray-100/80
                    shadow-sm hover:shadow-xl
                    transition-all duration-300 ease-out
                    hover:-translate-y-1
                    ${isClickable ? "cursor-pointer" : ""}
                  `}
                  onClick={() => isClickable && window.open(item.href, "_self")}
                >
                  {/* Gradient Border Accent */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${item.gradient} rounded-l-2xl`}
                  ></div>

                  {/* Hover Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${item.bgGradient} opacity-0 group-hover:opacity-50 transition-opacity duration-300`}
                  ></div>

                  <div className="relative flex items-start gap-4">
                    {/* Icon Container */}
                    <div
                      className={`
                      w-12 h-12 rounded-xl 
                      bg-gradient-to-br ${item.gradient}
                      flex items-center justify-center
                      shadow-lg
                      group-hover:scale-110 group-hover:rotate-3
                      transition-transform duration-300
                    `}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                        {item.label}
                        {isClickable && (
                          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                        )}
                      </h3>
                      {item.href ? (
                        <a
                          href={item.href}
                          className={`text-lg font-medium bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent hover:opacity-80 transition-opacity`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {item.value}
                        </p>
                      )}
                    </div>

                    {/* Copy Button for Copyable Items */}
                    {isCopyable && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(item.value, item.id);
                        }}
                        className={`
                          p-2 rounded-lg transition-all duration-200
                          ${
                            isCopied(item.id)
                              ? "bg-emerald-100 text-emerald-600"
                              : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                          }
                        `}
                        aria-label="คัดลอกที่อยู่"
                      >
                        {isCopied(item.id) ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex gap-3">
          <a
            href={CONTACT_INFO.phone.href}
            className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            <Phone className="w-5 h-5" />
            <span>โทรหาเรา</span>
          </a>
          <a
            href={CONTACT_INFO.email.href}
            className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            <Mail className="w-5 h-5" />
            <span>ส่งอีเมล</span>
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
