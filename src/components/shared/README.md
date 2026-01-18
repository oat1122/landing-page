# Shared UI Components

คู่มือ UI Components ที่ใช้ร่วมกันในโปรเจค

---

## 📁 รายการ Components

| Component           | ไฟล์                  | คำอธิบาย                            |
| ------------------- | --------------------- | ----------------------------------- |
| **LoadingSpinner**  | `LoadingSpinner.tsx`  | แสดงสถานะ loading (spinner หมุน)    |
| **EmptyState**      | `EmptyState.tsx`      | แสดงเมื่อไม่มีข้อมูล                |
| **Badge**           | `Badge.tsx`           | แท็ก/ป้ายกำกับ เช่น หมวดหมู่, สถานะ |
| **SearchInput**     | `SearchInput.tsx`     | ช่องค้นหาพร้อมไอคอน                 |
| **Modal**           | `Modal.tsx`           | Popup container สำหรับ dialog       |
| **DropZone**        | `DropZone.tsx`        | พื้นที่ลากไฟล์มาวาง (drag & drop)   |
| **Accordion**       | `Accordion.tsx`       | เนื้อหาแบบยุบ/ขยายได้ (เช่น FAQ)    |
| **ConfirmDialog**   | `ConfirmDialog.tsx`   | ยืนยันการกระทำ (ลบ, บันทึก)         |
| **CountdownTimer**  | `CountdownTimer.tsx`  | นับถอยหลัง (วัน, ชม., นาที, วิ)     |
| **Lightbox**        | `Lightbox.tsx`        | แสดงรูปขนาดเต็ม + เลื่อนซ้าย/ขวา    |
| **DateRangeFilter** | `DateRangeFilter.tsx` | เลือกช่วงวันที่                     |
| **SectionHeading**  | `SectionHeading.tsx`  | หัวข้อ section พร้อม badge          |
| **Button**          | `Button.tsx`          | ปุ่มสำเร็จรูป หลาย variant          |
| **Logo**            | `Logo.tsx`            | โลโก้เว็บไซต์                       |
| **BackButton**      | `BackButton.tsx`      | ปุ่มย้อนกลับ                        |

---

## 🔧 วิธีใช้งาน

```tsx
// ตัวอย่างการ import
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import Badge from "@/components/shared/Badge";
import Modal from "@/components/shared/Modal";

// ใช้งาน
<LoadingSpinner size="md" />
<Badge variant="primary">หมวดหมู่</Badge>
<Modal isOpen={isOpen} onClose={onClose} title="หัวข้อ">
  เนื้อหา
</Modal>
```

---

## 📌 หมายเหตุ

- ทุก component รองรับ `className` prop สำหรับ custom styling
- ดูรายละเอียด props ใน source code ของแต่ละไฟล์
