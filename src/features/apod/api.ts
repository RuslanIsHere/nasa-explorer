import { getToday, shiftDate } from "@/lib/dates";
import { fetchJson } from "@/lib/fetchJson";
import { decodeEntities, htmlToText } from "@/lib/html";
import type { Apod, ApodMedia } from "./types";

// api.nasa.gov/planetary/apod now answers with a placeholder for every date,
// so articles are read from the science.nasa.gov JSON API, where APOD has moved.
const ARTICLES_URL = "https://science.nasa.gov/wp-json/wp/v2/image-article";
const ARTICLE_FIELDS = "slug,link,title,content,featured_image_url";
const ONE_DAY = 86400;

const MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

export const FIRST_APOD_DATE = "1995-06-16";

type Article = {
  slug: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string };
  featured_image_url: string | null;
};

export async function getApod(date: string): Promise<Apod | null> {
  const article = (await findRecentArticle(date)) ?? (await findArchivedArticle(date));
  return article ? toApod(article, date) : null;
}

export async function getLatestApod(): Promise<Apod | null> {
  const today = getToday();
  return (await getApod(today)) ?? (await getApod(shiftDate(today, -1)));
}

function getSlugPrefix(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  return `apod-${year}-${MONTHS[month - 1]}-${day}-`;
}

async function findRecentArticle(date: string): Promise<Article | undefined> {
  const params = new URLSearchParams({
    search: "APOD",
    after: `${shiftDate(date, -1)}T23:59:59`,
    before: `${shiftDate(date, 1)}T00:00:00`,
    per_page: "5",
    _fields: ARTICLE_FIELDS,
  });
  const articles = await fetchJson<Article[]>(`${ARTICLES_URL}?${params}`, ONE_DAY);

  return articles.find((article) => article.slug.startsWith(getSlugPrefix(date)));
}

// Older articles carry their migration date, but the historic apod.nasa.gov
// addresses still redirect to them, which gives us their slug.
async function findArchivedArticle(date: string): Promise<Article | undefined> {
  const code = date.slice(2).replaceAll("-", "");
  const response = await fetch(`https://apod.nasa.gov/apod/ap${code}.html`, {
    method: "HEAD",
    headers: { "User-Agent": "nasa-explorer" },
  });
  const slug = response.url.match(/image-article\/([^/]+)/)?.[1];
  if (!slug) return undefined;

  const params = new URLSearchParams({ slug, _fields: ARTICLE_FIELDS });
  const articles = await fetchJson<Article[]>(`${ARTICLES_URL}?${params}`, ONE_DAY);
  return articles[0];
}

function toApod(article: Article, date: string): Apod {
  const html = article.content.rendered;
  const text = htmlToText(html);
  const image = findImage(html, article.featured_image_url);

  return {
    date,
    title: htmlToText(article.title.rendered).replace(/^APOD:[^–]*–\s*/, ""),
    explanation: findExplanation(text),
    credit: findCredit(text),
    media: findMotion(html) ?? (image ? { kind: "image", url: image } : null),
    previewUrl: image,
    articleUrl: article.link,
  };
}

function findExplanation(text: string): string {
  const start = text.indexOf("Explanation:");
  if (start === -1) return "";

  const body = text.slice(start + "Explanation:".length);
  const end = body.search(/Tomorrow.s picture|Date:? [A-Z][a-z]+ \d{1,2},/);
  return (end === -1 ? body : body.slice(0, end)).trim();
}

function findCredit(text: string): string | null {
  const credit = text.match(/Date:? [A-Z][a-z]+ \d{1,2}, \d{4} (Credit.+?) Authors/)?.[1];
  return credit ? credit.replace(/^.*?Credit[^:]*:\s*/, "") : null;
}

function findMotion(html: string): ApodMedia | null {
  const video = html.match(/<(?:video|source)\b[^>]*?src=["']([^"']+\.mp4[^"']*)/i)?.[1];
  if (video) return { kind: "video", url: decodeEntities(video) };

  const embed = html.match(/<iframe\b[^>]*?src=["']([^"']*(?:youtube|vimeo)[^"']*)/i)?.[1];
  if (embed) return { kind: "embed", url: decodeEntities(embed) };

  return null;
}

function findImage(html: string, featuredUrl: string | null): string | null {
  const contentImage = [...html.matchAll(/<img\b[^>]*?src=["']([^"']+)/gi)]
    .map((match) => decodeEntities(match[1]))
    .find((url) => url.includes("/apod/apod/"));
  if (contentImage) return contentImage;

  const isPlaceholder = featuredUrl?.includes("news-thumbnail");
  return featuredUrl && !isPlaceholder ? featuredUrl : null;
}
