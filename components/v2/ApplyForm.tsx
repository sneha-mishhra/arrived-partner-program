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

const HALF_WIDTH = new Set(["firstName", "lastName"]);

const fieldClass =
  "w-full rounded-[var(--p-radius-pill)] border border-(--p-line-strong) bg-(--p-bg) px-[var(--p-space-2)] py-[0.7rem] text-[length:var(--p-text-sm)] text-(--p-ink) outline-none transition-colors duration-[var(--p-duration-fast)] ease-(--p-ease) focus:border-(--p-accent)";

const RESOURCES: Resource[] = [
  {
    label: "About the Arrived platform",
    tag: "GUIDE",
    body: "How the builder works, end to end, before you touch a brief.",
    href: "https://docs.google.com/document/d/1baqWyG_txn1vbBS8xuTxg90xu-OxULNDEeeaJg13DBY/edit?usp=sharing",
    mark: "doc",
    color: "var(--p-chip-violet)",
  },
  {
    label: "Assignment brief",
    tag: "PDF",
    body: "The task you'll be evaluated on for your first design jam.",
    href: "https://8860600.fs1.hubspotusercontent-na2.net/hubfs/8860600/Arrived%20Partner%20Assignment.pdf",
    mark: "brief",
    color: "var(--p-chip-amber)",
  },
];

const SHARE_TEXT = "Arrived is looking for design partners, worth a look.";

function shareLinks(url: string) {
  return [
    {
      name: "Instagram",
      // Instagram has no web share-intent URL, so this opens Instagram
      // itself; the link is copied to the clipboard first (see the click
      // handler below) so it's ready to paste into a bio, story, or DM.
      href: "https://www.instagram.com/",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      name: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT} ${url}`)}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.32a8.19 8.19 0 0 1-1.26-4.38c.01-4.54 3.7-8.23 8.25-8.23M8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.27-.25-.14-1.47-.74-1.69-.82-.23-.08-.37-.12-.56.12-.16.25-.64.81-.78.97-.15.17-.29.19-.53.07-.26-.13-1.06-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01" />
        </svg>
      ),
    },
  ];
}

export function SuccessMessage({
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

  const [copied, setCopied] = useState(false);
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
    } catch {
      // Clipboard API can be denied (older Safari, an unfocused tab); a
      // hidden textarea + execCommand is the long-standing fallback.
      const el = document.createElement("textarea");
      el.value = pageUrl;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

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
        for Pro access, since custom event builds can only be done using our
        Pro feature.
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
              onClick={share.name === "Instagram" ? copyLink : undefined}
              className="flex size-[38px] items-center justify-center rounded-full border border-(--p-line-strong) text-(--p-muted) transition-all duration-[var(--p-duration-fast)] ease-(--p-ease) hover:-translate-y-[3px] hover:border-(--p-accent) hover:text-(--p-accent)"
            >
              <span className="size-[16px]">{share.icon}</span>
            </a>
          ))}

          <button
            type="button"
            onClick={copyLink}
            aria-label="Copy link"
            className="flex size-[38px] items-center justify-center rounded-full border border-(--p-line-strong) text-(--p-muted) transition-all duration-[var(--p-duration-fast)] ease-(--p-ease) hover:-translate-y-[3px] hover:border-(--p-accent) hover:text-(--p-accent)"
          >
            {copied ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-[16px]">
                <path d="m4 12 5 5 11-11" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-[16px]">
                <rect x="8" y="8" width="12" height="12" rx="2.5" />
                <path d="M16 8V6.5A2.5 2.5 0 0 0 13.5 4H6.5A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8" />
              </svg>
            )}
          </button>
        </div>

        {copied ? (
          <p className="mt-[var(--p-space-1)] text-[length:var(--p-text-xs)] text-(--p-faint)">
            Link copied
          </p>
        ) : null}
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

  if (field.inputType === "dropdown") {
    const options = field.items?.enum ?? [];

    return (
      <div className={HALF_WIDTH.has(field.id) ? "" : "sm:col-span-2"}>
        <label htmlFor={field.id} className="p-label">
          {label}
        </label>
        <div className="relative mt-[var(--p-space-1)]">
          <select
            id={field.id}
            name={field.id}
            required={field.required}
            defaultValue=""
            className={`${fieldClass} appearance-none pr-[var(--p-space-4)]`}
          >
            <option value="" disabled>
              Select {field.title.toLowerCase()}
            </option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="pointer-events-none absolute right-[var(--p-space-2)] top-1/2 size-[12px] -translate-y-1/2 text-(--p-muted)"
          >
            <path d="m4 6 4 4 4-4" />
          </svg>
        </div>
      </div>
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
