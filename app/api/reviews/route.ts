import { prisma } from "@/src/lib/prisma";
import { SafeError } from "@/src/lib/safe-action-client";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const Schema = z.object({
  name: z.string(),
  review: z.string(),
});

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const input = Schema.parse(body);

  if (input.name === "méchant") {
    throw new SafeError("Invalid name");
  }

  const newReview = await prisma.review.create({
    data: {
      review: input.review,
      name: input.name,
      start: 5,
    },
  });
  return NextResponse.json({
    review: newReview,
  });
};

export const GET = async (request: NextRequest) => {
  const reviews = await prisma.review.findMany();
  return NextResponse.json({ reviews });
};
