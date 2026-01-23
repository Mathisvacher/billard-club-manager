import { MatchTypeEnum } from "@/src/lib/enums";
import { RefreshCcw } from "lucide-react";
import { MatchesCardStatus } from "./matches-card-status";
import { MatchTypeChip } from "./match-type-chip";

interface MatchesCardFooterProps {
  winnerId?: string;
  currentUserId?: string;
  reprises: number;
  type: MatchTypeEnum;
}
export const MatchesCardFooter = ({
  winnerId,
  currentUserId,
  reprises,
  type,
}: MatchesCardFooterProps) => {
  return (
    <div className="flex justify-between items-center">
      <MatchesCardStatus winnerId={winnerId} currentUserId={currentUserId} />
      <div
        className={`bg-border`}
        style={{
          height: 15,
          width: 1,
        }}
      />
      <p className="flex items-center gap-1">
        <RefreshCcw width={20} height={20} /> {`${reprises} reprises`}
      </p>
      <div
        className={`bg-border`}
        style={{
          height: 15,
          width: 1,
        }}
      />
      <MatchTypeChip type={type} />
    </div>
  );
};
