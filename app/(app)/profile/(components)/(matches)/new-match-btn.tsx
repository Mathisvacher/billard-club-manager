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
import { useSession } from "@/src/lib/auth/auth-client";

interface NewMatchBtnProps {
  clubUsersList: Prisma.UserModel[];
}

export default function NewMatchBtn({ clubUsersList }: NewMatchBtnProps) {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

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
            userAuthId={session?.user.id}
            clubUsersList={clubUsersList}
            onSuccessForm={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
