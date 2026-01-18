import Link from "next/link";
import { buttonVariants } from "./ui/button";
import {
  ChartColumnBig,
  CloudSun,
  HelpCircle,
  Home,
  Info,
  LogOut,
  Sword,
  Swords,
  User,
  Users,
} from "lucide-react";
import { ROUTES } from "../lib/utils";
import Image from "next/image";
import { SidebarButton } from "./sidebar-btn";

export default function Sidebar() {
  return (
    <section className="w-fit flex flex-col justify-between ">
      <div className="flex flex-col gap-4 ">
        {/* LOGO */}
        <div className="flex w-full justify-center items-center flex-col py-6">
          <Image src="/logo.svg" alt="Logo" width={40} height={40} />
          <h1 className="font-semibold text-lg">Challenge Interne</h1>
        </div>

        {/* User section */}
        <div className="flex flex-col gap-1.5">
          <SidebarButton
            root={ROUTES.matches}
            icon={<Sword />}
            label="Mes matchs"
          />
          <SidebarButton
            root={ROUTES.clubMatches}
            icon={<Swords />}
            label="Matchs du club"
          />
          <SidebarButton
            root={ROUTES.ranking}
            icon={<ChartColumnBig />}
            label="Classement"
          />
          <SidebarButton
            root={ROUTES.profile}
            icon={<User />}
            label="Mon profile"
          />
          <SidebarButton
            root={ROUTES.help}
            icon={<HelpCircle />}
            label="Aide / Support"
          />
        </div>

        {/* Admin section */}
        <div className="flex flex-col gap-1.5">
          <span className="font-bold text-muted-foreground">Admin</span>

          <SidebarButton
            root={"toto"}
            icon={<Users />}
            label="Gestion joueurs"
          />
          <SidebarButton root={"toto"} icon={<Home />} label="Infos club" />
          <SidebarButton root={"toto"} icon={<CloudSun />} label="Saison" />
        </div>
      </div>
      <div>
        <SidebarButton
          root={ROUTES.help}
          icon={<HelpCircle />}
          label="Deconnection"
        />
      </div>
    </section>
  );
}
