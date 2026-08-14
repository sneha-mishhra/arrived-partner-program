// CONTENTFUL MAP → content type: "ApplyForm"
// Fields: eyebrow, headline, body, hubspotPortalId, hubspotFormId, hubspotRegion

import Script from "next/script";

export default function ApplyForm() {
  return (
    <section id="apply" className="w-full px-6 py-10 scroll-mt-8">
      <div className="max-w-5xl mx-auto bg-brand-navy text-white rounded-3xl px-8 md:px-16 py-16 md:py-20 text-center">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight max-w-3xl mx-auto">
          Apply to become an Arrived partner.
        </h2>
        {/* HubSpot form embed */}
        <div className="mt-10 max-w-lg mx-auto bg-white rounded-2xl p-6 md:p-8 text-left text-brand-navy">
          <Script
            src="https://js-na2.hsforms.net/forms/embed/8860600.js"
            strategy="afterInteractive"
          />
          <div
            className="hs-form-frame"
            data-region="na2"
            data-form-id="2119de53-637b-4c15-ab67-18951b7b39b6"
            data-portal-id="8860600"
          />
        </div>
      </div>
    </section>
  );
}
