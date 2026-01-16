"use client";

import { Clock, Users, ShieldCheck, Factory } from "lucide-react";
import {
  WHY_CHOOSE_US_CONTENT,
  WHY_CHOOSE_US_FEATURES,
} from "@/config/content/home";
import SectionHeading from "@/components/shared/SectionHeading";

// Icon mapping
const iconMap = {
  Clock,
  Users,
  ShieldCheck,
  Factory,
} as const;

export default function WhyChooseUs() {
  const { section } = WHY_CHOOSE_US_CONTENT;

  return (
    <section className="py-16 bg-white">
      <div className="px-5">
        <SectionHeading
          badge={section.badge}
          title={section.title}
          description={section.description}
          className="mb-8"
        />

        <div className="space-y-4">
          {WHY_CHOOSE_US_FEATURES.map((feature, idx) => {
            const Icon = iconMap[feature.iconName as keyof typeof iconMap];
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100"
              >
                <div
                  className={`shrink-0 flex items-center justify-center w-12 h-12 rounded-xl ${feature.color} text-white`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
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
