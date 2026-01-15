import { Clock, Users, ShieldCheck, Factory } from "lucide-react";
import {
  WHY_CHOOSE_US_CONTENT,
  WHY_CHOOSE_US_FEATURES,
} from "@/config/content/home";

// Icon mapping - เพื่อให้ใช้ชื่อ icon จาก config ได้
const iconMap = {
  Clock,
  Users,
  ShieldCheck,
  Factory,
} as const;

export default function WhyChooseUs() {
  const { section } = WHY_CHOOSE_US_CONTENT;

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-4">
            {section.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {section.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {section.description}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {WHY_CHOOSE_US_FEATURES.map((feature, idx) => {
            const Icon = iconMap[feature.iconName as keyof typeof iconMap];
            return (
              <div
                key={idx}
                className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
              >
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${feature.color} text-white mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative gradient line */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 ${feature.color} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
