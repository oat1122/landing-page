// ===== Process Section Content =====
// ไฟล์นี้สำหรับให้ทีม Content/SEO เข้ามาแก้ไขได้ง่ายๆ

export const PROCESS_CONTENT = {
  // Section Header
  section: {
    badge: "ง่ายใน 4 ขั้นตอน",
    title: "ขั้นตอนการสั่งผลิตเสื้อ",
    description:
      "กระบวนการสั่งผลิตเสื้อกับโรงงานของเราเรียบง่าย รวดเร็ว พร้อมทีมงานดูแลทุกขั้นตอน",
  },
};

// Steps Cards
export const PROCESS_STEPS = [
  {
    step: 1,
    iconName: "MessageSquare", // ชื่อ icon จาก lucide-react
    title: "สอบถาม & ปรึกษา",
    description:
      "ติดต่อสอบถามรายละเอียด แจ้งจำนวน รุ่นผ้า สี และแบบที่ต้องการ ทีมงานพร้อมให้คำปรึกษาฟรี",
    color: "bg-blue-500",
  },
  {
    step: 2,
    iconName: "Palette",
    title: "ออกแบบ & ยืนยันแบบ",
    description:
      "ทีมกราฟิกช่วยออกแบบ วางโลโก้ ปรับแก้จนพอใจ พร้อมส่งตัวอย่างให้ตรวจสอบก่อนเข้าสู่ขั้นตอนผลิต",
    color: "bg-purple-500",
  },
  {
    step: 3,
    iconName: "Factory",
    title: "เข้าสู่กระบวนการผลิต",
    description:
      "เริ่มผลิตเสื้อหลังยืนยันแบบและชำระมัดจำ มีทีม QC ตรวจสอบคุณภาพทุกขั้นตอน",
    color: "bg-orange-500",
  },
  {
    step: 4,
    iconName: "Truck",
    title: "จัดส่งถึงมือลูกค้า",
    description:
      "แพ็คสินค้าอย่างดี จัดส่งฟรีทั่วประเทศ (ตามเงื่อนไข) พร้อมแจ้ง Tracking Number",
    color: "bg-green-500",
  },
];
