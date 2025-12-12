import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { getUser } from "@/src/lib/auth/auth-server";
import { unauthorized } from "next/navigation";

export default async function AuthPage() {
  const user = await getUser();
  if (!user) {
    return unauthorized();
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>User profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Name</span>
            <span>{user.name}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Email</span>
            <span>{user.email}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
