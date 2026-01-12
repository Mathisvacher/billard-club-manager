import { z } from "zod";

export const SeasonFormSchema = z.object({
  name: z.string(),
  startDate: z.date(),
  endDate: z.date().optional(),
});
