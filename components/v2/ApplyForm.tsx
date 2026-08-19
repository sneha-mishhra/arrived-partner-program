"use client";

// Application form, token-styled for the rebuilt page. Fields, order, and
// required flags come from the Arrived event's registration form; submissions
// go to the same server action and land in the event's attendee list.
// Pending state: button disables, label swaps, spinner shows, aria-busy set.

import { useActionState } from "react";

import {
  type RegistrationState,
  submitRegistration,
} from "@/app/actions/register";
import { AUTOCOMPLETE, orderedFields } from "@/lib/happily/form-fields";
import type {
  HappilyEnv,
  PublicForm,
  PublicFormField,
} from "@/lib/happily/types";

const initialState: RegistrationState = { ok: false };

const HALF_WIDTH = new Set(["firstName", "lastName", "title", "phoneNumber"]);

const fieldClass =
  "w-full rounded-[var(--p-radius-pill)] border border-(--p-line-strong) bg-(--p-bg) px-[var(--p-space-2)] py-[0.7rem] text-[length:var(--p-text-sm)] text-(--p-ink) outline-none transition-colors duration-[var(--p-duration-fast)] ease-(--p-ease) focus:border-(--p-accent)";

function Field({ field }: { field: PublicFormField }) {
  const label = field.required ? `${field.title} *` : field.title;

  if (field.inputType === "checkbox") {
    const options = field.items?.enum ?? [];

    if (options.length <= 1) {
      return (
        <div className="flex items-start gap-[var(--p-space-1)] sm:col-span-2">
          <input
            id={field.id}
            name={field.id}
            type="checkbox"
            value={options[0] ?? "yes"}
            required={field.required}
            className="mt-[3px] size-[14px] shrink-0 accent-[var(--p-accent)]"
          />
          <label
            htmlFor={field.id}
            className="text-[length:var(--p-text-xs)] leading-[var(--p-leading-body)] text-(--p-muted)"
          >
            {options[0] ?? label}
          </label>
        </div>
      );
    }

    return (
      <fieldset className="sm:col-span-2">
        <legend className="p-label">{label}</legend>
        <div className="mt-[var(--p-space-1)] flex flex-wrap gap-x-[var(--p-space-3)] gap-y-[var(--p-space-1)]">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-[var(--p-space-1)] text-[length:var(--p-text-sm)] text-(--p-muted)"
            >
              <input
                name={field.id}
                type="checkbox"
                value={option}
                className="size-[14px] accent-[var(--p-accent)]"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  return (
    <div className={HALF_WIDTH.has(field.id) ? "" : "sm:col-span-2"}>
      <label htmlFor={field.id} className="p-label">
        {label}
      </label>
      <input
        id={field.id}
        name={field.id}
        type={field.inputType}
        required={field.required}
        maxLength={field.maxLength}
        autoComplete={AUTOCOMPLETE[field.id] ?? "off"}
        className={`${fieldClass} mt-[var(--p-space-1)]`}
      />
    </div>
  );
}

export default function ApplyForm({
  eventId,
  env,
  form,
  successTitle,
  successBody,
}: {
  eventId: string;
  env: HappilyEnv;
  form: PublicForm;
  successTitle?: string | null;
  successBody?: string | null;
}) {
  const action = submitRegistration.bind(null, {
    eventId,
    env,
    formId: form.id,
    formType: 2,
  });
  const [state, formAction, isPending] = useActionState(action, initialState);

  if (!form.is_active) {
    return (
      <p className="text-[length:var(--p-text-sm)] text-(--p-muted)">
        Applications are closed right now. Check back soon.
      </p>
    );
  }

  if (form.at_capacity) {
    return (
      <p className="text-[length:var(--p-text-sm)] text-(--p-muted)">
        This round is full. The next one opens shortly.
      </p>
    );
  }

  if (state.ok) {
    return (
      <div className="py-[var(--p-space-3)] text-center">
        <h3 className="text-[length:var(--p-text-xl)] font-[var(--p-weight-medium)] text-(--p-ink)">
          {successTitle || "Thank you"}
        </h3>
        <p className="mt-[var(--p-space-1)] text-[length:var(--p-text-sm)] text-(--p-muted)">
          {successBody ||
            "Your application is in. Watch your inbox for the welcome email with your modules and next steps."}
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="grid gap-[var(--p-space-2)] sm:grid-cols-2"
    >
      {orderedFields(form).map((field) => (
        <Field key={field.id} field={field} />
      ))}

      {state.message && !state.ok ? (
        <p
          role="alert"
          className="rounded-[var(--p-radius-lg)] bg-(--p-surface) px-[var(--p-space-2)] py-[var(--p-space-1)] text-[length:var(--p-text-sm)] text-(--p-ink) sm:col-span-2"
        >
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        aria-busy={isPending}
        className="p-btn p-btn-primary w-full sm:col-span-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? (
          <>
            <span
              aria-hidden="true"
              className="size-[14px] animate-spin rounded-full border-2 border-(--p-bg)/30 border-t-(--p-bg)"
            />
            Submitting
          </>
        ) : (
          form.form_button_text || "Send application"
        )}
      </button>
    </form>
  );
}
