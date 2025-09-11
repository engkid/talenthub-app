// src/lib/api.ts
export interface Item {
  id: string;
  name: string;
}

function getApiBase() {
  return (
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.API_BASE_URL ||
    ""
  );
}

// Resolve Supabase/PostgREST API key (anon or service)
function getApiKey() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_API_KEY ||
    process.env.API_KEY ||
    ""
  );
}

export async function get<T>(path: string, init?: RequestInit): Promise<T> {
  const API_BASE = getApiBase();
  const API_KEY = getApiKey();
  const url = `${API_BASE}${path}`;

  console.log("API KEY IS:", API_KEY);

  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(API_KEY
        ? {
            apikey: API_KEY,
            Authorization: `Bearer ${API_KEY}`,
          }
        : {}),
      ...init?.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${path}: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

// For PostgREST tables, include `?select=*` to fetch columns
export const fetchItems = () => get<Item[]>("/items?select=*");
