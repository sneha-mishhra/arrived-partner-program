import type { PublicForm, PublicFormField } from "./types";

/**
 * Enabled fields in CMS display order, with any field missing from fieldOrder
 * appended rather than dropped. Shared by every rendering of the Arrived
 * registration form so the field list can never diverge between designs.
 */
export function orderedFields(form: PublicForm): PublicFormField[] {
  const properties = form.content.formSchema.properties;
  const seen = new Set<string>();
  const fields: PublicFormField[] = [];

  for (const key of form.content.fieldOrder) {
    const field = properties[key];

    if (field?.enabled) {
      fields.push(field);
      seen.add(key);
    }
  }

  for (const [key, field] of Object.entries(properties)) {
    if (!seen.has(key) && field.enabled) {
      fields.push(field);
    }
  }

  return fields;
}

export const AUTOCOMPLETE: Record<string, string> = {
  firstName: "given-name",
  lastName: "family-name",
  emailAddress: "email",
  company: "organization",
  phoneNumber: "tel",
  title: "organization-title",
};
