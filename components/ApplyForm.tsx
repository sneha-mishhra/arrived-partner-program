// CONTENTFUL MAP → content type: "ApplyForm"
// Fields: eyebrow, headline, body
// The form itself is not Contentful: it is the registration form on the Arrived
// event (app.happily.events → "Arrived Design Partner", 3xjiyVte0pz). Applicants
// land in that event's attendee list. Falls back to a link to Arrived if the
// event or its form is unavailable, so this section never breaks the page.

import ArrivedRegistrationForm from "./ArrivedRegistrationForm";
import { getEventEnv, getEventId } from "@/lib/happily/config";
import { getPublicEventOptional } from "@/lib/happily/queries";

export default async function ApplyForm() {
  const eventId = getEventId();
  const env = getEventEnv();
  const data = await getPublicEventOptional({ eventId, env });
  const form = data?.form ?? null;

  return (
    <section id="apply" className="w-full px-6 py-10 scroll-mt-8">
      <div className="max-w-5xl mx-auto bg-brand-navy text-white rounded-3xl px-8 md:px-16 py-16 md:py-20 text-center">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight max-w-3xl mx-auto">
          Apply to become an Arrived partner.
        </h2>
        <p className="mt-5 text-base text-white/70 max-w-xl mx-auto">
          Tell us who you are and what you build. We review applications on a
          rolling basis and reply within a week.
        </p>

        <div className="mt-10 max-w-lg mx-auto bg-white rounded-2xl p-6 md:p-8 text-left text-brand-navy">
          {form ? (
            <ArrivedRegistrationForm
              eventId={eventId}
              env={env}
              form={form}
              successTitle={data?.event.content?.confirmationTitle}
              successBody={data?.event.content?.confirmationDescription}
            />
          ) : (
            <div className="py-4 text-center">
              <p className="text-sm text-brand-muted">
                The application form is being updated. Apply directly on Arrived
                in the meantime.
              </p>
              <a
                href={`https://app.happily.events/${eventId}`}
                className="mt-5 inline-block rounded-full bg-brand-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-navy-2"
              >
                Apply on Arrived
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
