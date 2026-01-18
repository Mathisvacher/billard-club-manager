import MatchesSection from "./(components)/(matches)/matches-section";
import OpponentSection from "./(components)/(opponent)/opponent-section";
import StatsSection from "./(components)/(stats)/stats-section";

export default function MatchsPage() {
  return (
    <div className="w-full h-full flex justify-center items-center gap-3">
      <MatchesSection />
      <div className="flex flex-col gap-3 h-full w-full">
        <StatsSection />
        <OpponentSection />
      </div>
    </div>
  );
}
