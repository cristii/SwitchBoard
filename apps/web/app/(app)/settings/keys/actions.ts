"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { providerKeyParamSchema, providerKeyUpsertSchema } from "@switchboard/shared";
import { deleteProviderKey, saveProviderKey } from "../../../../lib/api";

function formValue(formData: FormData, name: string): string | undefined {
  const value = formData.get(name);
  return typeof value === "string" ? value : undefined;
}

export async function saveKeyAction(formData: FormData) {
  const { provider } = providerKeyParamSchema.parse({
    provider: formValue(formData, "provider")
  });
  const { key } = providerKeyUpsertSchema.parse({
    key: formValue(formData, "key") ?? ""
  });

  await saveProviderKey(provider, key);
  revalidatePath("/settings/keys");
  redirect(`/settings/keys?saved=${encodeURIComponent(provider)}`);
}

export async function deleteKeyAction(formData: FormData) {
  const { provider } = providerKeyParamSchema.parse({
    provider: formValue(formData, "provider")
  });

  await deleteProviderKey(provider);
  revalidatePath("/settings/keys");
  redirect("/settings/keys");
}
