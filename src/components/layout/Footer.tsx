export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-4 py-6 text-sm text-muted">
        <p>NASA Explorer · projet de formation, non affilié à la NASA</p>
        <p>
          Données :{" "}
          <a href="https://api.nasa.gov" className="underline underline-offset-4 hover:text-star">
            api.nasa.gov
          </a>
        </p>
      </div>
    </footer>
  );
}
