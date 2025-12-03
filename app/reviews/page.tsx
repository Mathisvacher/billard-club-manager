// app/reviews/page.tsx
import { prisma } from "@/src/lib/prisma"; // ← bien importer ton client Prisma

export default async function ReviewPage() {
  const reviews = await prisma.review.findMany();

  return (
    <main className="flex flex-col gap-4">
      <h1>Hello sworld</h1>

      <div>
        {reviews.length > 0 && (
          <ul className="list-disc list-inside">
            {reviews.map((r) => (
              <li key={r.id}>{r.review}</li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
