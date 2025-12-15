import { LogOut, User, User2 } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button, buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";
import { getUser } from "../lib/auth/auth-server";
import { auth } from "../lib/auth/auth";

export const Header = () => {
  return (
    <header className="flex items-center border  bg-background rounded-2xl px-6 py-3">
      <Link href="/" className="text-lg font-bold">
        Billard Challenge
      </Link>
      <div className="flex-1"></div>
      <Suspense fallback={<Skeleton className="h-10 w-20" />}>
        <AuthButton />
      </Suspense>
    </header>
  );
};

export const AuthButton = async () => {
  const user = await getUser();

  if (!user) {
    return (
      <Link
        href="/auth/signin"
        className={buttonVariants({ size: "sm", variant: "outline" })}
      >
        Sign in
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size={"lg"} className="text-lg">
          <User2 strokeWidth={3} />
          <p>{user.name}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href="/auth" className="flex items-center gap-2">
            <User2 className="size-3" />
            Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <form>
            <button
              className="flex items-center gap-2 w-full"
              formAction={async () => {
                "use server";

                await auth.api.signOut({
                  headers: await headers(),
                });

                redirect("/signin");
              }}
            >
              <LogOut className="size-4 " />
              Logout
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
