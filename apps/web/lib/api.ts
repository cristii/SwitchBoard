import { getServerSession } from "next-auth";
import {
  activityListResponseSchema,
  providerKeyDeleteResponseSchema,
  providerKeySaveResponseSchema,
  providerKeyUpsertSchema,
  providerKeysListResponseSchema,
  projectsListResponseSchema,
  templateListResponseSchema,
  type ActivityListResponse,
  type ProviderKeyDeleteResponse,
  type ProviderKeySaveResponse,
  type ProviderKeysListResponse,
  type ProviderKind,
  type ProjectsListResponse,
  type TemplateListResponse
} from "@switchboard/shared";
import { authOptions } from "./auth/options";

export class AuthRequiredError extends Error {
  constructor() {
    super("A signed-in session with an API token is required.");
  }
}

function apiBaseUrl() {
  return process.env.API_URL ?? "http://localhost:4000";
}

type ApiFetchOptions = {
  method?: "GET" | "PUT" | "DELETE";
  body?: unknown;
};

async function apiFetch(path: string, options: ApiFetchOptions = {}): Promise<unknown> {
  const session = await getServerSession(authOptions);

  if (!session?.apiToken) {
    throw new AuthRequiredError();
  }

  const headers = new Headers({
    Authorization: `Bearer ${session.apiToken}`
  });

  if (options.body !== undefined) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${apiBaseUrl()}/api${path}`, {
    method: options.method ?? "GET",
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

export async function getProjects(): Promise<ProjectsListResponse> {
  return projectsListResponseSchema.parse(await apiFetch("/projects"));
}

export async function getTemplates(): Promise<TemplateListResponse> {
  return templateListResponseSchema.parse(await apiFetch("/templates"));
}

export async function getActivity(): Promise<ActivityListResponse> {
  return activityListResponseSchema.parse(await apiFetch("/activity"));
}

export async function getProviderKeys(): Promise<ProviderKeysListResponse> {
  return providerKeysListResponseSchema.parse(await apiFetch("/keys"));
}

export async function saveProviderKey(
  provider: ProviderKind,
  key: string
): Promise<ProviderKeySaveResponse> {
  return providerKeySaveResponseSchema.parse(
    await apiFetch(`/keys/${encodeURIComponent(provider)}`, {
      method: "PUT",
      body: providerKeyUpsertSchema.parse({ key })
    })
  );
}

export async function deleteProviderKey(
  provider: ProviderKind
): Promise<ProviderKeyDeleteResponse> {
  return providerKeyDeleteResponseSchema.parse(
    await apiFetch(`/keys/${encodeURIComponent(provider)}`, {
      method: "DELETE"
    })
  );
}
