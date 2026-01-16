"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
    image: "/home/ProductsSection/tshirt.png",
    blurDataURL: blurDataURLs.tshirt,
    alt: "เสื้อยืด Cotton 100% คุณภาพสูง รับผลิตตามสั่ง - โรงงานผลิตเสื้อ",
    description:
      "รับผลิตเสื้อยืดคุณภาพสูง เนื้อผ้า Cotton 100% นุ่มสบาย ระบายอากาศดี เหมาะสำหรับงาน Event ทีมงาน หรือจำหน่าย ราคาโรงงาน",
    href: "/product/tshirt",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    title: "เสื้อโปโล",
    image: "/home/ProductsSection/polo-with-pocket.png",
    blurDataURL: blurDataURLs.polo,
    alt: "เสื้อโปโลมีกระเป๋า ผ้า TC พรีเมียม พร้อมปักโลโก้ - โรงงานผลิตเสื้อโปโล",
    description:
      "โรงงานผลิตเสื้อโปโล เกรดพรีเมียม ผ้า TC, CVC, Pique นุ่ม ใส่สบาย เหมาะสำหรับยูนิฟอร์มบริษัท ทีมขาย ร้านค้า ราคาโรงงาน",
    href: "/product/polo",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    title: "ยูนิฟอร์มพนักงาน",
    image: "/home/ProductsSection/employee-uniform.png",
    blurDataURL: blurDataURLs.uniform,
    alt: "ยูนิฟอร์มพนักงาน ชุดทำงานบริษัท ออกแบบเฉพาะองค์กร - รับผลิตยูนิฟอร์ม",
    description:
      "รับผลิตยูนิฟอร์มพนักงาน ชุดทำงาน ชุดพนักงานบริษัท ออกแบบเฉพาะองค์กร สกรีน/ปัก โลโก้ ครบวงจร ราคาถูก คุณภาพดี",
    href: "/product/custom",
    gradient: "from-orange-500 to-red-600",
  },
];

export default function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top;
        const windowHeight = window.innerHeight;

        // Calculate parallax offset based on section position
        if (sectionTop < windowHeight && sectionTop > -rect.height) {
          const scrollProgress =
            (windowHeight - sectionTop) / (windowHeight + rect.height);
          setScrollY(scrollProgress * 30); // Max 30px parallax
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for staggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">
            สินค้าของเรา
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            บริการผลิตเสื้อครบวงจร
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            เราเป็นโรงงานผลิตเสื้อโดยตรง ไม่ผ่านคนกลาง จึงการันตีราคาถูกกว่า
            พร้อมคุณภาพมาตรฐานส่งออก
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <Link
              key={idx}
              href={product.href}
              className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-indigo-200 hover:-translate-y-2 ${
                isVisible ? "product-card-animate" : "opacity-0"
              }`}
            >
              {/* Product Image Container - 5:4 aspect ratio */}
              <div className="relative aspect-5/4 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={85}
                  placeholder="blur"
                  blurDataURL={product.blurDataURL}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* Hover overlay gradient */}
                <div className="product-image-overlay" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors relative inline-block">
                  {product.title}
                  {/* Animated underline */}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full" />
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                  {product.description}
                </p>

                {/* Link indicator with arrow animation */}
                <span className="inline-flex items-center text-indigo-600 font-semibold">
                  ดูรายละเอียด
                  <svg
                    className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
