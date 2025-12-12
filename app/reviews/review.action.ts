"use server";

import { prisma } from "@/src/lib/prisma";
import { actionUser, SafeError } from "@/src/lib/safe-action-client";
import { revalidatePath } from "next/cache";
import { ReviewFormSchema } from "./review.schema";
import z from "zod";

export const addReviewSafeAction = actionUser
  .schema(ReviewFormSchema)
  .action(async ({ parsedInput: input, ctx }) => {
    if (input.name === "méchant") {
      throw new SafeError("Invalid name");
    }

    const newReview = await prisma.review.create({
      data: {
        review: input.review,
        name: input.name,
        start: 5,
        userId: ctx.user.id,
      },
    });
    revalidatePath("/");
  });

export const updateReviewAction = actionUser
  .schema(
    z.object({
      star: z.number().optional(),
      name: z.string().optional(),
      reviewId: z.string(),
    })
  )
  .action(async ({ parsedInput: input, ctx }) => {
    await prisma.review.update({
      where: {
        id: input.reviewId,
        userId: ctx.user.id,
      },
      data: input,
    });
    revalidatePath("/");
  });

export const deleteReviewAction = actionUser
  .schema(
    z.object({
      reviewId: z.string(),
    })
  )
  .action(async ({ parsedInput: input, ctx }) => {
    await prisma.review.delete({
      where: {
        id: input.reviewId,
        userId: ctx.user.id,
      },
    });
    revalidatePath("/");
  });
