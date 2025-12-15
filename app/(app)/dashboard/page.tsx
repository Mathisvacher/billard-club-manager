import { getSession } from "@/src/lib/auth/auth-server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  // Check user auth
  const session = await getSession();
  if (!session) {
    redirect("signup");
  }

  return (
    <section className="w-full h-full  flex gap-3">
      <div className="flex flex-col w-2/3 gap-3">
        <div className="bg-background rounded-2xl border w-full h-full flex justify-center items-center ">
          matchs
        </div>
        <div className="bg-background rounded-2xl border w-full h-full flex justify-center items-center ">
          matchs club
        </div>
      </div>
      <div className="flex flex-col w-1/3 gap-3">
        <div className="bg-background rounded-2xl border w-full h-full flex justify-center items-center  ">
          profil
        </div>
        <div className="bg-background rounded-2xl border w-full h-full flex justify-center items-center ">
          classement
        </div>
      </div>
    </section>
  );
}
