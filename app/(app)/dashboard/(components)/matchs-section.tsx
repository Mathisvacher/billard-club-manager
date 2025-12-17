import NewMatchBtn from "./new-match-btn";
import { getUserData } from "@/src/lib/data/user.data";
import { redirect } from "next/navigation";
import { getUsersInSameClub } from "@/src/lib/data/club.data";
import { getUserMatchs } from "@/src/lib/data/match.data";
import { Card, CardContent } from "@/src/components/ui/card";

export default async function MatchsSection() {
  const userRes = await getUserData();
  const user = userRes.data;
  if (!user) {
    redirect("signup");
  }

  const clubUsersListRes = await getUsersInSameClub();
  const clubUsersList = clubUsersListRes.data || [];

  const matchsRes = await getUserMatchs();
  const matchs = matchsRes.data;

  return (
    <section className="bg-background rounded-2xl border w-full h-full flex flex-col justify-between  items-center  ">
      {/* CONTENT */}
      <div className="w-full h-full flex justify-center items-center">
        matchs {user.name}
        {matchs?.map((match) => (
          <Card key={match.matchId}>
            <CardContent>{match.points}</CardContent>
          </Card>
        ))}
      </div>
      {/* FOOTER */}
      <NewMatchBtn user={user} clubUsersList={clubUsersList} />
    </section>
  );
}
