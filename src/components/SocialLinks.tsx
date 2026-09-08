import { Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/RazaNaqsh",
    icon: Github,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/owaisraza1704/",
    icon: Linkedin,
    external: true,
  },
  {
    label: "Email",
    href: "mailto:owaisraza1704@gmail.com",
    icon: Mail,
    external: false,
  },
];

type SocialLinksProps = {
  variant?: "icons" | "inline";
};

export default function SocialLinks({ variant = "icons" }: SocialLinksProps) {
  if (variant === "inline") {
    return (
      <div className="social-inline-list">
        {socialLinks.map(({ label, href, icon: Icon, external }) => (
          <a
            className="social-inline-link"
            href={href}
            key={label}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
          >
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="social-icon-list">
      {socialLinks.map(({ label, href, icon: Icon, external }) => (
        <a
          className="social-icon-link"
          href={href}
          key={label}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          aria-label={label}
        >
          <Icon aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
