import Link from "next/link";
import { ArrowRight, Sparkles, Truck, Shield } from "lucide-react";
import { HERO_CONTENT, HERO_FEATURES } from "@/config/content/home";
import Button from "@/components/shared/Button";

// Icon mapping
const iconMap = {
  Sparkles,
  Truck,
  Shield,
} as const;

export default function HeroSection() {
  const { badge, title, description, buttons, floatingElements, heroImage } =
    HERO_CONTENT;

  return (
    <section className="relative pt-24 pb-12 overflow-hidden bg-gradient-to-b from-indigo-50/50 via-white to-white">
      {/* Decorative Blobs - Smaller for mobile */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute top-40 left-0 w-48 h-48 bg-indigo-200/20 rounded-full blur-3xl -translate-x-1/2" />

      <div className="px-5">
        {/* Content */}
        <div className="text-center mb-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 font-medium text-xs mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{badge}</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
            {title.prefix}
            <span className="block mt-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {title.highlight}
            </span>
          </h1>

          {/* Description */}
          <p className="text-gray-600 mb-8 leading-relaxed">{description}</p>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <Button href={buttons.primary.href} fullWidth>
              {buttons.primary.text}
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button href={buttons.secondary.href} variant="outline" fullWidth>
              {buttons.secondary.text}
            </Button>
          </div>
        </div>

        {/* Mobile Hero Image Card */}
        <div className="relative mb-12">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center relative z-10">
            {/* Simple placeholder content matching PC */}
            <div className="text-center text-white p-6">
              <div className="text-7xl mb-4">👕</div>
              <p className="text-xl font-bold">{heroImage.title}</p>
              <p className="opacity-80 text-sm">{heroImage.subtitle}</p>
            </div>
          </div>

          {/* Back decoration */}
          <div className="absolute inset-0 bg-indigo-200 rounded-3xl transform rotate-6 scale-95 z-0" />

          {/* Floating tags */}
          <div className="absolute -top-3 -right-2 z-20 bg-white px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5">
            <span className="text-lg font-bold text-indigo-600">
              {floatingElements.discount}
            </span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-3 gap-3">
          {HERO_FEATURES.map((feature, idx) => {
            const Icon = iconMap[feature.iconName as keyof typeof iconMap];
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-3 rounded-2xl bg-white shadow-sm border border-gray-100"
              >
                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900 text-xs">
                  {feature.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
