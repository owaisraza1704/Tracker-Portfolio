"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import SocialLinks from "@/components/SocialLinks";

const navItems = [
  { label: "Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Writing", href: "/writing" },
  { label: "Lab", href: "/lab" },
  { label: "Now", href: "/now" },
  { label: "Contact", href: "/contact" },
] as const;

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="brand" href="/">
        OWAIS RAZA
      </Link>

      <nav className="main-nav desktop-nav" aria-label="Main navigation">
        <div className="nav-links">
          {navItems.map((item) => (
            <Link className="nav-link" href={item.href} key={item.href}>
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
                className="mobile-nav-link"
                href={item.href}
                key={item.href}
                onClick={() => setIsMenuOpen(false)}
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
