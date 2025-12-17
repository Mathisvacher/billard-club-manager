import { MatchTypeEnum } from "@/src/lib/enums";
import z from "zod";

export const MatchFormSchema = z.object({
  points: z.number(),
  opponentPoints: z.number(),
  bestSerie: z.number(),
  opponentId: z.string(),
  opponentBestSerie: z.number(),
  reprises: z.number(),
  date: z.date().optional(),
  type: z.enum(Object.values(MatchTypeEnum) as [string, ...string[]]),
});
