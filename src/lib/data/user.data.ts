"use server";

import { prisma } from "../prisma";
import { actionAdmin, actionUser } from "../safe-action-client";

export const getUserData = actionUser.action(async ({ ctx }) => {
  return prisma.user.findFirst({
    where: { id: ctx.user.id },
  });
});

export const getAllPlayers = actionAdmin.action(async ({ ctx }) => {
  return prisma.user.findMany({
    where: { clubId: ctx.user.clubId },
  });
});
