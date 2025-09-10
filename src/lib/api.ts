// src/lib/api.ts
export interface Item {
  id: string;
  name: string;
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  process.env.API_BASE_URL ?? "";

// Optional Supabase/PostgREST API key (anon or service)
const API_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.SUPABASE_ANON_KEY ??
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.NEXT_PUBLIC_API_KEY ??
  process.env.API_KEY;

export async function get<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
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
    throw new Error(`Failed to fetch ${path}: ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

// For PostgREST tables, include `?select=*` to fetch columns
export const fetchItems = () => get<Item[]>("/items?select=*");
