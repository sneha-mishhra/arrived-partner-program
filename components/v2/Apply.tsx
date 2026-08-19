// Closing CTA: statement on the left, application form on the right. The form
// is the Arrived event's registration form, fetched server-side. If Arrived is
// unreachable the section degrades to a link rather than an empty card.

import ApplyForm from "./ApplyForm";
import { Eyebrow } from "./Section";
import { Reveal } from "./motion";
import { getEventEnv, getEventId } from "@/lib/happily/config";
import { getPublicEventOptional } from "@/lib/happily/queries";

export default async function Apply() {
  const eventId = getEventId();
  const env = getEventEnv();
  const data = await getPublicEventOptional({ eventId, env });
  const form = data?.form ?? null;

  return (
    <section
      id="apply"
      className="relative z-10 w-full scroll-mt-[var(--p-space-6)] bg-(--p-bg) px-[var(--p-space-3)] pt-[var(--p-space-4)] pb-[var(--p-space-7)]"
    >
      <div className="mx-auto grid max-w-[1120px] items-start gap-[var(--p-space-5)] md:grid-cols-2">
        <div>
          <Reveal>
            <Eyebrow label="Ready to start" dot="var(--p-chip-green)" />
          </Reveal>
          <Reveal index={1}>
            <h2 className="p-h2 mt-[var(--p-space-2)] max-w-[420px]">
              Apply to become an Arrived partner
            </h2>
          </Reveal>
          <Reveal index={2}>
            <p className="p-lead mt-[var(--p-space-2)] max-w-[420px]">
              Tell us who you are and what you build. We review on a rolling
              basis and reply within a week.
            </p>
          </Reveal>
        </div>

        <Reveal index={2}>
          <div className="p-card !border-(--p-line-strong) bg-(--p-bg) p-[var(--p-space-3)] hover:!translate-y-0 md:p-[var(--p-space-4)]">
            {form ? (
              <ApplyForm
                eventId={eventId}
                env={env}
                form={form}
                successTitle={data?.event.content?.confirmationTitle}
                successBody={data?.event.content?.confirmationDescription}
              />
            ) : (
              <div className="text-center">
                <p className="text-[length:var(--p-text-sm)] text-(--p-muted)">
                  The application form is being updated. Apply directly on
                  Arrived in the meantime.
                </p>
                <a
                  href={`https://app.happily.events/${eventId}`}
                  className="p-btn p-btn-primary mt-[var(--p-space-3)]"
                >
                  Apply on Arrived
                </a>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
