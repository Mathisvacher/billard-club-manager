import { getUser } from "@/src/lib/auth/auth-server";
import MatchesCard from "./matches-card";
import { MatchCardDTO } from "@/src/lib/utils";

interface MatchesCardsProps {
  matches: MatchCardDTO[];
}
export default async function MatchesCards({ matches }: MatchesCardsProps) {
  const user = await getUser();
  return (
    <div className="flex flex-col h-full w-full gap-3 overflow-auto">
      {matches.map((matche) => (
        <MatchesCard matche={matche} key={matche.id} currentUserId={user?.id} />
      ))}
    </div>
  );
}
