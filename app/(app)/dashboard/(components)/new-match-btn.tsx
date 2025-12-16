import { Button } from "@/src/components/ui/button";
import { Plus } from "lucide-react";

export default function NewMatchBtn() {
  return (
    <div className="p-3 flex w-full justify-end">
      <Button size={"lg"} className="text-md" variant={"outline"}>
        <Plus />
        Ajouter un match
      </Button>
    </div>
  );
}
