"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, X } from "lucide-react";

// Blur placeholder base64
const blurDataURLs = {
  cotton100:
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAKAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABwUI/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDBAURAAYSIQcTMUH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAMBAQEAAAAAAAAAAAAAAAABAhEhA//9oADAMBEQCEEEEH8=",
  tc: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAKAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABwUI/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDBAURAAYSIQcTMUH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAMBAQEAAAAAAAAAAAAAAAABAhEhA//9oADAMBEQCEEEEH8=",
  cvc: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAKAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABwUI/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDBAURAAYSIQcTMUH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAMBAQEAAAAAAAAAAAAAAAABAhEhA//9oADAMBEQCEEEEH8=",
};

const fabrics = [
  {
    name: "Cotton 100%",
    tagline: "ที่สุดแห่งความนุ่มสบาย จากธรรมชาติ",
    image: "/home/FabricGuideSection/cotton100.png",
    blurDataURL: blurDataURLs.cotton100,
    alt: "ผ้า Cotton 100% ฝ้ายแท้ นุ่มสบาย ระบายอากาศดี - โรงงานผลิตเสื้อ",
    composition: "ฝ้าย 100%",
    pros: ["ระบายอากาศดีเยี่ยม", "นุ่มสบาย ไม่ระคายเคือง", "ซับเหงื่อได้ดี"],
    cons: ["หด ย้วย ยับง่าย"],
    bestFor: "เสื้อยืดแฟชั่น, เสื้อผ้าเด็ก, งานในห้องแอร์",
    grades: ["OE (เกรดต่ำ)", "Semi (เกรดกลาง)", "Combed (พรีเมียม)"],
    color: "from-green-500 to-emerald-600",
    iconBg: "bg-green-500",
  },
  {
    name: "TC",
    tagline: "ราชาแห่งความทนทาน งานยูนิฟอร์ม",
    image: "/home/FabricGuideSection/Tc.png",
    blurDataURL: blurDataURLs.tc,
    alt: "ผ้า TC โพลีเอสเตอร์ 65% ฝ้าย 35% ทนทาน ยับยาก - รับผลิตยูนิฟอร์ม",
    composition: "โพลีเอสเตอร์ 65% + ฝ้าย 35%",
    pros: ["ไม่หด ไม่ย้วย", "ยับยาก ซักง่าย", "ทนทาน สีสดนาน"],
    cons: ["ระบายอากาศปานกลาง", "อาจขึ้นขน (Pilling)"],
    bestFor: "ยูนิฟอร์มพนักงาน, เสื้อแจก, เสื้อกีฬาสี",
    color: "from-blue-500 to-indigo-600",
    iconBg: "bg-blue-500",
  },
  {
    name: "CVC",
    tagline: "ลูกผสมที่ลงตัว พรีเมียมและคุ้มค่า",
    image: "/home/FabricGuideSection/Cvd.png",
    blurDataURL: blurDataURLs.cvc,
    alt: "ผ้า CVC ฝ้าย 55-60% โพลีเอสเตอร์ 40-45% นุ่ม พรีเมียม - โรงงานผลิตเสื้อโปโล",
    composition: "ฝ้าย 55-60% + โพลีเอสเตอร์ 40-45%",
    pros: ["นุ่มใกล้เคียง Cotton", "ระบายอากาศดี", "หดน้อยกว่า Cotton 100%"],
    cons: ["ราคาสูงกว่า TC"],
    bestFor: "เสื้อโปโลพรีเมียม, ยูนิฟอร์มผู้บริหาร",
    color: "from-purple-500 to-pink-600",
    iconBg: "bg-purple-500",
  },
];

// Comparison data for the table
const comparisonData = [
  {
    label: "ความนุ่มสบาย",
    cotton: 5,
    cvc: 4,
    tc: 3,
  },
  {
    label: "ระบายอากาศ",
    cotton: 5,
    cvc: 4,
    tc: 3,
  },
  {
    label: "ไม่ยับ/คืนตัว",
    cotton: 2,
    cvc: 4,
    tc: 5,
  },
  {
    label: "ความทนทาน",
    cotton: 3,
    cvc: 4,
    tc: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${
            star <= count ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function FabricGuideSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold mb-4">
            คู่มือเลือกผ้า
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            เปรียบเทียบผ้า Cotton, TC, CVC สำหรับเสื้อยืดและเสื้อโปโล
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            เข้าใจความแตกต่างของเนื้อผ้า 3 ชนิดยอดนิยมจากโรงงานผลิตเสื้อ
            เพื่อเลือกสรรวัสดุที่ตอบโจทย์การใช้งานของคุณมากที่สุด
          </p>
        </div>

        {/* Fabric Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {fabrics.map((fabric, idx) => (
            <div
              key={idx}
              className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2 ${
                isVisible ? "fabric-card-animate" : "opacity-0"
              }`}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={fabric.image}
                  alt={fabric.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={85}
                  placeholder="blur"
                  blurDataURL={fabric.blurDataURL}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Name & Tagline */}
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {fabric.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4 italic">
                  "{fabric.tagline}"
                </p>

                {/* Composition Badge */}
                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r ${fabric.color} text-white text-xs font-medium mb-4`}
                >
                  {fabric.composition}
                </div>

                {/* Pros */}
                <div className="mb-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    ข้อดี
                  </p>
                  <ul className="space-y-1">
                    {fabric.pros.map((pro, i) => (
                      <li
                        key={i}
                        className="flex items-center text-sm text-gray-700"
                      >
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    ข้อจำกัด
                  </p>
                  <ul className="space-y-1">
                    {fabric.cons.map((con, i) => (
                      <li
                        key={i}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <X className="w-4 h-4 text-red-400 mr-2 flex-shrink-0" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Best For */}
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    เหมาะสำหรับ
                  </p>
                  <p className="text-sm text-gray-700 font-medium">
                    {fabric.bestFor}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600">
            <h3 className="text-xl font-bold text-white text-center">
              ตารางเปรียบเทียบคุณสมบัติ
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    คุณสมบัติ
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-green-600">
                    Cotton 100%
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-purple-600">
                    CVC
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-blue-600">
                    TC
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {row.label}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <StarRating count={row.cotton} />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <StarRating count={row.cvc} />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <StarRating count={row.tc} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
