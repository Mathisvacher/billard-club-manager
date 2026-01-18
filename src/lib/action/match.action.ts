"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
import { actionUser, SafeError } from "../safe-action-client";
import { MatchType } from "@/prisma/generated/prisma/enums";
import { MatchFormSchema } from "../schema/match.schema";

export const addMatchSafeAction = actionUser
  .inputSchema(MatchFormSchema)
  .action(async ({ parsedInput: input, ctx }) => {
    const user = await prisma.user.findFirst({
      where: {
        id: ctx.user.id,
      },
    });
    const player2 = await prisma.user.findFirst({
      where: {
        id: input.idPlayer2,
      },
    });
    if (!user?.clubId || user.currentHandicap == null) {
      throw new SafeError("Votre profile manque d'information");
    }
    if (!player2?.clubId || player2.currentHandicap == null) {
      throw new SafeError(
        "Le profile de votre adversaire manque d'information",
      );
    }

    const clubId = user.clubId;
    if (!clubId) throw new SafeError("...");

    //TODO winner et seasonId
    await prisma.$transaction(async (tx) => {
      const match = await tx.match.create({
        data: {
          date: input.date,
          clubId: user.clubId!,
          type: input.type as MatchType,
          createdBy: ctx.user.id,
          seasonId: "9bb5bf10-deb1-4815-a0a4-79f8cfa55e23", //TODO
        },
      });

      await tx.matchPlayer.create({
        data: {
          matchId: match.id,
          playerId: ctx.user.id,
          handicap: user.currentHandicap!,
          points: input.pointsPlayer1,
          reprises: input.reprises,
          bestSerie: input.bestSeriePlayer1,
        },
      });

      await tx.matchPlayer.create({
        data: {
          matchId: match.id,
          playerId: input.idPlayer2,
          handicap: player2.currentHandicap!,
          points: input.pointsPlayer2,
          reprises: input.reprises,
          bestSerie: input.bestSeriePlayer2,
        },
      });
    });

    revalidatePath("/");
  });
