"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Portfolio items data - สามารถเปลี่ยนรูปและข้อมูลได้ภายหลัง
const portfolioItems = [
  {
    id: 1,
    title: "เสื้อทีมฟุตบอล บริษัท ABC",
    category: "สกรีน",
    image: "/home/PortfolioSection/portfolio-1.jpg",
    description: "สกรีนโลโก้บริษัทพร้อมเบอร์หลัง 50 ตัว",
  },
  {
    id: 2,
    title: "เสื้อโปโลพนักงาน XYZ Corp",
    category: "ปัก",
    image: "/home/PortfolioSection/portfolio-2.jpg",
    description: "ปักโลโก้หน้าอก 200 ตัว สี 3 สี",
  },
  {
    id: 3,
    title: "เสื้อยืดงาน Event มหาวิทยาลัย",
    category: "DTG",
    image: "/home/PortfolioSection/portfolio-3.jpg",
    description: "พิมพ์ DTG ลายเต็มหน้าหลัง 100 ตัว",
  },
  {
    id: 4,
    title: "เสื้อทีมกีฬาสี โรงเรียน",
    category: "สกรีน",
    image: "/home/PortfolioSection/portfolio-4.jpg",
    description: "สกรีน 4 สี 4 ทีม รวม 500 ตัว",
  },
  {
    id: 5,
    title: "เสื้อโปโลร้านอาหาร",
    category: "ปัก",
    image: "/home/PortfolioSection/portfolio-5.jpg",
    description: "ปักโลโก้ร้าน + ชื่อพนักงาน 30 ตัว",
  },
  {
    id: 6,
    title: "เสื้อยืดแบรนด์เสื้อผ้า",
    category: "DTG",
    image: "/home/PortfolioSection/portfolio-6.jpg",
    description: "พิมพ์ DTG คมชัดสีสด 150 ตัว",
  },
];

const categories = ["ทั้งหมด", "สกรีน", "ปัก", "DTG"];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("ทั้งหมด");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredItems =
    activeCategory === "ทั้งหมด"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? filteredItems.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) =>
      prev === filteredItems.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">
            ผลงานของเรา
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ตัวอย่างผลงานผลิตเสื้อยืด เสื้อโปโล จากโรงงาน
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            ตัวอย่างผลงานเสื้อที่เราผลิตให้ลูกค้าจริง ทั้งงานสกรีน ปักโลโก้
            และพิมพ์ DTG คุณภาพโรงงานที่พิสูจน์ได้
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                      item.category === "สกรีน"
                        ? "bg-blue-500"
                        : item.category === "ปัก"
                        ? "bg-purple-500"
                        : "bg-orange-500"
                    }`}
                  >
                    {item.category}
                  </span>
                </div>

                {/* Hover Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white/80 text-sm">{item.description}</p>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5">
                <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* View More CTA */}
        <div className="text-center mt-12">
          <a
            href="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
          >
            ดูผลงานทั้งหมด
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && filteredItems[currentImageIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 text-white/80 hover:text-white transition-colors z-10"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 text-white/80 hover:text-white transition-colors z-10"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          {/* Image */}
          <div
            className="relative max-w-4xl max-h-[80vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={filteredItems[currentImageIndex].image}
              alt={filteredItems[currentImageIndex].title}
              width={1200}
              height={800}
              className="object-contain w-full h-full rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
              <h3 className="text-white text-xl font-bold">
                {filteredItems[currentImageIndex].title}
              </h3>
              <p className="text-white/80 mt-1">
                {filteredItems[currentImageIndex].description}
              </p>
            </div>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {currentImageIndex + 1} / {filteredItems.length}
          </div>
        </div>
      )}
    </section>
  );
}
