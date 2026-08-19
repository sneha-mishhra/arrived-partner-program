"use client";

// Renders the registration form configured on the Arrived event
// (app.happily.events → event 3xjiyVte0pz → Registration form).
// Fields, labels, order, and required flags all come from the CMS: edit them
// in Arrived and this form updates on the next request. Submissions land in
// the event's attendee list, and Arrived sends the confirmation email.

import { useActionState } from "react";

import {
  type RegistrationState,
  submitRegistration,
} from "@/app/actions/register";
import { orderedFields } from "@/lib/happily/form-fields";
import type {
  HappilyEnv,
  PublicForm,
  PublicFormField,
} from "@/lib/happily/types";

type ArrivedRegistrationFormProps = {
  eventId: string;
  env: HappilyEnv;
  form: PublicForm;
  successTitle?: string | null;
  successBody?: string | null;
};

const initialState: RegistrationState = { ok: false };

// Radius follows the page system: pill for controls, 2xl for panels, 3xl for
// section cards. No fourth value.
const inputClass =
  "w-full rounded-full border border-brand-navy/15 bg-white px-5 py-3 text-sm text-brand-navy placeholder:text-brand-muted/60 outline-none transition duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20";

const labelClass = "block text-sm font-semibold text-brand-navy";

// Fields that map to top-level registration columns rather than custom data.
const HALF_WIDTH = new Set(["firstName", "lastName", "title", "phoneNumber"]);

function Field({ field }: { field: PublicFormField }) {
  const label = field.required ? `${field.title} *` : field.title;

  if (field.inputType === "checkbox") {
    const options = field.items?.enum ?? [];

    // Single-option checkbox reads as a consent line, not a list.
    if (options.length <= 1) {
      return (
        <div className="sm:col-span-2 flex items-start gap-3">
          <input
            id={field.id}
            name={field.id}
            type="checkbox"
            value={options[0] ?? "yes"}
            required={field.required}
            className="mt-1 size-4 shrink-0 accent-[var(--brand-purple)]"
          />
          <label
            htmlFor={field.id}
            className="text-sm leading-relaxed text-brand-muted"
          >
            {options[0] ?? label}
          </label>
        </div>
      );
    }

    return (
      <fieldset className="sm:col-span-2">
        <legend className={labelClass}>{label}</legend>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 text-sm text-brand-muted"
            >
              <input
                name={field.id}
                type="checkbox"
                value={option}
                className="size-4 accent-[var(--brand-purple)]"
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
      <label htmlFor={field.id} className={labelClass}>
        {label}
      </label>
      <input
        id={field.id}
        name={field.id}
        type={field.inputType === "tel" ? "tel" : field.inputType}
        required={field.required}
        maxLength={field.maxLength}
        autoComplete={
          field.id === "firstName"
            ? "given-name"
            : field.id === "lastName"
              ? "family-name"
              : field.id === "emailAddress"
                ? "email"
                : field.id === "company"
                  ? "organization"
                  : field.id === "phoneNumber"
                    ? "tel"
                    : "off"
        }
        className={`${inputClass} mt-2`}
      />
    </div>
  );
}

export default function ArrivedRegistrationForm({
  eventId,
  env,
  form,
  successTitle,
  successBody,
}: ArrivedRegistrationFormProps) {
  const action = submitRegistration.bind(null, {
    eventId,
    env,
    formId: form.id,
    formType: 2,
  });
  const [state, formAction, isPending] = useActionState(action, initialState);

  if (!form.is_active) {
    return (
      <p className="text-sm text-brand-muted">
        Applications are closed right now. Check back soon.
      </p>
    );
  }

  if (form.at_capacity) {
    return (
      <p className="text-sm text-brand-muted">
        This round is full. We&apos;ll open the next one shortly.
      </p>
    );
  }

  if (state.ok) {
    return (
      <div className="py-6 text-center">
        <h3 className="text-2xl font-black tracking-tight text-brand-navy">
          {successTitle || "Thank you!"}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-brand-muted">
          {successBody ||
            "Your application is in. Watch your inbox for the welcome email with your modules and next steps."}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-5 sm:grid-cols-2">
      {orderedFields(form).map((field) => (
        <Field key={field.id} field={field} />
      ))}

      {state.message && !state.ok ? (
        <p className="sm:col-span-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        aria-busy={isPending}
        className="sm:col-span-2 mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-navy px-6 py-3.5 text-sm font-semibold text-white transition duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-brand-navy-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? (
          <>
            <span
              aria-hidden="true"
              className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
            />
            Submitting
          </>
        ) : (
          form.form_button_text || "Apply to become a partner"
        )}
      </button>
    </form>
  );
}
