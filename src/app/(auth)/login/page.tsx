import LoginForm from "@/components/auth/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "เข้าสู่ระบบ | โรงงานผลิตเสื้อ",
  description: "เข้าสู่ระบบเพื่อจัดการบัญชีของคุณ",
};

export default function LoginPage() {
  return <LoginForm />;
}
