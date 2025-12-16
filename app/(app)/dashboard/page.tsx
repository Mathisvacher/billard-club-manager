import { getUser } from "@/src/lib/auth/auth-server";
import { redirect } from "next/navigation";
import ProfileSection from "./(components)/profile-section";
import MatchsSection from "./(components)/matchs-section";

export default async function DashboardPage() {
  // Check user auth
  const user = await getUser();
  if (!user) {
    redirect("signup");
  }

  return (
    <section className="w-full h-full  flex gap-3">
      <div className="flex flex-col w-2/3 gap-3">
        <MatchsSection user={user} />
        <div className="bg-background rounded-2xl border w-full h-full flex justify-center items-center ">
          matchs club
        </div>
      </div>
      <div className="flex flex-col w-1/3 gap-3">
        {/* Profile section */}
        <ProfileSection user={user} />
        <div className="bg-background rounded-2xl border w-full h-full flex justify-center items-center ">
          classement
        </div>
      </div>
    </section>
  );
}
