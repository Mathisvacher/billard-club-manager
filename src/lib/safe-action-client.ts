import { createSafeActionClient } from "next-safe-action";
import { getUser } from "./auth/auth-server";
import { prisma } from "./prisma";

export class SafeError extends Error {
  constructor(error: string) {
    super(error);
  }
}

export const actionClient = createSafeActionClient({
  handleServerError: (error) => {
    if (error instanceof SafeError) {
      return error.message;
    }
    console.log("###ERROR###");
    console.error(error);
    return "Something went wrong";
  },
});

// Check if user is authenticated
export const actionAuth = actionClient.use(async ({ next }) => {
  const user = await getUser();
  if (!user) {
    throw new SafeError("Invalid user");
  }
  return next({ ctx: { user } });
});

// Check if user is authenticated + User DB
export const actionUser = actionAuth.use(async ({ ctx, next }) => {
  const user = await prisma.user.findUnique({
    where: { id: ctx.user.id },
    select: {
      id: true,
      email: true,
      clubId: true,
      role: true,
    },
  });

  if (!user) {
    throw new SafeError("User not found");
  }

  return next({ ctx: { user } });
});

// Check permissions
export const actionAdmin = actionUser.use(async ({ ctx, next }) => {
  if (ctx.user.role !== "ADMIN" && ctx.user.role !== "SUPER_ADMIN") {
    throw new SafeError("User not allowed");
  }
  return next({ ctx });
});
