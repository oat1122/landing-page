export default function ContactHeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-16 px-6 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 leading-tight">ติดต่อเรา</h1>
        <p className="text-lg text-white/90 leading-relaxed">
          ยินดีให้คำปรึกษาและรับฟังความต้องการของคุณ
          <br />
          ติดต่อเราได้ทุกช่องทาง พร้อมให้บริการ
        </p>
      </div>
    </section>
  );
}
