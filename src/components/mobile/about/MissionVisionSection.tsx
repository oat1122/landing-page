import React from "react";
import { Target, Globe } from "lucide-react";

const MissionVisionSection = () => {
  return (
    <section className="py-12 px-6 bg-gray-50">
      <div className="space-y-6">
        {/* Mission Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            พันธกิจ (Mission)
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            มุ่งมั่นสร้าง <strong>Value</strong> ให้กับสินค้าด้วยระบบ{" "}
            <strong>QPC</strong> ที่เหนือกว่ามาตรฐาน
            เพื่อให้ลูกค้าได้รับสินค้าคุณภาพพรีเมี่ยม ตรงต่อเวลา
            และบริการที่ประทับใจ
          </p>
        </div>

        {/* Vision Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 text-purple-600">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            วิสัยทัศน์ (Vision)
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            เป็นผู้นำด้านการผลิตเสื้อยืดและสินค้าพรีเมี่ยม ด้วยเทคโนโลยีจากยุโรป
            รองรับกำลังการผลิตสูง และเป็นที่ยอมรับในระดับสากล
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
