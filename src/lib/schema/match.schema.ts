import { MatchTypeEnum } from "@/src/lib/enums";
import z from "zod";

export const MatchFormSchema = z.object({
  pointsPlayer1: z.number(),
  pointsPlayer2: z.number(),
  bestSeriePlayer1: z.number(),
  idPlayer2: z.string(),
  bestSeriePlayer2: z.number(),
  reprises: z.number(),
  date: z.date().optional(),
  type: z.enum(Object.values(MatchTypeEnum) as [string, ...string[]]),
});
