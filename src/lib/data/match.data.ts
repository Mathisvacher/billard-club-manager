"use server";

import { prisma } from "../prisma";
import { actionUser } from "../safe-action-client";

export const getUserMatchs = actionUser.action(async ({ ctx }) => {
  const matchs = await prisma.matchPlayer.findMany({
    where: { playerId: ctx.user.id },
    include: {
      match: {
        include: {
          players: {
            include: { player: true },
          },
          winner: true,
        },
      },
    },
  });
  return matchs;
});
