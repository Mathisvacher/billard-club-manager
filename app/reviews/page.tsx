// app/reviews/page.tsx
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { prisma } from "@/src/lib/prisma";
import SelectStar from "./(components)/select-start";
import { revalidatePath } from "next/cache";
import EditTitle from "./(components)/edit-title";
import ReviewForm from "./review-form";
import { updateReviewAction } from "./review.action";

export default async function ReviewPage() {
  const reviews = await prisma.review.findMany();

  const setNewStar = async (reviewId: string, star: number) => {
    "use server";
    await updateReviewAction({ reviewId, star });
    revalidatePath("/courses");
  };

  const setReviewName = async (reviewId: string, name: string) => {
    "use server";
    await updateReviewAction({ reviewId, name });
    revalidatePath("/courses");
  };

  return (
    <main className="flex flex-col gap-4">
      <h1>Hello sworld</h1>

      {reviews.map((review) => (
        <Card key={review.id}>
          <CardHeader className="flex items-center gap-4">
            <EditTitle
              className="text-lg font-bold"
              setTitle={setReviewName.bind(null, review.id)}
            >
              {review.name}
            </EditTitle>
            <SelectStar
              star={review.start}
              setNewStar={setNewStar.bind(null, review.id)}
            />
          </CardHeader>
          <CardContent>
            <p>{review.review}</p>
          </CardContent>
        </Card>
      ))}
      <ReviewForm />
    </main>
  );
}
