"use server";

import { prisma } from "@/src/lib/prisma";
import { actionClient, SafeError } from "@/src/lib/safe-action-client";
import { revalidatePath } from "next/cache";
import { ReviewFormSchema } from "./review.schema";

export const addReviewSafeAction = actionClient
  .schema(ReviewFormSchema)
  .action(async ({ parsedInput: input }) => {
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
    revalidatePath("/");
  });
