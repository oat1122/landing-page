"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import Logo from "@/components/shared/Logo";
import Button from "@/components/shared/Button";

const navLinks = [
  { href: "/", label: "หน้าแรก" },
  { href: "/about", label: "เกี่ยวกับเรา" },
  { href: "/product", label: "สินค้า" },
  { href: "/blog", label: "บทความ" },
  { href: "/contact", label: "ติดต่อเรา" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="px-4 flex items-center justify-between">
          <Logo className="text-lg" />

          <div className="flex items-center gap-3">
            <a
              href="tel:0812345678"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-600 active:scale-95 transition-transform"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-1.5 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
            >
              <Menu className="w-7 h-7 text-gray-800" />
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <div
        className={`fixed inset-0 z-60 bg-white transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="px-4 py-4 flex items-center justify-between border-b border-gray-100">
            <span className="text-lg font-bold text-gray-900">เมนู</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-2xl font-semibold text-gray-800 py-2 active:text-indigo-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-6 border-t border-gray-100 safe-area-bottom">
            <Button
              href="/contact"
              fullWidth
              onClick={() => setIsMenuOpen(false)}
            >
              ขอใบเสนอราคา
            </Button>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>โทร: 081-234-5678</p>
              <p>Line: @example</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
