"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderActiveLinkProps {
  href: string;
  label: string;
}

export default function HeaderActiveLink({
  href,
  label,
}: HeaderActiveLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md hover:bg-secondary ${
        isActive ? "text-foreground" : "text-foreground-grey"
      }`}
    >
      {label}
    </Link>
  );
}
