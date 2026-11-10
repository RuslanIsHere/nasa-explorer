# NASA Explorer

Application Next.js pour explorer les données publiques de la NASA : l'image astronomique du jour, la Terre vue par la caméra EPIC, les astéroïdes proches et les photos brutes des rovers martiens. Les images préférées sont gardées dans le navigateur.

## Démarrage

```bash
npm install
cp .env.example .env.local
npm run dev
```

Renseignez `NASA_API_KEY` dans `.env.local` avec une clé gratuite obtenue sur [api.nasa.gov](https://api.nasa.gov). Sans clé, l'application utilise `DEMO_KEY`, dont la limite de requêtes est très basse.

| Commande        | Rôle                        |
| --------------- | --------------------------- |
| `npm run dev`   | Serveur de développement    |
| `npm run build` | Build de production         |
| `npm start`     | Lance le build de production |
| `npm run lint`  | Vérification ESLint         |

## Structure

```
src/
├─ app/         Routes : pages, layout, erreurs
├─ features/    Une fonctionnalité par dossier : api.ts, types.ts, components/
├─ components/  Composants partagés : layout/ et ui/
└─ lib/         Utilitaires : dates, fetch, HTML, variables d'environnement
```

## Choix techniques

- **Server Components** : les données sont chargées côté serveur, la clé NASA ne part donc jamais au navigateur.
- **État dans l'URL** : `/space?date=2025-01-01` se partage, et le bouton retour du navigateur fonctionne.
- **`localStorage` pour les favoris** : pas de compte ni de base de données. Le hook `useFavorites` isole ce stockage.

## Sources de données

| Page         | Source                                                   | Remarque                                          |
| ------------ | -------------------------------------------------------- | ------------------------------------------------- |
| `/space`     | API JSON de `science.nasa.gov`                           | L'API `planetary/apod` ne renvoie plus que des images de remplacement |
| `/earth`     | `epic.gsfc.nasa.gov`                                     | Sans clé                                          |
| `/asteroids` | `api.nasa.gov/neo` (NeoWs)                               | Nécessite `NASA_API_KEY`                          |
| `/mars`      | Flux des galeries `mars.nasa.gov`                        | Non documenté : peut changer sans préavis         |
