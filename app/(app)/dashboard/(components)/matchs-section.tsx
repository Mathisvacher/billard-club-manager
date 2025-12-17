import NewMatchBtn from "./new-match-btn";
import { getUserData } from "@/src/lib/data/user.action";
import { redirect } from "next/navigation";
import { getUsersInSameClub } from "@/src/lib/data/club.action";

export default async function MatchsSection() {
  const result = await getUserData();
  const user = result.data;
  if (!user) {
    redirect("signup");
  }

  const res = await getUsersInSameClub();
  const clubUsersList = res.data || [];

  return (
    <section className="bg-background rounded-2xl border w-full h-full flex flex-col justify-between  items-center  ">
      {/* CONTENT */}
      <div className="w-full h-full flex justify-center items-center">
        matchs {user.name}
      </div>
      {/* FOOTER */}
      <NewMatchBtn user={user} clubUsersList={clubUsersList} />
    </section>
  );
}
