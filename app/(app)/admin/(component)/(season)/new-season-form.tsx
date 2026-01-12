import { DateField, TextField } from "@/src/components/shared/form-field";
import { Button } from "@/src/components/ui/button";
import { DialogClose, DialogFooter } from "@/src/components/ui/dialog";
import { Form } from "@/src/components/ui/form";
import { createSeasonSafeAction } from "@/src/lib/action/season.action";
import { SeasonFormSchema } from "@/src/lib/schema/season.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface SeasonFormProps {
  onSuccessForm?: () => void;
}

export default function NewSeasonForm({ onSuccessForm }: SeasonFormProps) {
  const { executeAsync } = useAction(createSeasonSafeAction, {
    onSuccess: () => {
      onSuccessForm?.();
      toast.success("Saison créée !");
    },
    onError: (error) => {
      console.error("SAFE ACTION ERROR", error);
      toast.error("Une erreur est survenue lors de la création de la saison !");
    },
  });

  const form = useForm<z.infer<typeof SeasonFormSchema>>({
    resolver: zodResolver(SeasonFormSchema),
    defaultValues: {
      name: "",
      startDate: new Date(),
      endDate: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof SeasonFormSchema>) {
    await executeAsync(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2 w-full ">
          <TextField form={form} fieldName={"name"} label="Nom" />
          <div className="flex gap-4">
            <DateField form={form} fieldName={"startDate"} label="Début" />
            <DateField form={form} fieldName={"endDate"} label="Fin" />
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
            {form.formState.isSubmitting && (
              <Loader2 className="animate-spin" />
            )}
            <p>Créer Saison</p>
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
