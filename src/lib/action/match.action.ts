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

    if (!user?.clubId || user.currentHandicap == null) {
      throw new SafeError("Votre profile manque d'information");
    }
    // Match
    const match = await prisma.match.create({
      data: {
        date: input.date ? new Date(input.date) : undefined,
        clubId: user.clubId,
        type: input.type as MatchType,
        createdBy: ctx.user.id,
        seasonId: "u9LUgMZWGoez6yPjuvxzJS2HhvpdRNlW", //TODO trouver comment gerer ça
      },
    });

    // Score joueur 1 (user)
    await prisma.matchPlayer.create({
      data: {
        matchId: match.id,
        playerId: ctx.user.id,
        handicap: user?.currentHandicap,
        points: input.points,
        reprises: input.reprises,
        bestSerie: input.bestSerie,
      },
    });

    // Score joueur 2
    const opponent = await prisma.user.findFirst({
      where: {
        id: input.opponentId,
      },
    });
    if (!opponent?.clubId || opponent.currentHandicap == null) {
      throw new SafeError("Votre profile manque d'information");
    }
    await prisma.matchPlayer.create({
      data: {
        matchId: match.id,
        playerId: input.opponentId,
        handicap: opponent?.currentHandicap,
        points: input.opponentPoints,
        reprises: input.reprises,
        bestSerie: input.opponentBestSerie,
      },
    });
    revalidatePath("/");
  });
