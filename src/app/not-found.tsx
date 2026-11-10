import Link from "next/link";
import { EmptyState } from "@/components/ui/EmptyState";

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <EmptyState
        title="Page introuvable"
        description="Cette page semble s'être perdue dans l'espace."
      >
        <Link href="/" className="text-accent underline underline-offset-4">
          Retour à l&apos;accueil
        </Link>
      </EmptyState>
    </div>
  );
}
