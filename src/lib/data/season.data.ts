"use server";

import { prisma } from "../prisma";
import { actionUser, SafeError } from "../safe-action-client";

export const getAllSeasons = actionUser.action(async ({ ctx }) => {
  if (!ctx.user.clubId) {
    throw new SafeError("User has no clubId");
  }

  const seasons = await prisma.season.findMany({
    where: { clubId: ctx.user.clubId },
  });

  return seasons;
});
