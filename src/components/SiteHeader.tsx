"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import SocialLinks from "@/components/SocialLinks";

const navItems = [
  { label: "Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Thoughts", href: "/writing" },
  { label: "Lab", href: "/lab" },
] as const;

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const updateScrollProgress = () => {
      setScrollProgress(Math.min(window.scrollY / 180, 1));
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  const headerStyle = {
    "--header-background-opacity": scrollProgress * 0.92,
    "--header-border-opacity": scrollProgress * 0.22,
  } as CSSProperties;

  return (
    <header
      className="site-header"
      style={headerStyle}
    >
      <Link className="brand" href="/">
        OWAIS RAZA
      </Link>

      <nav className="main-nav desktop-nav" aria-label="Main navigation">
        <div className="nav-links">
          {navItems.map((item) => (
            <Link
              className={`nav-link${pathname === item.href || pathname.startsWith(`${item.href}/`) ? " active" : ""}`}
              href={item.href}
              key={item.href}
              aria-current={pathname === item.href || pathname.startsWith(`${item.href}/`) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <SocialLinks />
      </nav>

      <button
        className="mobile-menu-button"
        type="button"
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      {isMenuOpen && (
        <div className="mobile-menu">
          <nav className="mobile-nav-links" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                className={`mobile-nav-link${pathname === item.href || pathname.startsWith(`${item.href}/`) ? " active" : ""}`}
                href={item.href}
                key={item.href}
                onClick={() => setIsMenuOpen(false)}
                aria-current={pathname === item.href || pathname.startsWith(`${item.href}/`) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mobile-socials">
            <SocialLinks />
          </div>
        </div>
      )}
    </header>
  );
}
