import { MatchType } from "@/prisma/generated/prisma/enums";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const MatchTypeLabels: Record<MatchType, string> = {
  [MatchType.LIBRE]: "Libre",
  [MatchType.CADRE]: "Cadre",
  [MatchType.BANDES]: "Bande",
  [MatchType.TROIS_BANDES]: "3 Bandes",
  [MatchType.TROIS_BANDES_2_80]: "3 Bandes (2,80m)",
};
