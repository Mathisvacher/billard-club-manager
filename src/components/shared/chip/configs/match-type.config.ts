import { MatchTypeEnum } from "@/src/lib/enums";

export const MATCH_TYPE_CONFIG: Record<
  MatchTypeEnum,
  { label: string; className: string }
> = {
  LIBRE: {
    label: "Libre",
    className: "bg-background-libre text-foreground-libre",
  },
  CADRE: {
    label: "Cadre",
    className: "bg-background-cadre text-foreground-cadre",
  },
  BANDES: {
    label: "Bandes",
    className: "bg-background-bandes text-foreground-bandes",
  },
  TROIS_BANDES: {
    label: "3 Bandes",
    className: "bg-background-3bandes text-foreground-3bandes",
  },
  TROIS_BANDES_2_80: {
    label: "3 Bandes (2,80m)",
    className: "bg-background-3bandes-280 text-foreground-3bandes-280",
  },
};
