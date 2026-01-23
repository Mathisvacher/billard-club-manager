import { Card, CardContent } from "@/src/components/ui/card";
import { formatDateCustom, MatchCardDTO } from "@/src/lib/utils";
import { Calendar } from "lucide-react";
import { MatchesCardFooter } from "./matches-card-footer";
import MatchesCardColumn from "./matches-card-column";
import MatchesCardPlayer from "./matches-card-player";

interface MatchesCardProps {
  matche: MatchCardDTO;
  currentUserId?: string; // Utile pour la page profile
}

export default function MatchesCard({
  matche,
  currentUserId,
}: MatchesCardProps) {
  let [p1, p2] = matche.players;

  // si le joueur actif n'est pas déjà p1, on inverse
  if (currentUserId) {
    if (p1.id !== currentUserId && p2?.id === currentUserId) {
      [p1, p2] = [p2, p1];
    }
  }

  const avgDisplay = (a: number, b: number) => {
    return (a / b).toFixed(2);
  };

  return (
    <Card>
      <CardContent className="flex flex-col gap-3 text-foreground-grey font-medium">
        {/* Content */}
        <div className="flex justify-between">
          {/* Players */}
          <div>
            {matche.date && (
              <p className="flex gap-1 items-center">
                <Calendar width={20} height={20} />
                {formatDateCustom(matche.date)}
              </p>
            )}
            <MatchesCardPlayer
              name={p1.name}
              lastName={p1.lastName}
              isWinner={matche.winnerId == p1.id}
            />
            <MatchesCardPlayer
              name={p2.name}
              lastName={p2.lastName}
              isWinner={matche.winnerId == p2.id}
            />
          </div>
          {/* Data */}
          <div className="flex gap-2">
            <MatchesCardColumn
              label="Points"
              valuePlayer1={p1.points}
              valuePlayer2={p2.points}
            />
            <MatchesCardColumn
              label="Série"
              valuePlayer1={p1.bestSerie}
              valuePlayer2={p2.bestSerie}
            />
            <MatchesCardColumn
              label="Moyenne"
              valuePlayer1={avgDisplay(p1.bestSerie, p1.reprise)}
              valuePlayer2={avgDisplay(p2.bestSerie, p2.reprise)}
            />
          </div>
        </div>
        {/* Footer */}
        <MatchesCardFooter
          winnerId={matche.winnerId}
          currentUserId={currentUserId}
          reprises={p1.reprise}
          type={matche.type}
        />
      </CardContent>
    </Card>
  );
}
