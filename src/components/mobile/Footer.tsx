import Link from "next/link";
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 rounded-t-3xl mt-8">
      <div className="px-6">
        <div className="mb-8">
          <p className="text-gray-400 text-sm leading-relaxed">
            โรงงานผลิตเสื้อคุณภาพ ราคาถูกกว่าเพราะเราผลิตเอง
            รับผลิตเสื้อตามออเดอร์ ส่งตรงจากโรงงาน
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-4 mb-10">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <span className="text-sm">123 ถนนสุขุมวิท กรุงเทพฯ 10110</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-indigo-400 shrink-0" />
            <a href="tel:0812345678" className="text-sm">
              081-234-5678
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-indigo-400 shrink-0" />
            <a href="mailto:info@example.com" className="text-sm">
              info@example.com
            </a>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 mb-10">
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 gap-8 mb-10 border-t border-gray-800 pt-8">
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">เมนู</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about">เกี่ยวกับเรา</Link>
              </li>
              <li>
                <Link href="/product">สินค้า</Link>
              </li>
              <li>
                <Link href="/blog">บทความ</Link>
              </li>
              <li>
                <Link href="/contact">ติดต่อเรา</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">สินค้า</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/product/tshirt">เสื้อยืด</Link>
              </li>
              <li>
                <Link href="/product/polo">เสื้อโปโล</Link>
              </li>
              <li>
                <Link href="/product/custom">สั่งผลิต</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
          <p>© {currentYear} โรงงานผลิตเสื้อ. All rights reserved.</p>
          <div className="mt-3 flex justify-center gap-4">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
