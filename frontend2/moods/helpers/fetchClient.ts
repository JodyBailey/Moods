import { cookies } from "next/headers";

type method = "GET" | "POST" | "PUT" | "DELETE";

const fetchClient = async (url: string, method: method, data: Record<string, unknown> | null = null, tag?: string) => {
  const token = (await cookies()).get("access_token")?.value;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const fetchOptions: RequestInit = {
    method,
    body: data ? JSON.stringify(data) : null,
    headers,
  };

  if (tag) {
    fetchOptions.next = { tags: [tag] };
  } else {
    fetchOptions.cache = "no-store";
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export default fetchClient;
