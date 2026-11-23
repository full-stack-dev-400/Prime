"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import styles from "./Footer.module.css";

type SubscribeStatus = "idle" | "loading" | "success" | "error";

export default function Footer() {
  const [status, setStatus] = useState<SubscribeStatus>("idle");

  const [message, setMessage] = useState("");

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "loading") return;

    const form = event.currentTarget;
    const data = new FormData(form);

    const email = String(data.get("email") ?? "").trim();

    if (!email) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        setStatus("error");

        setMessage(
          response.status === 400 || response.status === 422
            ? "Please enter a valid email address."
            : "Unable to subscribe right now. Please try again.",
        );

        return;
      }

      setStatus("success");
      setMessage("Subscribed successfully. Thank you!");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Connection error. Please try again.");
    }
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.main}>
          {/* BRAND */}
          <div className={styles.brand}>
            <div className={styles.logoWrap}>
              <Image
                src="/images/JKVPrimelogo.png"
                alt="JKV Prime — The Prime Partner for Global Brokers"
                width={260}
                height={98}
                className={styles.logo}
              />
            </div>

            <p className={styles.brandDescription}>
              Global markets. Local insight. Prime liquidity for brokers, funds
              and exchanges.
            </p>

            <div className={styles.brandLine} />
          </div>

          {/* SOLUTIONS */}
          <nav
            className={styles.column}
            aria-label="Footer solutions navigation"
          >
            <h3>Solutions</h3>

            <ul className={styles.linkList}>
              <li>
                <a href="#solutions">FX liquidity</a>
              </li>
              <li>
                <a href="#solutions">FIX connectivity</a>
              </li>
              <li>
                <a href="#solutions">Risk control</a>
              </li>
            </ul>
          </nav>

          {/* COMPANY */}
          <nav className={styles.column} aria-label="Footer company navigation">
            <h3>Company</h3>

            <ul className={styles.linkList}>
              <li>
                <a href="#infrastructure">Infrastructure</a>
              </li>
              <li>
                <a href="#clients">Who we serve</a>
              </li>
              <li>
                <a href="#about">About JKV Prime</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </nav>

          {/* NEWSLETTER */}
          <div className={styles.newsletter}>
            <h3>Market insights</h3>

            <p className={styles.newsletterText}>
              Subscribe for institutional market insights and liquidity updates
              from JKV Prime.
            </p>

            <form className={styles.subscribeForm} onSubmit={subscribe}>
              <label htmlFor="footer-subscribe-email" className={styles.srOnly}>
                Work email address
              </label>

              <div className={styles.inputWrap}>
                <input
                  id="footer-subscribe-email"
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  placeholder="you@company.com"
                  className={styles.emailInput}
                  disabled={status === "loading"}
                  onChange={() => {
                    if (status === "error" || status === "success") {
                      setStatus("idle");
                      setMessage("");
                    }
                  }}
                />
              </div>

              <button
                type="submit"
                className={styles.subscribeButton}
                disabled={status === "loading"}
              >
                <span>{status === "loading" ? "Joining..." : "Join"}</span>

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
              </button>
            </form>

            {message && (
              <p
                className={status === "success" ? styles.success : styles.error}
                role="status"
                aria-live="polite"
              >
                {message}
              </p>
            )}

            <p className={styles.newsletterNote}>
              Institutional market insights. No spam.
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className={styles.bottom}>
        <div className={styles.container}>
          <div className={styles.bottomInner}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} JKV Prime. All rights reserved.
            </p>

            <p className={styles.disclaimer}>
              Trading leveraged products carries a high level of risk. Prices
              shown on this site are indicative only.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
