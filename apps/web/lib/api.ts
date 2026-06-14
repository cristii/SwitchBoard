import { getServerSession } from "next-auth";
import {
  activityListResponseSchema,
  projectsListResponseSchema,
  templateListResponseSchema,
  type ActivityListResponse,
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

async function apiFetch(path: string): Promise<unknown> {
  const session = await getServerSession(authOptions);

  if (!session?.apiToken) {
    throw new AuthRequiredError();
  }

  const response = await fetch(`${apiBaseUrl()}/api${path}`, {
    headers: {
      Authorization: `Bearer ${session.apiToken}`
    },
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

