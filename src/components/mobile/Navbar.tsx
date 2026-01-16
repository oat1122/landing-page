"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronRight } from "lucide-react";
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
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  // Handle Smart Scroll & Glass Effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if scrolled (for glass effect)
      setIsScrolled(currentScrollY > 10);

      // Determine visibility (hide on scroll down, show on scroll up)
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling DOWN
        if (!isMenuOpen) setIsVisible(false);
      } else {
        // Scrolling UP
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  // Lock body scroll when menu is open
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled || isMenuOpen
            ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200/50"
            : "bg-transparent"
        }`}
      >
        <div className="px-4 h-16 flex items-center justify-between">
          <Logo className="text-xl" />

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors focus:outline-none"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute left-0 top-1/2 block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
                    isMenuOpen ? "rotate-45" : "-translate-y-1.5"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45" : "translate-y-1.5"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white transform transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isMenuOpen
            ? "translate-y-0 opacity-100 visible"
            : "-translate-y-8 opacity-0 invisible"
        }`}
        style={{ paddingTop: "64px" }} // height of navbar
      >
        <div className="flex flex-col h-full">
          <nav className="flex-1 overflow-y-auto px-6 py-8">
            <ul className="space-y-6">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <li
                    key={link.href}
                    className={`transform transition-all duration-500 ${
                      isMenuOpen
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    }`}
                    style={{
                      transitionDelay: isMenuOpen
                        ? `${index * 50 + 100}ms`
                        : "0ms",
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center justify-between text-xl font-semibold py-2 group ${
                        isActive ? "text-indigo-600" : "text-gray-800"
                      }`}
                    >
                      <span className="group-active:scale-95 transition-transform origin-left">
                        {link.label}
                      </span>
                      {isActive && (
                        <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div
            className={`p-6 border-t border-gray-100 safe-area-bottom bg-gray-50/50 backdrop-blur-sm transform transition-all duration-700 ${
              isMenuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: isMenuOpen ? "400ms" : "0ms" }}
          >
            <div className="grid grid-cols-2 gap-4 mb-6">
              <a
                href="tel:0812345678"
                className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 active:scale-95 transition-transform"
              >
                <Phone className="w-6 h-6 text-indigo-600 mb-2" />
                <span className="text-sm font-medium text-gray-600">
                  โทรเลย
                </span>
              </a>
              <a
                href="#" // Replace with actual Line URL
                className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 active:scale-95 transition-transform"
              >
                <div className="w-6 h-6 text-[#00B900] mb-2 font-bold flex items-center justify-center text-lg">
                  L
                </div>
                <span className="text-sm font-medium text-gray-600">Line</span>
              </a>
            </div>

            <Button
              href="/contact"
              fullWidth
              size="lg"
              className="h-14 text-lg shadow-indigo-200 shadow-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              ขอใบเสนอราคา <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
