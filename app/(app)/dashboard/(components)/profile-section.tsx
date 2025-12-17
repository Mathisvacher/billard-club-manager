import { getUserData } from "@/src/lib/data/user.action";
import { redirect } from "next/navigation";

export default async function ProfileSection() {
  const result = await getUserData();
  const user = result.data;
  if (!user) {
    redirect("signup");
  }
  return (
    <div className="bg-background rounded-2xl border w-full h-full flex flex-col justify-center items-center  ">
      <div className="flex gap-2 text-xl font-bold">
        <p>{`${user.name} ${user.lastName?.toUpperCase()}`}</p>(
        {user.currentHandicap})
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <SmallDataCard label={"Victoire"} value={10} />
          <SmallDataCard label={"Matchs"} value={12} />
        </div>
        <div className="flex gap-2">
          <SmallDataCard label={"Meilleur Série"} value={12} />
          <SmallDataCard label={"Moyenne"} value={10} />
        </div>
      </div>
    </div>
  );
}

interface SmallDataCardProps {
  label: string;
  value: number;
}

const SmallDataCard = ({ label, value }: SmallDataCardProps) => {
  return (
    <div className="flex m-3 p-3 flex-col bg-background-grey justify-center items-center rounded-2xl w-full">
      <p className="text-sm">{label}</p>
      <p className="font-bold">{value}</p>
    </div>
  );
};
