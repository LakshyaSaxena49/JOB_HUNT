const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

export const getApiUrl = (path) =>
  `${API_BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

export async function apiRequest(path, options = {}) {
  const { headers, ...requestOptions } = options;

  const response = await fetch(getApiUrl(path), {
    ...requestOptions,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}
