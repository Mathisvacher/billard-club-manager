import { Chip } from "@/src/components/shared/chip/chip";

interface MatchesCardStatusProps {
  winnerId?: string;
  currentUserId?: string;
}
export const MatchesCardStatus = ({
  winnerId,
  currentUserId,
}: MatchesCardStatusProps) => {
  if (!winnerId) {
    return <Chip label={"Nulle"} className="bg-background-grey" />;
  }

  if (winnerId === currentUserId) {
    return (
      <Chip
        label={"Victoire"}
        className="bg-background-victory text-foreground-victory"
      />
    );
  } else {
    return (
      <Chip
        label={"Défaite"}
        className="bg-background-defeat text-foreground-defeat"
      />
    );
  }
};
