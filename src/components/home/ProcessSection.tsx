import { MessageSquare, Palette, Factory, Truck } from "lucide-react";
import { PROCESS_CONTENT, PROCESS_STEPS } from "@/config/content/home";

// Icon mapping - เพื่อให้ใช้ชื่อ icon จาก config ได้
const iconMap = {
  MessageSquare,
  Palette,
  Factory,
  Truck,
} as const;

export default function ProcessSection() {
  const { section } = PROCESS_CONTENT;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4">
            {section.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {section.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {section.description}
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = iconMap[step.iconName as keyof typeof iconMap];
              return (
                <div key={idx} className="relative text-center group">
                  {/* Step Number Circle */}
                  <div className="relative z-10 mx-auto mb-6">
                    <div
                      className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${step.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-8 h-8" />
                    </div>
                    {/* Step Number Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-sm font-bold text-gray-700">
                      {step.step}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
