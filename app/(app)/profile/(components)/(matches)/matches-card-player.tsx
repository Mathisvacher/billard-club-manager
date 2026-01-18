import { Trophy } from "lucide-react";
import Link from "next/link";

interface CardPlayerNameProps {
  name: string;
  lastName: string | null;
  isWinner?: boolean;
}
export default function MatchesCardPlayer({
  name,
  lastName,
  isWinner,
}: CardPlayerNameProps) {
  return (
    <Link
      href={"toto"}
      className={`flex font-semibold items-center gap-1 ${isWinner && "text-foreground "}`}
    >
      {`${name} ${lastName}`}
      {isWinner && <Trophy width={20} height={20} />}
    </Link>
  );
}
