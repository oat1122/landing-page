"use server";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { createProductApiSchema } from "@/lib/validations/product";

// GET - List products with filters and pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const type = searchParams.get("type"); // real | sample
    const categoryId = searchParams.get("categoryId");
    const status = searchParams.get("status"); // draft | active | inactive
    const search = searchParams.get("search");
    const featured = searchParams.get("featured");

    const skip = (page - 1) * limit;

    // Build where clause
    const where: {
      type?: string;
      categoryId?: string;
      status?: string;
      featured?: boolean;
      OR?: { name: { contains: string } }[];
    } = {};

    if (type) where.type = type;
    if (categoryId) where.categoryId = categoryId;
    if (status) where.status = status;
    if (featured === "true") where.featured = true;
    if (search) {
      where.OR = [{ name: { contains: search } }];
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
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
              tag: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
            },
          },
        },
      }),
      prisma.product.count({ where }),
    ]);

    // Transform tags to simpler format
    const transformedProducts = products.map((product) => ({
      ...product,
      tags: product.tags.map((t) => t.tag),
    }));

    return NextResponse.json({
      products: transformedProducts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

// POST - Create new product
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Validate with Zod schema
    const validationResult = createProductApiSchema.safeParse(body);
    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0];
      return NextResponse.json({ error: firstError.message }, { status: 400 });
    }

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
    } = validationResult.data;

    // Generate slug from name or use custom slug
    const slug =
      customSlug?.trim() ||
      name
        .toLowerCase()
        .trim()
        .replace(/[^\w\sก-๙]/g, "")
        .replace(/\s+/g, "-");

    // Check if slug already exists
    const existingProduct = await prisma.product.findUnique({
      where: { slug },
    });

    if (existingProduct) {
      return NextResponse.json(
        { error: "Slug นี้มีอยู่แล้ว กรุณาใช้ชื่ออื่น" },
        { status: 400 },
      );
    }

    // Check SKU uniqueness if provided
    if (sku) {
      const existingSku = await prisma.product.findUnique({
        where: { sku },
      });
      if (existingSku) {
        return NextResponse.json(
          { error: "SKU นี้มีอยู่แล้ว" },
          { status: 400 },
        );
      }
    }

    const product = await prisma.product.create({
      data: {
        name: name.trim(),
        slug,
        sku: sku?.trim() || null,
        description: description?.trim() || null,
        price: price ?? null,
        comparePrice: comparePrice ?? null,
        type: type || "real",
        mainImageId: mainImageId || null,
        categoryId: categoryId || null,
        metaTitle: metaTitle?.trim() || null,
        metaDescription: metaDescription?.trim() || null,
        status: status || "draft",
        featured: featured || false,
        createdBy: session.user.id,
        tags:
          tagIds && tagIds.length > 0
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

    return NextResponse.json(
      {
        product: {
          ...product,
          tags: product.tags.map((t) => t.tag),
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 },
    );
  }
}
