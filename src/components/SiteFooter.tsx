import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>© {new Date().getFullYear()} Owais Raza</span>
      <div className="footer-links">
        <Link href="/now">Now</Link>
        <Link href="/contact">Get in touch ↗</Link>
      </div>
    </footer>
  );
}
