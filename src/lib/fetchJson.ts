const ONE_HOUR = 3600;

export async function fetchJson<T>(url: string, revalidate = ONE_HOUR): Promise<T> {
  const response = await fetch(url, {
    headers: { "User-Agent": "nasa-explorer" },
    next: { revalidate },
  });

  if (!response.ok) {
    throw new Error(`NASA request failed with status ${response.status}`);
  }

  return response.json();
}
