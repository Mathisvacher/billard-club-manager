import { getAllSeasons } from "@/src/lib/data/season.data";
import SeasonEmpty from "./empty-season";
import SeasonsTab from "./seasons-tab";

export default async function SeasonSection() {
  const res = await getAllSeasons();
  const seasons = res.data ?? [];
  const hasSeasons = seasons && seasons.length > 0;
  const seasonsIsActive = seasons?.filter((s) => s.isActive);
  const seasonsNotIsActive = seasons?.filter((s) => !s.isActive);

  return (
    <div className="flex h-full w-full">
      {!hasSeasons ? (
        <SeasonEmpty />
      ) : (
        <div className="flex flex-col gap-6 mt-6 w-full">
          {seasonsIsActive.length > 0 && (
            <SeasonsTab isActive seasons={seasonsIsActive} />
          )}
          {seasonsNotIsActive.length > 0 && (
            <SeasonsTab seasons={seasonsNotIsActive} />
          )}
        </div>
      )}
    </div>
  );
}
