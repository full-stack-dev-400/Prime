"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

import styles from "./Navbar.module.css";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "#solutions", label: "Solutions" },
  { href: "#infrastructure", label: "Infrastructure" },

  { href: "#who-we-serve", label: "Who we serve" },

  { href: "#risk", label: "Risk tools" },
  { href: "#packages", label: "Packages" },
  { href: "#about", label: "About us" },
  { href: "#faq", label: "FAQ" },
] as const;

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
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
  );
}

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

      if (currentScrollY <= 80 || open) {
        setHidden(false);
        lastScrollY = currentScrollY;
      } else if (difference > 6) {
        setHidden(true);
        lastScrollY = currentScrollY;
      } else if (difference < -6) {
        setHidden(false);
        lastScrollY = currentScrollY;
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        frameId = window.requestAnimationFrame(updateNavbar);
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

  // Close the mobile menu using Escape.
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  // Close the menu when the viewport becomes desktop-sized.
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1350px)");

    const handleChange = () => {
      if (media.matches) {
        setOpen(false);
      }
    };

    media.addEventListener("change", handleChange);

    return () => {
      media.removeEventListener("change", handleChange);
    };
  }, []);

  // Prevent page scrolling behind the open mobile menu.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const shouldHide = hidden && !open;

  const closeMenu = () => {
    setOpen(false);
    setHidden(false);
  };

  return (
    <header
      className={[
        styles.header,
        scrolled || open ? styles.scrolled : "",
        shouldHide ? styles.hidden : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <nav className={styles.nav} aria-label="Main navigation">
        {/* LOGO */}
        <Link
          href="/"
          aria-label="JKV Prime home"
          className={styles.logoLink}
          onClick={closeMenu}
        >
          <Image
            src="/images/JKVPrimelogo.png"
            alt="JKV Prime — The Prime Partner for Global Brokers"
            width={240}
            height={90}
            className={styles.logo}
            priority
          />
        </Link>

        {/* DESKTOP LINKS */}
        <ul className={styles.desktopLinks}>
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* DESKTOP CTA */}
        <div className={styles.desktopAction}>
          <Link href="#contact" className={styles.contactButton}>
            <span>Get in touch</span>
            <ArrowIcon />
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          type="button"
          className={styles.menuToggle}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="prime-mobile-menu"
          onClick={() => {
            setOpen((previous) => !previous);
            setHidden(false);
          }}
        >
          <MenuIcon open={open} />
        </button>
      </nav>

      {/* MOBILE NAVIGATION */}
      {open && (
        <div id="prime-mobile-menu" className={styles.mobileMenu}>
          <ul className={styles.mobileLinks}>
            {LINKS.map((link, index) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={styles.mobileLink}
                  onClick={closeMenu}
                >
                  <span className={styles.mobileIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span>{link.label}</span>

                  <span className={styles.mobileArrow} aria-hidden="true">
                    ↗
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.mobileAction}>
            <Link
              href="#contact"
              className={styles.contactButton}
              onClick={closeMenu}
            >
              <span>Get in touch</span>
              <ArrowIcon />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
