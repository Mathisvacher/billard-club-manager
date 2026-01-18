import { MatchType } from "@/prisma/generated/prisma/enums";
import { clsx, type ClassValue } from "clsx";
import { fr } from "date-fns/locale";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

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

export const ROUTES = {
  matches: "/matches",
  clubMatches: "/club/matches",
  ranking: "/ranking",
  profile: "/profile",
  help: "help",
} as const;

export type MatchCardDTO = {
  id: string;
  date: Date | null;
  type: MatchType;
  winnerId?: string;
  players: {
    id: string;
    name: string;
    lastName: string | null;
    bestSerie: number;
    points: number;
    reprise: number;
  }[];
};

export const dateFormat = "d MMM yyyy";

const monthsFr = [
  "Jan",
  "Fév",
  "Mar",
  "Avr",
  "Mai",
  "Juin",
  "Juil",
  "Août",
  "Sept",
  "Oct",
  "Nov",
  "Déc",
];

export const formatDateCustom = (date: Date) => {
  const day = date.getDate();
  const month = monthsFr[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};
