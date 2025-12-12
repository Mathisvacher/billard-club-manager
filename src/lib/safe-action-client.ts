import next from "next";
import { createSafeActionClient } from "next-safe-action";
import { getUser } from "./auth/auth-server";

export class SafeError extends Error {
  constructor(error: string) {
    super(error);
  }
}
// Create the client with default options.
//1. Middleware
//2. Server error
//3. Appel côté client
//4. Type safe des paramètres
// TUTO / COURS NextJS Server Action + API Route en 1 HEURE (3/5) timecode : 29:00
export const actionClient = createSafeActionClient({
  handleServerError: (error) => {
    if (error instanceof SafeError) {
      return error.message;
    }
    return "Something went wrong";
  },
});

export const actionUser = actionClient.use(async ({ next }) => {
  const user = await getUser();
  if (!user) {
    throw new SafeError("Invalid user");
  }
  return next({ ctx: { user } });
});
