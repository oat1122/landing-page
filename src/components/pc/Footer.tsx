import Link from "next/link";
import { Shirt, Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

const footerLinks = {
  menu: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Me" },
    { href: "/product", label: "Product" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  products: [
    { href: "/product/tshirt", label: "เสื้อยืด" },
    { href: "/product/polo", label: "เสื้อโปโล" },
    { href: "/product/custom", label: "สั่งผลิตตามออเดอร์" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-white mb-4"
            >
              <Shirt className="w-8 h-8 text-indigo-400" />
              <span>โรงงานผลิตเสื้อ</span>
            </Link>
            <p className="text-gray-400 mb-6">
              โรงงานผลิตเสื้อคุณภาพ ราคาถูกกว่าเพราะเราผลิตเอง
              รับผลิตเสื้อตามออเดอร์ ส่งตรงจากโรงงาน
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Menu Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">เมนู</h3>
            <ul className="space-y-3">
              {footerLinks.menu.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold mb-4">สินค้า</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">ติดต่อเรา</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  123 ถนนสุขุมวิท กรุงเทพฯ 10110
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-indigo-400 shrink-0" />
                <a
                  href="tel:0812345678"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  081-234-5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-indigo-400 shrink-0" />
                <a
                  href="mailto:info@example.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  info@example.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} โรงงานผลิตเสื้อ. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-500 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-500 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
