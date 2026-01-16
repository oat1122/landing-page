import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";

  // Mobile detection regex (รวม Tablet เป็น Desktop)
  const isMobile =
    /android(?!.*tablet)|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent
    );

  // Debug log
  console.log("[Middleware] User-Agent:", userAgent.substring(0, 50) + "...");
  console.log("[Middleware] isMobile:", isMobile);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-viewport", isMobile ? "mobile" : "desktop");

  // สร้าง Response และเพิ่ม Vary Header สำหรับ SEO
  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // สำคัญ: บอก Googlebot และ CDN ว่าหน้านี้แสดงผลต่างกันตาม User-Agent
  response.headers.set("Vary", "User-Agent");

  return response;
}

export const config = {
  matcher: "/",
};
