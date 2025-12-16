import { User } from "better-auth";
import NewMatchBtn from "./new-match-btn";

interface MatchsSectionProps {
  user: User;
}

export default function MatchsSection({ user }: MatchsSectionProps) {
  return (
    <section className="bg-background rounded-2xl border w-full h-full flex flex-col justify-between  items-center  ">
      {/* CONTENT */}
      <div className="w-full h-full flex justify-center items-center">
        matchs {user.name}
      </div>
      {/* FOOTER */}
      <NewMatchBtn />
    </section>
  );
}
