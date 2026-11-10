import { EmptyState } from "@/components/ui/EmptyState";
import { getAsteroids } from "../api";
import { AsteroidCard } from "./AsteroidCard";
import { AsteroidStats } from "./AsteroidStats";

export async function AsteroidResult({ date }: { date: string }) {
  const asteroids = await getAsteroids(date);

  if (asteroids.length === 0) {
    return (
      <EmptyState
        title="Aucun astéroïde pour cette date"
        description="Aucun passage rapproché n'a été recensé ce jour-là."
      />
    );
  }

  return (
    <>
      <AsteroidStats asteroids={asteroids} />
      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {asteroids.map((asteroid) => (
          <li key={asteroid.id}>
            <AsteroidCard asteroid={asteroid} />
          </li>
        ))}
      </ul>
    </>
  );
}
