"use server";

import { prisma } from "../prisma";
import { actionUser, SafeError } from "../safe-action-client";

// TODO c'est dans ce fichier ou dans user.data ?
export const getUsersInSameClub = actionUser.action(async ({ ctx }) => {
  const user = await prisma.user.findFirst({ where: { id: ctx.user.id } });
  if (!user?.clubId) return [];
  const clubUsersList = await prisma.user.findMany({
    where: { clubId: user.clubId },
  });
  return clubUsersList || [];
});

export const getClub = actionUser.action(async ({ ctx }) => {
  const clubId = ctx.user.clubId;
  if (!clubId) {
    throw new SafeError("User has no clubId");
  }
  const club = await prisma.club.findFirst({
    where: { id: clubId },
  });
  return club;
});
