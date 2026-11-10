"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { href: "/space", label: "L'espace" },
  { href: "/earth", label: "La Terre" },
  { href: "/asteroids", label: "Astéroïdes" },
  { href: "/mars", label: "Mars" },
  { href: "/favorites", label: "Favoris" },
];

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav aria-label="Navigation principale">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="main-menu"
        aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-md p-2 md:hidden"
      >
        {isOpen ? <X aria-hidden /> : <Menu aria-hidden />}
      </button>

      <ul
        id="main-menu"
        className={`${isOpen ? "flex" : "hidden"} absolute inset-x-0 top-16 flex-col border-b border-line bg-ink p-4 md:static md:flex md:flex-row md:gap-6 md:border-0 md:bg-transparent md:p-0`}
      >
        {LINKS.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setIsOpen(false)}
                className={`block py-2 text-sm transition-colors hover:text-star md:py-0 ${isActive ? "font-semibold text-accent" : "text-muted"}`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
