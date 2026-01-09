import { Clock, Users, ShieldCheck, Factory } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "ผลิตด่วน 3-5 วัน",
    description:
      "รับงานด่วนพิเศษ (Rush Order) ผลิตเสื้อด่วนภายใน 3-5 วันทำการ เพื่อให้ทันทุกงาน Event และกำหนดส่งของลูกค้า",
    color: "bg-blue-500",
  },
  {
    icon: Users,
    title: "ขั้นต่ำน้อย 30 ตัว",
    description:
      "สั่งผลิตเสื้อขั้นต่ำเริ่มต้นเพียง 30 ตัวต่อแบบ เหมาะสำหรับธุรกิจ SME ทีมงานขนาดเล็ก ไปจนถึงองค์กรใหญ่",
    color: "bg-purple-500",
  },
  {
    icon: ShieldCheck,
    title: "QC ตรวจสอบทุกตัว",
    description:
      "มีทีม QC ตรวจสอบคุณภาพเสื้อทุกตัวก่อนส่งมอบ รับประกันสินค้า 100% หากมีตำหนิจากการผลิต ผลิตใหม่ให้ฟรี",
    color: "bg-green-500",
  },
  {
    icon: Factory,
    title: "ราคาโรงงาน ถูกกว่าใคร",
    description:
      "ผลิตเองโดยตรงจากโรงงาน ไม่ผ่านคนกลาง จึงการันตีราคาถูกกว่า พร้อมคุณภาพมาตรฐานส่งออก",
    color: "bg-orange-500",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-4">
            ข้อได้เปรียบของเรา
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ทำไมต้องเลือกเรา?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            โรงงานผลิตเสื้อของเรามีจุดเด่นที่แตกต่าง พร้อมบริการครบวงจร
            ตั้งแต่ออกแบบจนถึงจัดส่ง
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
            >
              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${feature.color} text-white mb-5 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-7 h-7" />
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
          ))}
        </div>
      </div>
    </section>
  );
}
