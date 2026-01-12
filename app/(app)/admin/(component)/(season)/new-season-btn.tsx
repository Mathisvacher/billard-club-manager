"use client";

import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { useState } from "react";
import NewSeasonForm from "./new-season-form";

interface NewSeasonBtnProps {
  addOtherSeason?: boolean;
}
export default function NewSeasonBtn({ addOtherSeason }: NewSeasonBtnProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"lg"} className="text-md" variant={"outline"}>
          {addOtherSeason
            ? "Définir une nouvelle saison"
            : "Définir une saison"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Définir une nouvelle saison</DialogTitle>
          <DialogDescription>
            Rentrer ici les différentes informations liées à la saison
          </DialogDescription>
        </DialogHeader>
        {/* FORM */}
        <NewSeasonForm onSuccessForm={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
