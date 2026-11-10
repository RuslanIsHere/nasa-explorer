import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/dates";
import { getLatestApod } from "@/features/apod/api";

export const revalidate = 3600;

const SECTIONS = [
  {
    href: "/space",
    image: "/img/APOD.jpg",
    title: "L'espace",
    description: "Une image astronomique par jour depuis 1995.",
  },
  {
    href: "/earth",
    image: "/img/EPIC.jpeg",
    title: "La Terre",
    description: "Notre planète vue à 1,5 million de kilomètres.",
  },
  {
    href: "/asteroids",
    image: "/img/ASTEROIDS.jpg",
    title: "Astéroïdes",
    description: "Les objets qui frôlent la Terre, jour après jour.",
  },
  {
    href: "/mars",
    image: "/img/MARS.jpg",
    title: "Mars",
    description: "Les photos brutes de Curiosity et Perseverance.",
  },
];

export default async function HomePage() {
  const apod = await getLatestApod().catch(() => null);

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-line">
        <Image
          src={apod?.previewUrl ?? "/img/APOD.jpg"}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/50 to-transparent" />

        <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col justify-center px-4 py-20">
          <p className="eyebrow">
            {apod ? `Image du jour · ${formatDate(apod.date)}` : "Image du jour"}
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
            Explorez l&apos;univers avec les données de la NASA
          </h1>
          {apod && <p className="mt-4 max-w-xl text-lg text-muted">{apod.title}</p>}
          <Link
            href="/space"
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-md bg-accent px-5 py-3 font-semibold text-ink transition-colors hover:bg-accent-strong"
          >
            Voir l&apos;image du jour
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="sr-only">Sections</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SECTIONS.map((section) => (
            <li key={section.href}>
              <Link
                href={section.href}
                className="group block h-full overflow-hidden rounded-lg border border-line bg-surface transition-colors hover:border-accent"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={section.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{section.title}</h3>
                  <p className="mt-1 text-sm text-muted">{section.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
