"use server";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET - Get single product
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        mainImage: {
          select: {
            id: true,
            url: true,
            alt: true,
            width: true,
            height: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        tags: {
          include: {
            tag: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      product: {
        ...product,
        tags: product.tags.map((t) => t.tag),
      },
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 },
    );
  }
}

// PUT - Update product
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const {
      name,
      slug: customSlug,
      sku,
      description,
      price,
      comparePrice,
      type,
      mainImageId,
      categoryId,
      tagIds,
      metaTitle,
      metaDescription,
      status,
      featured,
    } = body;

    if (!name?.trim()) {
      return NextResponse.json(
        { error: "กรุณากรอกชื่อสินค้า" },
        { status: 400 },
      );
    }

    // Generate slug from name or use custom slug
    const slug =
      customSlug?.trim() ||
      name
        .toLowerCase()
        .trim()
        .replace(/[^\w\sก-๙]/g, "")
        .replace(/\s+/g, "-");

    // Check if slug already exists (except current product)
    const existingProduct = await prisma.product.findFirst({
      where: {
        slug,
        NOT: { id },
      },
    });

    if (existingProduct) {
      return NextResponse.json(
        { error: "Slug นี้มีอยู่แล้ว กรุณาใช้ชื่ออื่น" },
        { status: 400 },
      );
    }

    // Check SKU uniqueness if provided (except current product)
    if (sku) {
      const existingSku = await prisma.product.findFirst({
        where: {
          sku,
          NOT: { id },
        },
      });
      if (existingSku) {
        return NextResponse.json(
          { error: "SKU นี้มีอยู่แล้ว" },
          { status: 400 },
        );
      }
    }

    // Update product with transaction to handle tags
    const product = await prisma.$transaction(async (tx) => {
      // Delete existing tags
      await tx.productToTag.deleteMany({
        where: { productId: id },
      });

      // Update product and create new tags
      return tx.product.update({
        where: { id },
        data: {
          name: name.trim(),
          slug,
          sku: sku?.trim() || null,
          description: description?.trim() || null,
          price:
            price !== undefined
              ? price
                ? parseFloat(price)
                : null
              : undefined,
          comparePrice:
            comparePrice !== undefined
              ? comparePrice
                ? parseFloat(comparePrice)
                : null
              : undefined,
          type: type || undefined,
          mainImageId:
            mainImageId !== undefined ? mainImageId || null : undefined,
          categoryId: categoryId !== undefined ? categoryId || null : undefined,
          metaTitle:
            metaTitle !== undefined ? metaTitle?.trim() || null : undefined,
          metaDescription:
            metaDescription !== undefined
              ? metaDescription?.trim() || null
              : undefined,
          status: status || undefined,
          featured: featured !== undefined ? featured : undefined,
          tags:
            tagIds !== undefined && tagIds?.length > 0
              ? {
                  create: tagIds.map((tagId: string) => ({
                    tagId,
                  })),
                }
              : undefined,
        },
        include: {
          mainImage: {
            select: {
              id: true,
              url: true,
              alt: true,
            },
          },
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });
    });

    return NextResponse.json({
      product: {
        ...product,
        tags: product.tags.map((t) => t.tag),
      },
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 },
    );
  }
}

// DELETE - Delete product
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}
