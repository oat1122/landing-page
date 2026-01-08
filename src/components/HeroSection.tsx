import Link from "next/link";
import { ArrowRight, Sparkles, Truck, Shield } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "คุณภาพดี",
    description: "เนื้อผ้าคุณภาพสูง ใส่สบาย",
  },
  {
    icon: Truck,
    title: "จัดส่งรวดเร็ว",
    description: "ส่งตรงจากโรงงาน ทั่วไทย",
  },
  {
    icon: Shield,
    title: "รับประกัน",
    description: "รับประกันคุณภาพทุกชิ้น",
  },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />

      {/* Decorative Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-300/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-pink-300/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>ราคาโรงงาน ถูกกว่าใคร!</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              โรงงานผลิต
              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                เสื้อยืด & เสื้อโปโล
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              รับผลิตเสื้อตามออเดอร์ ราคาถูกกว่าเพราะเราผลิตเอง
              ส่งตรงจากโรงงานถึงมือคุณ คุณภาพดี มีมาตรฐาน
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Link
                href="/product"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-200"
              >
                ดูสินค้า
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-gray-300 text-gray-700 font-semibold text-lg hover:border-indigo-600 hover:text-indigo-600 transition-all duration-200"
              >
                ติดต่อเรา
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4">
              {features.map((feature, idx) => (
                <div key={idx} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 mb-2">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Placeholder for hero image */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-3xl shadow-2xl transform rotate-3" />
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-2xl flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="text-8xl mb-4">👕</div>
                  <p className="text-2xl font-bold">เสื้อคุณภาพ</p>
                  <p className="text-lg opacity-80">ราคาโรงงาน</p>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 px-4 py-2 bg-white rounded-xl shadow-lg">
                <span className="text-2xl font-bold text-indigo-600">-70%</span>
              </div>
              <div className="absolute -bottom-4 -left-4 px-4 py-2 bg-white rounded-xl shadow-lg flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-gray-700">
                  พร้อมส่ง
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
