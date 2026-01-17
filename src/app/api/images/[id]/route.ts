// src/app/api/images/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteImageFile } from "@/lib/image-utils";

type RouteContext = {
  params: Promise<{ id: string }>;
};

/**
 * GET /api/images/:id - Get a single image by ID
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    const image = await prisma.image.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, name: true, username: true },
        },
      },
    });

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    return NextResponse.json({ image });
  } catch (error) {
    console.error("GET /api/images/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 500 },
    );
  }
}

/**
 * PUT /api/images/:id - Update image metadata/SEO
 */
export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await request.json();

    const image = await prisma.image.findUnique({
      where: { id },
    });

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Update allowed fields
    const updatedImage = await prisma.image.update({
      where: { id },
      data: {
        alt: body.alt?.trim() || image.alt,
        title: body.title?.trim() ?? image.title,
        caption: body.caption?.trim() ?? image.caption,
        description: body.description?.trim() ?? image.description,
        category: body.category?.trim() ?? image.category,
        tags: body.tags?.trim() ?? image.tags,
        usedIn: body.usedIn ?? image.usedIn,
      },
    });

    return NextResponse.json({
      success: true,
      image: updatedImage,
    });
  } catch (error) {
    console.error("PUT /api/images/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update image" },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/images/:id - Delete an image
 */
export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    const image = await prisma.image.findUnique({
      where: { id },
    });

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Delete file from disk
    await deleteImageFile(image.filepath);

    // Delete from database
    await prisma.image.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/images/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 },
    );
  }
}
