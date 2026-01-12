"use server";

import { revalidatePath } from "next/cache";
import { actionAdmin, SafeError } from "../safe-action-client";
import { SeasonFormSchema } from "../schema/season.schema";
import { prisma } from "../prisma";

export const createSeasonSafeAction = actionAdmin
  .inputSchema(SeasonFormSchema)
  .action(async ({ parsedInput: input, ctx }) => {
    const clubId = ctx.user.clubId;

    if (!clubId) {
      throw new SafeError("User has no clubId");
    }

    await prisma.$transaction(async (tx) => {
      // Désactiver toutes les saisons actives du club
      await tx.season.updateMany({
        where: {
          clubId,
          isActive: true,
        },
        data: {
          isActive: false,
        },
      });

      // Créer la nouvelle saison active
      await tx.season.create({
        data: {
          name: input.name,
          clubId,
          startDate: input.startDate,
          endDate: input.endDate,
          isActive: true,
        },
      });
    });

    revalidatePath("/admin");
  });
