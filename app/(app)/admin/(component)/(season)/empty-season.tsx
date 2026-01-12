import { CloudSunRain } from "lucide-react";
import NewSeasonBtn from "./new-season-btn";

export default function SeasonEmpty() {
  return (
    <div className="flex flex-col gap-8 items-center h-full w-full justify-center">
      <div className="flex flex-col gap-2 items-center">
        <CloudSunRain size={64} className="text-foreground-grey" />
        <p className="font-semibold text-foreground-grey text-md text-center max-w-sm">
          Aucune saison n'éxiste pour ce club !
        </p>
      </div>

      <NewSeasonBtn />
    </div>
  );
}
