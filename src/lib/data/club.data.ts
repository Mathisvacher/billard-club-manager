"use server";

import { prisma } from "../prisma";
import { actionUser } from "../safe-action-client";

export const getUsersInSameClub = actionUser.action(async ({ ctx }) => {
  const user = await prisma.user.findFirst({ where: { id: ctx.user.id } });
  if (!user?.clubId) return [];
  const clubUsersList = await prisma.user.findMany({
    where: { clubId: user.clubId },
  });
  return clubUsersList || [];
});
