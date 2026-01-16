"use client";

import { MessageSquare, Palette, Factory, Truck } from "lucide-react";
import { PROCESS_CONTENT, PROCESS_STEPS } from "@/config/content/home";
import SectionHeading from "@/components/shared/SectionHeading";

// Icon mapping
const iconMap = {
  MessageSquare,
  Palette,
  Factory,
  Truck,
} as const;

export default function ProcessSection() {
  const { section } = PROCESS_CONTENT;

  return (
    <section className="py-16 bg-gray-50">
      <div className="px-5">
        <SectionHeading
          badge={section.badge}
          title={section.title}
          description={section.description}
          className="mb-10"
        />

        <div className="relative space-y-8 before:absolute before:left-6 before:top-4 before:bottom-4 before:w-0.5 before:bg-linear-to-b before:from-indigo-200 before:to-transparent">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = iconMap[step.iconName as keyof typeof iconMap];
            return (
              <div key={idx} className="relative flex gap-5">
                {/* Step Circle */}
                <div className="shrink-0 relative z-10 w-12 h-12 rounded-full border-4 border-gray-50 bg-white flex items-center justify-center shadow-sm">
                  <div className={`w-3 h-3 rounded-full ${step.color}`} />
                  {/* Icon Badge */}
                  <div
                    className={`absolute -right-1 -bottom-1 w-6 h-6 rounded-full ${step.color} flex items-center justify-center text-white text-[10px]`}
                  >
                    <Icon className="w-3 h-3" />
                  </div>
                </div>

                {/* Content */}
                <div className="pt-1 pb-6">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-gray-200 text-gray-600 mb-2">
                    STEP {step.step}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
