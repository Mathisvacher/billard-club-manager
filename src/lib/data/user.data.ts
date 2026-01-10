"use server";

import { prisma } from "../prisma";
import { actionUser } from "../safe-action-client";

export const getUserData = actionUser.action(async ({ ctx }) => {
  return prisma.user.findFirst({
    where: { id: ctx.user.id },
  });
});
