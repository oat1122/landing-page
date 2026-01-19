export default function MapSection() {
  return (
    <section className="py-12 px-6 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          แผนที่ตั้งโรงงาน
        </h2>
        <p className="text-gray-600 text-center mb-6">
          503 ถ. สุโขทัย แขวงสวนจิตรลดา เขตดุสิต กรุงเทพมหานคร 10300
        </p>

        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <div className="relative w-full" style={{ paddingBottom: "75%" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.0808607817453!2d100.5242382751636!3d13.773997096779127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e299e9b34e3e21%3A0xff3e2eda5f3165fc!2sThanaplus!5e0!3m2!1sth!2sth!4v1768820879116!5m2!1sth!2sth"
              className="absolute top-0 left-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="แผนที่ตั้งโรงงาน ธน พลัส 153"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
