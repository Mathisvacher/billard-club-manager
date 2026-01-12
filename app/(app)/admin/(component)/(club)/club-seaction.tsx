import { getClub } from "@/src/lib/data/club.data";
import { getAllPlayers } from "@/src/lib/data/user.data";

export default async function ClubSection() {
  const resClub = await getClub();
  const resPlayers = await getAllPlayers();
  const players = resPlayers.data ?? [];
  const club = resClub.data;

  const admins = players.filter((p) => p.role !== "PLAYER");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        <h1>Infos club</h1>
        {club?.name}
      </div>
      <div className="flex flex-col">
        <h1>Joueurs</h1>
        <ul>
          {players.map((p) => (
            <li key={p.id}>{p.email}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
