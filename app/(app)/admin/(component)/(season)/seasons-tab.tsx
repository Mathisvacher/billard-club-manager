import { Prisma } from "@/prisma/generated/prisma/client";
import NewSeasonBtn from "./new-season-btn";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

interface IsActiveSeasonsProps {
  seasons: Prisma.SeasonModel[];
  isActive?: boolean;
}

export default function SeasonsTab({
  seasons,
  isActive,
}: IsActiveSeasonsProps) {
  return (
    <div className="flex flex-col gap-4  w-full">
      <p className="text-foreground-grey  border-2 text-lg font-semibold w-fit p-2 rounded-2xl">
        {isActive ? "Saison active" : "Saisons passées"}
      </p>

      {seasons.map((season) => (
        <Card key={season.id} className="w-full">
          <CardHeader>
            <CardTitle>{season.name}</CardTitle>
          </CardHeader>

          <CardContent>toto</CardContent>
        </Card>
      ))}
      <div className="flex justify-start">
        {isActive && <NewSeasonBtn addOtherSeason />}
      </div>
    </div>
  );
}
