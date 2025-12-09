export type Player = {
  _id: string;
  name: string;
  position?: string | null;
  team?: string | null;
  number?: number | null;
  createdAt?: string;
  updatedAt?: string;
};

export type PlayerInput = {
  name: string;
  position?: string | null;
  team?: string | null;
  number?: number | null;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE;

const jsonHeaders = {
  "Content-Type": "application/json",
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: { ...jsonHeaders, ...(init?.headers ?? {}) },
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message =
      (body && typeof body.error === "string" && body.error) ||
      res.statusText ||
      "Request failed";
    throw new Error(message);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export const apiBase = API_BASE;

export const listPlayers = () => request<Player[]>("/v1/players");
export const createPlayer = (body: PlayerInput) =>
  request<Player>("/v1/players", { method: "POST", body: JSON.stringify(body) });
export const updatePlayer = (id: string, body: PlayerInput) =>
  request<Player>(`/v1/players/${id}`, { method: "PUT", body: JSON.stringify(body) });
export const deletePlayer = (id: string) =>
  request<void>(`/v1/players/${id}`, { method: "DELETE" });
