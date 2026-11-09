"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";

const LINKS = [
  { href: "#solutions", label: "Solutions" },
  { href: "#infrastructure", label: "Infrastructure" },
  { href: "#clients", label: "Who we serve" },
  { href: "#onboarding", label: "Onboarding" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = Math.max(window.scrollY, 0);
    let ticking = false;
    let frameId = 0;

    const updateNavbar = () => {
      const currentScrollY = Math.max(window.scrollY, 0);
      const difference = currentScrollY - lastScrollY;

      setScrolled(currentScrollY > 12);

      // Always show the navbar near the top.
      if (currentScrollY <= 80) {
        setHidden(false);
        lastScrollY = currentScrollY;
      }

      // Keep the navbar visible while mobile menu is open.
      else if (open) {
        setHidden(false);
        lastScrollY = currentScrollY;
      }

      // Hide while scrolling down.
      else if (difference > 6) {
        setHidden(true);
        lastScrollY = currentScrollY;
      }

      // Show while scrolling up.
      else if (difference < -6) {
        setHidden(false);
        lastScrollY = currentScrollY;
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        frameId = window.requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    updateNavbar();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.cancelAnimationFrame(frameId);
    };
  }, [open]);

  const shouldHide = hidden && !open;

  const contactButton =
    "inline-flex items-center justify-center rounded-full " +
    "bg-[#65E0BA] px-5 py-2.5 text-sm font-semibold " +
    "text-[#071F1B] transition-colors duration-200 " +
    "hover:bg-[#16B8A6] focus-visible:outline " +
    "focus-visible:outline-2 focus-visible:outline-offset-4 " +
    "focus-visible:outline-[#65E0BA]";

  return (
    <header
      className={`
        fixed inset-x-0 top-0 z-50
        border-b border-white/10
        bg-[#103A32]
        text-[#F4FAF7]
        transition-[transform,box-shadow,background-color]
        duration-300
        ease-[cubic-bezier(0.22,1,0.36,1)]
        motion-reduce:transition-none
        ${shouldHide ? "-translate-y-full" : "translate-y-0"}
        ${
          scrolled || open
            ? "shadow-[0_12px_35px_rgba(0,0,0,0.22)]"
            : "shadow-none"
        }
      `}
    >
      <nav className="container-site flex h-16 items-center justify-between md:h-20">
        {/* Logo */}
        <Link
          href="/"
          aria-label="JKV Prime home"
          onClick={() => setOpen(false)}
          className="relative z-10"
        >
          <Logo className="h-7 w-auto md:h-8" />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="
                  relative text-sm font-medium
                  text-[#F4FAF7]/85
                  transition-colors duration-200
                  hover:text-[#65E0BA]
                "
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <a href="#contact" className={contactButton}>
            Get in touch
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="
            rounded-lg p-2
            text-[#F4FAF7]
            transition-colors duration-200
            hover:bg-white/10
            lg:hidden
          "
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => {
            setOpen((previous) => !previous);
            setHidden(false);
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Navigation */}
      {open && (
        <div
          id="mobile-menu"
          className="
            container-site
            border-t border-white/10
            bg-[#103A32]
            pb-6
            lg:hidden
          "
        >
          <ul className="flex flex-col gap-1 pt-3">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="
                    block rounded-lg px-3 py-3
                    text-base font-medium
                    text-[#F4FAF7]/85
                    transition-colors duration-200
                    hover:bg-white/10
                    hover:text-[#65E0BA]
                  "
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className={`${contactButton} mt-4 w-full`}
          >
            Get in touch
          </a>
        </div>
      )}
    </header>
  );
}
