import Link from "next/link";
import { buttonVariants } from "./ui/button";
import {
  ClipboardList,
  Home,
  Info,
  ListOrdered,
  LogOut,
  User,
} from "lucide-react";
import { cn } from "../lib/utils";
import { ReactNode } from "react";

export default function Sidebar() {
  return (
    <section className="bg-background border rounded-2xl w-fit flex flex-col justify-between px-4 py-6">
      <div className="flex flex-col gap-4">
        <SidebarButton root="/profile" icon={<User />} label="Mon profile" />
        <SidebarButton root="/matchs" icon={<Home />} label="Matchs du club" />
        <SidebarButton
          root="/ranking"
          icon={<ListOrdered />}
          label="Classement"
        />
        <SidebarButton
          root="/admin"
          icon={<ClipboardList />}
          label="Tableau Admin"
        />
      </div>
      <div className="flex flex-col gap-4">
        <SidebarButton root="/help" icon={<Info />} label="Aide et Support" />
        <Link
          href="/profil"
          className={cn(
            buttonVariants({ size: "lg", variant: "secondary" }),
            "hover:bg-secondary bg-background flex justify-start"
          )}
        >
          <LogOut /> Se deconecter
        </Link>
      </div>
    </section>
  );
}

interface SidebarButtonProps {
  root: string;
  icon: ReactNode;
  label: string;
}

export const SidebarButton = async ({
  root,
  icon,
  label,
}: SidebarButtonProps) => {
  return (
    <Link
      href={root}
      className={cn(
        buttonVariants({ size: "lg", variant: "secondary" }),
        "hover:bg-secondary bg-background flex justify-start"
      )}
    >
      {icon} {label}
    </Link>
  );
};
