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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition ${scrolled || open ? "border-b border-navy-4/60 bg-navy/85 backdrop-blur-md" : "bg-transparent"}`}
    >
      <nav className="container-site flex h-16 items-center justify-between md:h-20">
        <Link href="/" aria-label="JKV Prime home" onClick={() => setOpen(false)}>
          <Logo className="h-7 w-auto md:h-8" />
        </Link>
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm font-medium text-mist-body transition hover:text-offwhite">{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="hidden md:block">
          <a href="#contact" className="btn-primary !py-2.5">Get in touch</a>
        </div>
        <button
          className="rounded-lg p-2 text-offwhite md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>
      {open && (
        <div className="container-site pb-6 md:hidden">
          <ul className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-2 py-3 text-base text-mist-body hover:bg-navy-2 hover:text-offwhite">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-4 w-full">Get in touch</a>
        </div>
      )}
    </header>
  );
}
