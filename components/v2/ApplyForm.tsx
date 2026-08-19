"use client";

// Application form, token-styled for the rebuilt page. Fields, order, and
// required flags come from the Arrived event's registration form; submissions
// go to the same server action and land in the event's attendee list.
// Pending state: button disables, label swaps, spinner shows, aria-busy set.

import { useActionState, useEffect, useState } from "react";

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

import ResourceCards, { type Resource } from "./ResourceCards";

const initialState: RegistrationState = { ok: false };

const HALF_WIDTH = new Set(["firstName", "lastName", "title", "phoneNumber"]);

const fieldClass =
  "w-full rounded-[var(--p-radius-pill)] border border-(--p-line-strong) bg-(--p-bg) px-[var(--p-space-2)] py-[0.7rem] text-[length:var(--p-text-sm)] text-(--p-ink) outline-none transition-colors duration-[var(--p-duration-fast)] ease-(--p-ease) focus:border-(--p-accent)";

const RESOURCES: Resource[] = [
  {
    label: "About the Arrived platform",
    href: "https://docs.google.com/document/d/1baqWyG_txn1vbBS8xuTxg90xu-OxULNDEeeaJg13DBY/edit?usp=sharing",
    image: "/platform-module.png",
  },
  {
    label: "Assignment brief",
    href: "https://8860600.fs1.hubspotusercontent-na2.net/hubfs/8860600/Arrived%20Partner%20Assignment.pdf",
    image: "/partner-assignment.png",
  },
];

const SHARE_TEXT = "Arrived is looking for design partners — worth a look.";

function shareLinks(url: string) {
  return [
    {
      name: "X",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(url)}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-6.6L4.5 22H1.4l8.1-9.3L1 2h7l4.9 6z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <line x1="7.5" y1="10.5" x2="7.5" y2="16.5" />
          <circle cx="7.5" cy="7.2" r="0.2" fill="currentColor" />
          <path d="M11 16.5v-3.7c0-1.5 1-2.3 2.2-2.3 1.2 0 1.8.8 1.8 2.3v3.7" />
          <line x1="11" y1="10.5" x2="11" y2="16.5" />
        </svg>
      ),
    },
    {
      name: "Email",
      href: `mailto:?subject=${encodeURIComponent("Arrived design partner program")}&body=${encodeURIComponent(`${SHARE_TEXT} ${url}`)}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      ),
    },
  ];
}

function SuccessMessage({
  title,
  body,
}: {
  title?: string | null;
  body?: string | null;
}) {
  // Starts empty on both server and client so the two renders match, then
  // fills in after mount — the share links need wherever this page is
  // actually hosted, which isn't knowable at build/SSR time.
  const [pageUrl, setPageUrl] = useState("");
  useEffect(() => {
    // Syncing from the browser's URL, an external system React doesn't
    // own — the sanctioned case for setState-in-effect, not derived state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPageUrl(window.location.href);
  }, []);

  return (
    <div className="py-[var(--p-space-2)] text-center">
      <h3 className="text-[length:var(--p-text-xl)] font-[var(--p-weight-medium)] text-(--p-ink)">
        {title || "Thank you for your interest!"}
      </h3>
      <p className="mt-[var(--p-space-1)] text-[length:var(--p-text-sm)] text-(--p-muted)">
        {body || "Your application is in. Here's what to look at next."}
      </p>

      <div className="mt-[var(--p-space-3)]">
        <ResourceCards resources={RESOURCES} />
      </div>

      <p className="mt-[var(--p-space-3)] text-[length:var(--p-text-sm)] text-(--p-muted)">
        Once you have gone through those, email us at{" "}
        <a
          href="mailto:designpartners@teamhappily.com"
          className="text-(--p-ink) underline decoration-(--p-line-strong) underline-offset-2"
        >
          designpartners@teamhappily.com
        </a>{" "}
        for Pro access — custom event builds can only be done using our Pro
        feature.
      </p>

      <p className="mt-[var(--p-space-2)] text-[length:var(--p-text-sm)] text-(--p-muted)">
        We look forward to seeing what you build, and to working with you.
      </p>

      <div className="mt-[var(--p-space-4)] border-t border-(--p-line) pt-[var(--p-space-3)]">
        <p className="p-label">Know someone who would be interested?</p>
        <div className="mt-[var(--p-space-2)] flex justify-center gap-[var(--p-space-2)]">
          {shareLinks(pageUrl).map((share) => (
            <a
              key={share.name}
              href={share.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${share.name}`}
              className="flex size-[38px] items-center justify-center rounded-full border border-(--p-line-strong) text-(--p-muted) transition-all duration-[var(--p-duration-fast)] ease-(--p-ease) hover:-translate-y-[3px] hover:border-(--p-accent) hover:text-(--p-accent)"
            >
              <span className="size-[16px]">{share.icon}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

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
    return <SuccessMessage title={successTitle} body={successBody} />;
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
