"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, X, Star } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

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
    tagline: "ที่สุดแห่งความนุ่มสบาย",
    image: "/home/FabricGuideSection/cotton100.png",
    blurDataURL: blurDataURLs.cotton100,
    pros: ["ระบายอากาศดีเยี่ยม", "นุ่มสบาย ไม่ระคายเคือง"],
    cons: ["หด ย้วย ยับง่าย"],
    bestFor: "เสื้อยืดแฟชั่น, เสื้อผ้าเด็ก, งานในห้องแอร์",
    color: "from-green-500 to-emerald-600",
  },
  {
    name: "TC",
    tagline: "ทนทาน งานยูนิฟอร์ม",
    image: "/home/FabricGuideSection/Tc.png",
    blurDataURL: blurDataURLs.tc,
    pros: ["ไม่หด ไม่ย้วย", "ยับยาก ซักง่าย", "ทนทาน สีสดนาน"],
    cons: ["ระบายอากาศปานกลาง"],
    bestFor: "ยูนิฟอร์มพนักงาน, เสื้อแจก, เสื้อกีฬาสี",
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "CVC",
    tagline: "พรีเมียมและคุ้มค่า",
    image: "/home/FabricGuideSection/Cvd.png",
    blurDataURL: blurDataURLs.cvc,
    pros: ["นุ่มใกล้เคียง Cotton", "ระบายอากาศดี", "หดน้อยกว่า"],
    cons: ["ราคาสูงกว่า TC"],
    bestFor: "เสื้อโปโลพรีเมียม, ยูนิฟอร์มผู้บริหาร",
    color: "from-purple-500 to-pink-600",
  },
];

const comparisonData = [
  { label: "ความนุ่ม", cotton: 5, cvc: 4, tc: 3 },
  { label: "ระบายอากาศ", cotton: 5, cvc: 4, tc: 3 },
  { label: "ไม่ยับ", cotton: 2, cvc: 4, tc: 5 },
  { label: "ทนทาน", cotton: 3, cvc: 4, tc: 5 },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3 h-3 ${
            star <= count ? "text-yellow-400 fill-yellow-400" : "text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

export default function FabricGuideSection() {
  const [activeTab, setActiveTab] = useState("comparison");

  return (
    <section className="py-16 bg-gray-50">
      <div className="px-5">
        <SectionHeading
          badge="คู่มือเลือกผ้า"
          title="เปรียบเทียบชนิดผ้า"
          description="เลือกผ้าให้เหมาะกับการใช้งานของคุณ"
          className="mb-8"
        />

        {/* Mobile Tabs */}
        <div className="flex p-1 bg-white rounded-xl shadow-sm mb-8">
          <button
            onClick={() => setActiveTab("comparison")}
            className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
              activeTab === "comparison"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            ตารางเปรียบเทียบ
          </button>
          <button
            onClick={() => setActiveTab("details")}
            className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
              activeTab === "details"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            รายละเอียด
          </button>
        </div>

        {/* Content Area */}
        {activeTab === "comparison" ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-4 py-3 text-left text-gray-600 font-medium">
                      คุณสมบัติ
                    </th>
                    <th className="px-2 py-3 text-center text-green-600">
                      Cotton
                    </th>
                    <th className="px-2 py-3 text-center text-purple-600">
                      CVC
                    </th>
                    <th className="px-2 py-3 text-center text-blue-600">TC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {comparisonData.map((row, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {row.label}
                      </td>
                      <td className="px-2 py-3">
                        <div className="flex justify-center">
                          <StarRating count={row.cotton} />
                        </div>
                      </td>
                      <td className="px-2 py-3">
                        <div className="flex justify-center">
                          <StarRating count={row.cvc} />
                        </div>
                      </td>
                      <td className="px-2 py-3">
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
        ) : (
          <div className="space-y-6">
            {fabrics.map((fabric, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
              >
                <div className="relative h-40">
                  <Image
                    src={fabric.image}
                    alt={fabric.name}
                    fill
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL={fabric.blurDataURL}
                  />
                  <div
                    className={`absolute inset-0 bg-linear-to-r ${fabric.color} mix-blend-multiply opacity-60`}
                  />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{fabric.name}</h3>
                    <p className="text-sm opacity-90">{fabric.tagline}</p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="mb-4">
                    <p className="text-xs font-bold text-gray-400 uppercase mb-2">
                      จุดเด่น
                    </p>
                    <ul className="space-y-1">
                      {fabric.pros.map((pro, i) => (
                        <li
                          key={i}
                          className="flex items-start text-sm text-gray-700"
                        >
                          <Check className="w-4 h-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase mb-2">
                      เหมาะสำหรับ
                    </p>
                    <p className="text-sm text-gray-600">{fabric.bestFor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
