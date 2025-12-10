import { ModeToggle } from "@/src/components/theme-toggle";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import EditTitle from "./reviews/(components)/edit-title";
import SelectStar from "./reviews/(components)/select-start";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Button } from "@/src/components/ui/button";
import { revalidatePath } from "next/cache";
import { X } from "lucide-react";
import ReviewForm from "./review-form";

export default async function Home() {
  const reviews = await prisma.review.findMany();

  const changeStar = async (reviewId: string, star: number) => {
    "use server";

    await new Promise((r) => setTimeout(r, 1000));
    await prisma.review.update({
      where: {
        id: reviewId,
      },
      data: {
        start: star,
      },
    });
    revalidatePath("/");
  };

  const changeName = async (reviewId: string, name: string) => {
    "use server";

    await new Promise((r) => setTimeout(r, 1000));
    await prisma.review.update({
      where: {
        id: reviewId,
      },
      data: {
        name,
      },
    });
    revalidatePath("/");
  };

  return (
    <div className="flex flex-col gap-4 min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>Lear nextjs</h1>

      <Link href={"/formations"}> Plan de formation</Link>
      <ModeToggle />
      <div className="flex flex-col gap-4 w-1/2">
        {reviews.map((review) => (
          <Card key={review.id} className="relative">
            <div className="absolute right-4 top-4">
              <form>
                <Button
                  size="sm"
                  variant={"outline"}
                  className="cursor-pointer"
                  formAction={async () => {
                    "use server";
                    await prisma.review.delete({
                      where: {
                        id: review.id,
                      },
                    });
                    revalidatePath("/");
                  }}
                >
                  <X size={16} />
                </Button>
              </form>
            </div>
            <CardHeader className="flex items-center gap-4">
              <EditTitle
                className="text-lg font-bold"
                onChangeName={changeName.bind(null, review.id)}
              >
                {review.name}
              </EditTitle>
              <SelectStar
                star={review.start}
                onStarChange={changeStar.bind(null, review.id)}
              />
            </CardHeader>
            <CardContent>
              <p>{review.review}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="px-4">
        <ReviewForm />
      </Card>
    </div>
  );
}
