import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

export default function page() {
  return (
    <div className="flex flex-col p-4 gap-4 max-w-md mx-auto min-h-fill">
      <Card>
        <CardHeader>
          <CardTitle>Plan de formations</CardTitle>
        </CardHeader>
        <CardContent>ceci est une formation</CardContent>
      </Card>
    </div>
  );
}
