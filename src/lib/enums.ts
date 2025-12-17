export const MatchTypeEnum = {
  LIBRE: "LIBRE",
  CADRE: "CADRE",
  BANDES: "BANDES",
  TROIS_BANDES: "TROIS_BANDES",
  TROIS_BANDES_2_80: "TROIS_BANDES_2_80",
} as const;

export type MatchTypeEnum = (typeof MatchTypeEnum)[keyof typeof MatchTypeEnum];
