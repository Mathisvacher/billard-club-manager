"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import clsx from "clsx";

interface SidebarButtonProps {
  root: string;
  icon: ReactNode;
  label: string;
}

export const SidebarButton = ({ root, icon, label }: SidebarButtonProps) => {
  const pathname = usePathname();
  const isActive = pathname === root;

  return (
    <Link
      href={root}
      className={clsx(
        "flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg transition-all",
        "hover:bg-white hover:shadow-sm",
        isActive ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"
      )}
    >
      <span
        className={clsx(
          "transition-colors",
          isActive ? "text-[#B44034]" : "text-muted-foreground"
        )}
      >
        {icon}
      </span>

      <span className="font-semibold">{label}</span>
    </Link>
  );
};
