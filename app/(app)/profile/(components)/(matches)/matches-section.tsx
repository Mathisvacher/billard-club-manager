import { getUser } from "@/src/lib/auth/auth-server";
import NewMatchBtn from "./new-match-btn";
import { unauthorized } from "next/navigation";
import { getClubPlayersForCurrentUser } from "@/src/lib/data/club.data";
import MatchesCards from "./matches-cards";
import { getUserMatchs } from "@/src/lib/data/match.data";
import { MatchCardDTO } from "@/src/lib/utils";

export default async function MatchesSection() {
  const userAuth = await getUser();
  if (!userAuth) {
    return unauthorized();
  }

  const resClubPlayers = await getClubPlayersForCurrentUser();
  const clubPlayers = resClubPlayers.data ?? [];

  const resMatches = await getUserMatchs();
  const matchs = resMatches.data ?? [];
  const matchesDTO: MatchCardDTO[] = matchs.map(({ match }) => ({
    id: match.id,
    date: match.date,
    type: match.type,
    winnerId: match.winner?.id,
    players: match.players.map((p) => ({
      id: p.player.id,
      name: p.player.name,
      lastName: p.player.lastName,
      bestSerie: p.bestSerie,
      points: p.points,
      reprise: p.reprises,
    })),
  }));

  const orderedMatchesDTO = matchesDTO.sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return b.date.getTime() - a.date.getTime();
  });

  return (
    <div className="flex flex-col w-full h-full bg-card  border border-border-light rounded-2xl p-4">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <h1 className="font-semibold text-2xl whitespace-nowrap">Mes matchs</h1>
        <NewMatchBtn clubUsersList={clubPlayers} />
      </div>
      <MatchesCards matches={orderedMatchesDTO} />
    </div>
  );
}
