import { MatchType } from "@/prisma/generated/prisma/enums";
import { Chip } from "@/src/components/shared/chip/chip";
import { MATCH_TYPE_CONFIG } from "@/src/components/shared/chip/configs/match-type.config";

interface MatchTypeChipProps {
  type: MatchType;
}

export const MatchTypeChip = ({ type }: MatchTypeChipProps) => {
  const config = MATCH_TYPE_CONFIG[type];

  if (!config) return null;

  return <Chip label={config.label} className={config.className} />;
};
