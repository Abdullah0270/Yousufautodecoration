import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    await prisma.product.createMany({
      data: [
        {
          name: "Truck Mirror Set",
          slug: "truck-mirror-set",
          description: "Premium chrome mirror set",
          price: 3500,
          image: "/products/mirror.jpg",
          categoryId: 1,
        },
        {
          name: "LED Roof Lights",
          slug: "led-roof-lights",
          description: "High quality LED lights",
          price: 5500,
          image: "/products/led.jpg",
          categoryId: 2,
        },
      ],
    });

    return NextResponse.json({
      success: true,
      message: "Products Added",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}