// src/app/api/images/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  validateImageFile,
  generateFilename,
  getDatePath,
  getImageMetadata,
  processImage,
  saveImageToFile,
  getImageUrl,
  ALLOWED_MIME_TYPES,
  MAX_FILE_SIZE,
} from "@/lib/image-utils";

/**
 * GET /api/images - List all images with pagination and filters
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const where: Record<string, unknown> = {};

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { alt: { contains: search } },
        { title: { contains: search } },
        { tags: { contains: search } },
      ];
    }

    const [images, total] = await Promise.all([
      prisma.image.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          user: {
            select: { id: true, name: true, username: true },
          },
        },
      }),
      prisma.image.count({ where }),
    ]);

    return NextResponse.json({
      images,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET /api/images error:", error);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/images - Upload a new image
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "ไฟล์ต้องเป็นรูปภาพเท่านั้น (jpg, png, gif, webp, svg)" },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "ไฟล์ต้องมีขนาดไม่เกิน 5MB" },
        { status: 400 },
      );
    }

    // Get SEO fields from form data
    const alt = formData.get("alt") as string;
    const title = formData.get("title") as string | null;
    const caption = formData.get("caption") as string | null;
    const description = formData.get("description") as string | null;
    const category = formData.get("category") as string | null;
    const tags = formData.get("tags") as string | null;

    if (!alt || alt.trim() === "") {
      return NextResponse.json(
        { error: "Alt text is required for SEO" },
        { status: 400 },
      );
    }

    // Process the image
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Get original metadata
    const metadata = await getImageMetadata(buffer);

    // Process and optimize (convert to WebP)
    const processed = await processImage(buffer, file.type);

    // Generate filename and save
    const datePath = getDatePath();
    const filename = generateFilename(file.name).replace(
      /\.[^.]+$/,
      processed.extension,
    );
    const filepath = await saveImageToFile(
      processed.buffer,
      filename,
      datePath,
    );
    const url = getImageUrl(filepath);

    // Save to database
    const image = await prisma.image.create({
      data: {
        filename: file.name,
        filepath,
        url,
        mimeType: processed.mimeType,
        size: processed.buffer.length,
        width: metadata.width,
        height: metadata.height,
        alt: alt.trim(),
        title: title?.trim() || null,
        caption: caption?.trim() || null,
        description: description?.trim() || null,
        category: category?.trim() || null,
        tags: tags?.trim() || null,
        uploadedBy: session.user.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        image,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/images error:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 },
    );
  }
}
