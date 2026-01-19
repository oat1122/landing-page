import { MapPin, Phone, Mail, Clock, Building2 } from "lucide-react";

export default function ContactInfoSection() {
  return (
    <section className="py-12 px-6 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          ข้อมูลการติดต่อ
        </h2>

        <div className="space-y-4">
          {/* Company Name */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4">
              <Building2 className="w-6 h-6 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">ชื่อบริษัท</h3>
                <p className="text-gray-700">บริษัท ธน พลัส 153 จำกัด</p>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">ที่อยู่</h3>
                <p className="text-gray-700 leading-relaxed">
                  503 ถ. สุโขทัย แขวงสวนจิตรลดา
                  <br />
                  เขตดุสิต กรุงเทพมหานคร 10300
                </p>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  เบอร์โทรศัพท์
                </h3>
                <a
                  href="tel:+6662497795"
                  className="text-indigo-600 hover:text-indigo-700 font-medium text-lg"
                >
                  062-497-7952
                </a>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">อีเมล</h3>
                <a
                  href="mailto:monaliza11867@gmail.com"
                  className="text-indigo-600 hover:text-indigo-700 break-all"
                >
                  monaliza11867@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">เวลาทำการ</h3>
                <p className="text-gray-700">
                  จันทร์ - ศุกร์
                  <br />
                  09:00 - 18:00 น.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
