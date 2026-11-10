import { ChevronLeft, ChevronRight } from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import { shiftDate } from "@/lib/dates";
import { Button } from "./Button";

type DateFormProps = {
  action: string;
  date: string;
  min: string;
  max: string;
};

type DayLinkProps = {
  href: string;
  label: string;
  isDisabled: boolean;
  children: React.ReactNode;
};

function DayLink({ href, label, isDisabled, children }: DayLinkProps) {
  const className = "rounded-md border border-line p-2.5";

  if (isDisabled) {
    return <span className={`${className} text-line`}>{children}</span>;
  }

  return (
    <Link href={href} aria-label={label} className={`${className} hover:border-accent`}>
      {children}
    </Link>
  );
}

export function DateForm({ action, date, min, max }: DateFormProps) {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-2">
      <DayLink
        href={`${action}?date=${shiftDate(date, -1)}`}
        label="Jour précédent"
        isDisabled={date <= min}
      >
        <ChevronLeft aria-hidden className="size-5" />
      </DayLink>

      <Form key={date} action={action} className="flex items-center gap-2">
        <label htmlFor="date" className="sr-only">
          Date
        </label>
        <input
          id="date"
          name="date"
          type="date"
          defaultValue={date}
          min={min}
          max={max}
          required
          className="rounded-md border border-line bg-surface px-3 py-2"
        />
        <Button type="submit">Afficher</Button>
      </Form>

      <DayLink
        href={`${action}?date=${shiftDate(date, 1)}`}
        label="Jour suivant"
        isDisabled={date >= max}
      >
        <ChevronRight aria-hidden className="size-5" />
      </DayLink>
    </div>
  );
}
