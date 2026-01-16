import React from "react";

const StorySection = () => {
  return (
    <section className="py-12 px-6 bg-white">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          ความเชี่ยวชาญกว่า 10 ปี ภายใต้ Thana Plus 153
        </h2>
        <div className="w-16 h-1 bg-blue-600 mb-6" />
        <p className="text-gray-600 leading-relaxed mb-6">
          เราคือสาขาของ <strong>Thana Plus 153 Company Limited</strong>{" "}
          ผู้ผลิตและจัดจำหน่ายเสื้อยืด เสื้อโปโล และสินค้าพรีเมี่ยมครบวงจร
          ด้วยประสบการณ์ที่ยาวนานกว่า 10 ปี
          และได้รับความไว้วางใจจากลูกค้าชั้นนำกว่า 3,000 บริษัท
          ทั้งในและต่างประเทศ
        </p>
        <p className="text-gray-600 leading-relaxed">
          เรามุ่งเน้นการสร้าง <strong>Value (มูลค่าของสินค้า)</strong>{" "}
          ด้วยเครื่องจักรที่ทันสมัย และระบบควบคุมคุณภาพ{" "}
          <strong>QPC (Quality Premium Control)</strong>{" "}
          ที่เข้มข้นกว่ามาตรฐานทั่วไป เพื่อให้มั่นใจว่าทุกชิ้นงานที่ส่งถึงมือคุณ
          คือสินค้าที่ดีที่สุด
        </p>
      </div>

      <div className="relative border-l-2 border-blue-200 ml-3 space-y-8">
        <div className="relative pl-8">
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-2 border-white" />
          <span className="text-sm font-semibold text-blue-600">
            จุดเริ่มต้น
          </span>
          <h3 className="text-lg font-bold text-gray-900">Thana Plus 153</h3>
          <p className="text-sm text-gray-500 mt-1">
            ก่อตั้งขึ้นเพื่อยกระดับมาตรฐานการผลิตเสื้อในไทย
            ด้วยความเชี่ยวชาญเฉพาะด้าน
          </p>
        </div>
        <div className="relative pl-8">
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-2 border-white" />
          <span className="text-sm font-semibold text-blue-600">การเติบโต</span>
          <h3 className="text-lg font-bold text-gray-900">
            กำลังการผลิตมาตรฐานสากล
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            รองรับการผลิตได้สูงสุด 20,000 ตัวต่อวัน
            ด้วยเครื่องจักรทันสมัยจากยุโรป
          </p>
        </div>
        <div className="relative pl-8">
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-2 border-white" />
          <span className="text-sm font-semibold text-blue-600">ปัจจุบัน</span>
          <h3 className="text-lg font-bold text-gray-900">
            ขยายสู่ลูกค้าทั่วโลก
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            ให้บริการลูกค้ากว่า 3,000 ราย พร้อมระบบ QPC
            และบริการจัดส่งทั่วประเทศ
          </p>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
