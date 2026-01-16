import Image from "next/image";

const AboutHeroSection = () => {
  return (
    <section className="relative w-full h-[400px] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/about/about.png"
          alt="About Us Background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/60" />

        {/* White Gradient for Navbar Visibility */}
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-white via-white/40 to-transparent opacity-90" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight">
          เกี่ยวกับเรา
        </h1>
        <p className="text-lg text-gray-200 max-w-xs mx-auto mb-2">
          โรงงานผลิตเสื้อยืดครบวงจร มาตรฐานสากล
        </p>
        <p className="text-sm text-blue-200">
          ในเครือบริษัท Thana Plus 153 จำกัด
        </p>
      </div>
    </section>
  );
};

export default AboutHeroSection;
