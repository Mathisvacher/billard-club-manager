"use client";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { addReviewSafeAction } from "./review.action";
import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import z from "zod";
import { useForm } from "react-hook-form";
import { Form } from "@/src/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/src/components/ui/form";
import { ReviewFormSchema } from "./review.schema";

export default function ReviewForm() {
  // remplacer par API route ?
  const { executeAsync } = useAction(addReviewSafeAction, {
    onSuccess: () => {
      toast.success("Review created !");
    },
  });

  const form = useForm<z.infer<typeof ReviewFormSchema>>({
    resolver: zodResolver(ReviewFormSchema),
    defaultValues: {
      name: "",
      review: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ReviewFormSchema>) {
    await executeAsync(values);
    router.refresh();
  }

  const router = useRouter();

  const updateReview = async (obj: { name: string; review: string }) => {
    const result = await fetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify(obj),
    }).then((res) => res.json());
    router.refresh();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>This public name for the review</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="review"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Be honest</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </Form>
  );
}

const SubmitButton = (props: ComponentProps<typeof Button>) => {
  const { pending } = useFormStatus();
  return <Button {...props} disabled={props.disabled || pending} />;
};
