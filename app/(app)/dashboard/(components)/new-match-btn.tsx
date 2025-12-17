"use client";

import { Button } from "@/src/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import MatchForm from "./new-match-form";
import { Prisma } from "@/prisma/generated/prisma/client";
import { useState } from "react";

interface NewMatchBtnProps {
  user: Prisma.UserModel;
  clubUsersList: Prisma.UserModel[];
}

export default function NewMatchBtn({ user, clubUsersList }: NewMatchBtnProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-3 flex w-full justify-end">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size={"lg"} className="text-md" variant={"outline"}>
            <Plus />
            Ajouter un match
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Ajouter un nouveau match</DialogTitle>
            <DialogDescription>
              Rentrer ici les différentes informations liées à votre match
            </DialogDescription>
          </DialogHeader>
          {/* FORM */}
          <MatchForm
            user={user}
            clubUsersList={clubUsersList}
            onSuccessForm={() => {
              setOpen(false);
              console.log("alo ?");
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
