// CONTENTFUL MAP → content type: "Footer"
// Fields: copyrightText, links (List of {label, url}) - repeatable

export default function Footer() {
  return (
    <footer className="w-full px-6 py-10 text-center text-sm text-brand-muted">
      <div>© 2026 Happily. All rights reserved.</div>
      <div className="mt-2 flex items-center justify-center gap-4">
        <a href="https://happilyarrive.com" className="hover:text-brand-navy">
          happilyarrive.com
        </a>
        <span>·</span>
        <a href="https://teamhappily.com" className="hover:text-brand-navy">
          teamhappily.com
        </a>
        <span>·</span>
        <a href="#" className="hover:text-brand-navy">
          embedded
        </a>
      </div>
    </footer>
  );
}
