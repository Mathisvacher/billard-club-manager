import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import SeasonSection from "./(component)/(season)/season-section";
import ClubSection from "./(component)/(club)/club-seaction";

export default function AdminPage() {
  return (
    <section className="bg-background rounded-2xl border w-full h-full p-4 ">
      <Tabs defaultValue="club" className="w-full flex h-full ">
        <TabsList>
          <TabsTrigger value="club" className="text-md">
            Club
          </TabsTrigger>
          <TabsTrigger value="season" className="text-md">
            Saison
          </TabsTrigger>
        </TabsList>
        <TabsContent value="club">
          <ClubSection />
        </TabsContent>
        <TabsContent value="season">
          <SeasonSection />
        </TabsContent>
      </Tabs>
    </section>
  );
}
