// ===== Hero Section Content =====
// ไฟล์นี้สำหรับให้ทีม Content/SEO เข้ามาแก้ไขได้ง่ายๆ
// โดยไม่ต้องแตะไฟล์ Component

export const HERO_CONTENT = {
  // Badge ด้านบน
  badge: "ราคาโรงงาน ถูกกว่าใคร!",

  // หัวข้อหลัก (H1)
  title: {
    prefix: "โรงงานผลิต",
    highlight: "เสื้อยืด & เสื้อโปโล", // ใช้ Keyword หลักตรงนี้
  },

  // คำอธิบาย
  description:
    "รับผลิตเสื้อตามออเดอร์ ราคาถูกกว่าเพราะเราผลิตเอง ส่งตรงจากโรงงานถึงมือคุณ คุณภาพดี มีมาตรฐาน",

  // ปุ่ม CTA
  buttons: {
    primary: {
      text: "ดูสินค้า",
      href: "/product",
    },
    secondary: {
      text: "ติดต่อเรา",
      href: "/contact",
    },
  },

  // Floating Elements บน Hero Image
  floatingElements: {
    discount: "-70%",
    status: "พร้อมส่ง",
  },

  // Hero Image Placeholder (จะเปลี่ยนเป็นรูปจริงในภายหลัง)
  heroImage: {
    title: "เสื้อคุณภาพ",
    subtitle: "ราคาโรงงาน",
  },
};

// Features ใต้ปุ่ม CTA
export const HERO_FEATURES = [
  {
    iconName: "Sparkles", // ชื่อ icon จาก lucide-react
    title: "คุณภาพดี",
    description: "เนื้อผ้าคุณภาพสูง ใส่สบาย",
  },
  {
    iconName: "Truck",
    title: "จัดส่งรวดเร็ว",
    description: "ส่งตรงจากโรงงาน ทั่วไทย",
  },
  {
    iconName: "Shield",
    title: "รับประกัน",
    description: "รับประกันคุณภาพทุกชิ้น",
  },
];
