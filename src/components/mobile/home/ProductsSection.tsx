"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

// Blur placeholder base64 (tiny blurred versions)
const blurDataURLs = {
  tshirt:
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAKAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABwUI/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDBAURAAYSIQcTMUH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAMBAQEAAAAAAAAAAAAAAAABAhEhA//9oADAMBEQCEEEEH8=",
  polo: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAKAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABwUI/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDBAURAAYSIQcTMUH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAMBAQEAAAAAAAAAAAAAAAABAhEhA//9oADAMBEQCEEEEH8=",
  uniform:
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAKAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABwUI/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDBAURAAYSIQcTMUH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAMBAQEAAAAAAAAAAAAAAAABAhEhA//9oADAMBEQCEEEEH8=",
};

const products = [
  {
    title: "เสื้อยืด",
    image: "/home/ProductsSection/เสื้อยืด.png",
    blurDataURL: blurDataURLs.tshirt,
    alt: "เสื้อยืด Cotton 100% คุณภาพสูง รับผลิตตามสั่ง - โรงงานผลิตเสื้อ",
    description: "รับผลิตเสื้อยืดคุณภาพสูง เนื้อผ้า Cotton 100% นุ่มสบาย",
    href: "/product/tshirt",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    title: "เสื้อโปโล",
    image: "/home/ProductsSection/Polo มีกระเป๋า.png",
    blurDataURL: blurDataURLs.polo,
    alt: "เสื้อโปโลมีกระเป๋า ผ้า TC พรีเมียม พร้อมปักโลโก้ - โรงงานผลิตเสื้อโปโล",
    description: "โรงงานผลิตเสื้อโปโล เกรดพรีเมียม ผ้า TC, CVC, Pique",
    href: "/product/polo",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    title: "ยูนิฟอร์ม",
    image: "/home/ProductsSection/ยูนิฟอร์มพนักงาน.png",
    blurDataURL: blurDataURLs.uniform,
    alt: "ยูนิฟอร์มพนักงาน ชุดทำงานบริษัท ออกแบบเฉพาะองค์กร - รับผลิตยูนิฟอร์ม",
    description: "รับผลิตยูนิฟอร์มพนักงาน ชุดทำงาน ชุดพนักงานบริษัท",
    href: "/product/custom",
    gradient: "from-orange-500 to-red-600",
  },
];

export default function ProductsSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = scrollRef.current.clientWidth;
      const index = Math.round(scrollLeft / width);
      setActiveSlide(index);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="px-5">
        <SectionHeading
          badge="สินค้าของเรา"
          title="บริการผลิตเสื้อครบวงจร"
          description="โรงงานผลิตเสื้อโดยตรง ไม่ผ่านคนกลาง การันตีราคาถูก"
          className="mb-8"
        />

        {/* Carousel Container */}
        <div className="relative -mx-5 px-5">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-8 hide-scrollbar"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {products.map((product, idx) => (
              <Link
                key={idx}
                href={product.href}
                className="flex-none w-[85vw] max-w-sm snap-center group"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative aspect-4/3 w-full">
                    <Image
                      src={product.image}
                      alt={product.alt}
                      fill
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL={product.blurDataURL}
                      sizes="(max-width: 640px) 85vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60" />

                    {/* Badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-gray-800">
                      แนะนำ
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                      {product.description}
                    </p>
                    <div className="flex items-center text-indigo-600 font-semibold text-sm">
                      ดูรายละเอียด
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {/* Spacer */}
            <div className="w-1 flex-none" />
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-2">
            {products.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeSlide === idx ? "bg-indigo-600 w-6" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
