"use client";

import { Input } from "@/src/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form } from "@/src/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  NumberField,
  SelectField,
  TextField,
} from "@/src/components/shared/form-field";
import { Prisma } from "@/prisma/generated/prisma/client";
import { Separator } from "@/src/components/ui/separator";
import { DialogClose, DialogFooter } from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { MatchTypeLabels } from "@/src/lib/utils";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { addMatchSafeAction } from "@/src/lib/action/match.action";
import { MatchFormSchema } from "@/src/lib/schema/match.schema";

interface MatchFormProps {
  user: Prisma.UserModel;
  clubUsersList: Prisma.UserModel[];
  onSuccessForm?: () => void;
}

export default function MatchForm({
  user,
  clubUsersList,
  onSuccessForm,
}: MatchFormProps) {
  // // remplacer par API route ?
  const { executeAsync } = useAction(addMatchSafeAction, {
    onSuccess: () => {
      onSuccessForm?.();
      toast.success("Match ajouté !");
    },
    onError: (error) => {
      console.error("SAFE ACTION ERROR", error);
      toast.error("Erreur");
    },
  });

  const userOptions = clubUsersList
    .filter((userClub) => userClub.id != user.id)
    .map((user) => ({
      label: `${user.name} ${user.lastName} (${user.currentHandicap})`,
      value: user.id,
    }));

  const matchTypeOptions = Object.entries(MatchTypeLabels).map(
    ([value, label]) => ({
      value: value as keyof typeof MatchTypeLabels,
      label,
    })
  );

  const form = useForm<z.infer<typeof MatchFormSchema>>({
    resolver: zodResolver(MatchFormSchema),
    defaultValues: {
      type: undefined,
      points: undefined,
      opponentPoints: undefined,
      opponentId: undefined,
      bestSerie: undefined,
      opponentBestSerie: undefined,
      reprises: undefined,
      date: new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof MatchFormSchema>) {
    await executeAsync(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2 w-full ">
          <p className="text-center w-full text-md font-semibold">
            Informations match
          </p>
          <div className="flex w-full justify-between gap-2">
            <SelectField
              form={form}
              fieldName="type"
              label="Type"
              options={matchTypeOptions}
            />
            <TextField form={form} fieldName={"date"} label="Date" />
            <NumberField form={form} fieldName={"reprises"} label="Reprises" />
          </div>
        </div>
        <Separator />
        {/* JOUEUR 1 */}
        <div className="flex flex-col gap-2 w-full ">
          <p className="text-center w-full text-md font-semibold ">
            JOUEUR 1 (Moi)
          </p>
          <Input
            value={`${user.name} ${user.lastName?.toUpperCase()} (${
              user.currentHandicap
            })`}
            disabled
          />
          <div className="flex w-full justify-between gap-2">
            <NumberField form={form} fieldName={"points"} label="Points" />
            <NumberField form={form} fieldName={"bestSerie"} label="Série" />
            <TextField
              form={form}
              fieldName={"MoyenneJoueur1"}
              label="Moyenne"
              disabled
            />
          </div>
        </div>
        <Separator />
        {/* JOUEUR 2 */}
        <div className="flex flex-col gap-2 w-full">
          <p className="text-center w-full text-md font-semibold ">JOUEUR 2</p>
          <SelectField
            form={form}
            fieldName="opponentId"
            options={userOptions}
            placeholder="Sélectionner un joueur"
          />
          <div className="flex w-full justify-between gap-2">
            <NumberField
              form={form}
              fieldName={"opponentPoints"}
              label="Points"
            />
            <NumberField
              form={form}
              fieldName={"opponentBestSerie"}
              label="Série"
            />
            <TextField
              form={form}
              fieldName={"MoyenneJoueur2"}
              label="Moyenne"
              disabled
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Annuler</Button>
          </DialogClose>
          <Button type="submit">Ajouter Match</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
