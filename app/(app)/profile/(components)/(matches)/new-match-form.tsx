"use client";

import { Input } from "@/src/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form } from "@/src/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  NumberField,
  DateField,
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
import { Loader2 } from "lucide-react";

interface MatchFormProps {
  clubUsersList: Prisma.UserModel[];
  onSuccessForm?: () => void;
  userAuthId?: string;
}

export default function MatchForm({
  userAuthId,
  clubUsersList,
  onSuccessForm,
}: MatchFormProps) {
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

  const form = useForm<z.infer<typeof MatchFormSchema>>({
    resolver: zodResolver(MatchFormSchema),
    defaultValues: {
      type: undefined,
      pointsPlayer1: undefined,
      pointsPlayer2: undefined,
      idPlayer2: undefined,
      bestSeriePlayer1: undefined,
      bestSeriePlayer2: undefined,
      reprises: undefined,
      date: new Date(),
    },
  });

  const user = clubUsersList.find((user) => user.id === userAuthId);
  if (!user) {
    console.error("Current user not found :/", {
      sessionUserId: userAuthId,
    });
    return null;
  }

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
    }),
  );

  // Calcul de moyenne
  const pointsPlayer1 = form.watch("pointsPlayer1");
  const pointsPlayer2 = form.watch("pointsPlayer2");
  const reprises = form.watch("reprises");

  const moyennePlayer1 =
    pointsPlayer1 && reprises && reprises > 0
      ? Number((pointsPlayer1 / reprises).toFixed(2))
      : undefined;

  const moyennePlayer2 =
    pointsPlayer2 && reprises && reprises > 0
      ? Number((pointsPlayer2 / reprises).toFixed(2))
      : undefined;

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
            <DateField form={form} fieldName={"date"} label="Date" />
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
            <NumberField
              form={form}
              fieldName={"pointsPlayer1"}
              label="Points"
            />
            <NumberField
              form={form}
              fieldName={"bestSeriePlayer1"}
              label="Série"
            />
            <TextField
              form={form}
              fieldName={"MoyenneJoueur1"}
              label="Moyenne"
              disabled
              computedValue={moyennePlayer1}
            />
          </div>
        </div>
        <Separator />
        {/* JOUEUR 2 */}
        <div className="flex flex-col gap-2 w-full">
          <p className="text-center w-full text-md font-semibold ">JOUEUR 2</p>
          <SelectField
            form={form}
            fieldName="idPlayer2"
            options={userOptions}
            placeholder="Sélectionner un joueur"
          />
          <div className="flex w-full justify-between gap-2">
            <NumberField
              form={form}
              fieldName={"pointsPlayer2"}
              label="Points"
            />
            <NumberField
              form={form}
              fieldName={"bestSeriePlayer2"}
              label="Série"
            />
            <TextField
              form={form}
              fieldName={"MoyenneJoueur2"}
              label="Moyenne"
              disabled
              computedValue={moyennePlayer2}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Annuler</Button>
          </DialogClose>

          <Button
            type="submit"
            disabled={form.formState.isSubmitting || !form.formState.isValid}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="animate-spin" /> Ajout du Match
              </>
            ) : (
              <p>Ajouter Match</p>
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
