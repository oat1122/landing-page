import React from "react";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="py-12 px-6 bg-blue-900 text-white text-center">
      <h2 className="text-2xl font-bold mb-4">
        พร้อมที่จะผลิตเสื้อยืดคุณภาพกับเราหรือยัง?
      </h2>
      <p className="text-blue-100 mb-8 max-w-sm mx-auto">
        ปรึกษาฟรี ไม่มีค่าใช้จ่าย เราพร้อมดูแลคุณตั้งแต่เริ่มต้นจนได้รับสินค้า
      </p>
      <div className="flex flex-col gap-4">
        <Link
          href="/contact"
          className="bg-white text-blue-900 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          ติดต่อเราทันที
        </Link>
        <Link
          href="/portfolio"
          className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white/10 transition-colors"
        >
          ดูผลงานของเรา
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
