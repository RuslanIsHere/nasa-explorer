import Link from "next/link";
import { Navigation } from "./Navigation";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4">
        <Link href="/" className="font-mono text-sm font-medium tracking-widest uppercase">
          NASA <span className="text-accent">Explorer</span>
        </Link>
        <Navigation />
      </div>
    </header>
  );
}
