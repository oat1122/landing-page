"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Package,
  Settings,
  LogOut,
  TrendingUp,
  ShoppingCart,
  FileText,
  Bell,
  Image,
} from "lucide-react";

interface DashboardContentProps {
  user?: {
    id?: string;
    name?: string | null;
    email?: string | null;
    role?: string;
  };
}

export default function DashboardContent({ user }: DashboardContentProps) {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  const stats = [
    {
      label: "คำสั่งซื้อทั้งหมด",
      value: "128",
      icon: ShoppingCart,
      color: "from-blue-500 to-cyan-500",
      change: "+12%",
    },
    {
      label: "ลูกค้าใหม่",
      value: "54",
      icon: Users,
      color: "from-purple-500 to-pink-500",
      change: "+8%",
    },
    {
      label: "รายได้เดือนนี้",
      value: "฿85,400",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
      change: "+24%",
    },
    {
      label: "สินค้าในคลัง",
      value: "312",
      icon: Package,
      color: "from-orange-500 to-amber-500",
      change: "-3%",
    },
  ];

  const menuItems = [
    { label: "แดชบอร์ด", icon: LayoutDashboard, active: true },
    { label: "คำสั่งซื้อ", icon: ShoppingCart },
    { label: "ลูกค้า", icon: Users },
    { label: "สินค้า", icon: Package },
    { label: "รายงาน", icon: FileText },
    { label: "ตั้งค่า", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 hidden lg:block">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-xl font-bold text-white">โรงงานผลิตเสื้อ</h1>
            <p className="text-sm text-gray-400">ระบบจัดการ</p>
          </div>

          {/* Menu */}
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  item.active
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Sign Out */}
          <div className="absolute bottom-6 left-6 right-6">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              ออกจากระบบ
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {/* Header */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white">
                สวัสดี, {user?.name || "Admin"} 👋
              </h1>
              <p className="text-gray-400 mt-1">
                ยินดีต้อนรับกลับมา! นี่คือภาพรวมของวันนี้
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-3 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                  3
                </span>
              </button>
              {/* Mobile Sign Out */}
              <button
                onClick={handleSignOut}
                className="lg:hidden p-3 bg-white/10 rounded-xl text-white hover:bg-red-500/20 hover:text-red-400 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      stat.change.startsWith("+")
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4">
              การดำเนินการด่วน
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <button className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors text-center group">
                <ShoppingCart className="w-8 h-8 text-purple-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-white text-sm">สร้างคำสั่งซื้อ</span>
              </button>
              <button className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors text-center group">
                <Users className="w-8 h-8 text-pink-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-white text-sm">เพิ่มลูกค้า</span>
              </button>
              <button className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors text-center group">
                <Package className="w-8 h-8 text-cyan-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-white text-sm">จัดการสินค้า</span>
              </button>
              <button className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors text-center group">
                <FileText className="w-8 h-8 text-amber-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-white text-sm">ดูรายงาน</span>
              </button>
              <Link
                href="/images"
                className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors text-center group"
              >
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image
                  className="w-8 h-8 text-green-400 mx-auto mb-2 group-hover:scale-110 transition-transform"
                  aria-hidden="true"
                />
                <span className="text-white text-sm">จัดการรูปภาพ</span>
              </Link>
            </div>
          </div>

          {/* User Info */}
          <div className="mt-6 bg-white/5 rounded-xl p-4 border border-white/10">
            <p className="text-gray-400 text-sm">
              เข้าสู่ระบบในฐานะ:{" "}
              <span className="text-white font-medium">
                {user?.email || user?.name}
              </span>{" "}
              | Role:{" "}
              <span className="text-purple-400 font-medium">
                {(user as { role?: string })?.role || "USER"}
              </span>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
