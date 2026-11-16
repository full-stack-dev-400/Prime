"use client";

import { useState, type FormEvent } from "react";
import styles from "./PrimeContactForm.module.css";

const companyTypes = [
  { label: "Broker", value: "broker" },
  { label: "Hedge fund", value: "fund" },
  { label: "Exchange / venue", value: "exchange" },
  { label: "Global institution", value: "bank" },
  { label: "Professional trader", value: "other" },
];

const volumes = [
  "Up to $1B (Starter)",
  "$1B – $1.5B (Advanced)",
  "$2B+ (Pro)",
  "Not sure yet",
];

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

type ContactResponse = {
  ok?: boolean;
  stored?: boolean;
  notified?: boolean;
  error?: string;
  errors?: Record<string, string>;
};

export default function PrimeContactForm() {
  const [notice, setNotice] = useState("");
  const [noticeType, setNoticeType] = useState<"success" | "error" | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    const form = event.currentTarget;
    const data = new FormData(form);

    const value = (field: string) => String(data.get(field) ?? "").trim();

    setIsSubmitting(true);
    setNotice("");
    setNoticeType("");

    try {
      const payload = {
        fullName: value("fullName"),
        company: value("company"),
        email: value("email"),
        clientType: value("companyType"),
        monthlyVolume: value("volume"),
        interest: [],
        message: value("message"),
        website: value("website"),
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result: ContactResponse = await response.json();

      if (!response.ok || !result.ok || !result.stored) {
        const fieldError = result.errors
          ? Object.values(result.errors)[0]
          : undefined;

        throw new Error(
          fieldError ||
            result.error ||
            "Unable to submit your enquiry. Please try again.",
        );
      }

      setNoticeType("success");
      setNotice(
        "Thank you! Your enquiry has been submitted successfully. Our prime desk will contact you soon.",
      );

      form.reset();
    } catch (error) {
      setNoticeType("error");
      setNotice(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className={styles.contact}
      aria-labelledby="contact-title"
    >
      <div className={styles.wrap}>
        <div className={styles.contactPanel}>
          <div className={styles.contactInfo}>
            <span className={styles.eyebrowLight}>
              GET IN TOUCH / PRIME DESK
            </span>

            <h2 id="contact-title">
              Let&apos;s build your <em>prime setup.</em>
            </h2>

            <p className={styles.contactLead}>
              Tell us about your flow, platform and volume. Our prime desk will
              recommend a package and set up a test stream.
            </p>

            <div className={styles.contactDetails}>
              <div>
                <span className={styles.detailIcon}>✉</span>
                <div>
                  <strong>Email</strong>
                  <a href="mailto:enquiry@jkvglobal.com">
                    enquiry@jkvglobal.com
                  </a>
                </div>
              </div>

              <div>
                <span className={styles.detailIcon}>⌖</span>
                <div>
                  <strong>Registered office</strong>
                  <span>
                    The Gardens, Ground Floor, Bagatelle Office Park, Moka
                    80832, Mauritius
                  </span>
                </div>
              </div>

              <div>
                <span className={styles.detailIcon}>◷</span>
                <div>
                  <strong>Prime desk</strong>
                  <span>24 hours, Monday to Friday</span>
                </div>
              </div>
            </div>

            <div className={styles.contactDecoration} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formHeading}>
              <span>INSTITUTIONAL ENQUIRY</span>
              <span>01 / CONTACT</span>
            </div>

            <div className={styles.formGrid}>
              <label className={styles.field}>
                Full name{" "}
                <input
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={120}
                  placeholder="Your full name"
                  disabled={isSubmitting}
                />
              </label>

              <label className={styles.field}>
                Company{" "}
                <input
                  name="company"
                  type="text"
                  autoComplete="organization"
                  required
                  maxLength={150}
                  placeholder="Company name"
                  disabled={isSubmitting}
                />
              </label>

              <label className={`${styles.field} ${styles.full}`}>
                Work email{" "}
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={200}
                  placeholder="name@company.com"
                  disabled={isSubmitting}
                />
              </label>

              <label className={styles.field}>
                Company type{" "}
                <select
                  name="companyType"
                  defaultValue=""
                  required
                  disabled={isSubmitting}
                >
                  <option value="" disabled>
                    Select company type
                  </option>

                  {companyTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className={styles.field}>
                Expected monthly volume{" "}
                <select
                  name="volume"
                  defaultValue=""
                  required
                  disabled={isSubmitting}
                >
                  <option value="" disabled>
                    Select monthly volume
                  </option>

                  {volumes.map((volume) => (
                    <option key={volume} value={volume}>
                      {volume}
                    </option>
                  ))}
                </select>
              </label>

              <label className={`${styles.field} ${styles.full}`}>
                What do you need?{" "}
                <textarea
                  name="message"
                  rows={5}
                  maxLength={3000}
                  placeholder="Tell us about your platforms, liquidity requirements or current setup..."
                  disabled={isSubmitting}
                />
              </label>
            </div>

            {/* Hidden honeypot for basic spam protection */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-9999px",
                width: "1px",
                height: "1px",
                overflow: "hidden",
              }}
            >
              <label htmlFor="contact-website">Website</label>
              <input
                id="contact-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <p className={styles.formNote}>
              For institutional and professional clients only.
            </p>

            <button
              className={styles.submit}
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              style={{
                cursor: isSubmitting ? "not-allowed" : "pointer",
                opacity: isSubmitting ? 0.75 : 1,
              }}
            >
              {isSubmitting ? "Sending enquiry..." : "Send enquiry"}

              {!isSubmitting && <ArrowIcon />}
            </button>

            {notice && (
              <p
                className={styles.notice}
                role={noticeType === "error" ? "alert" : "status"}
                style={{
                  color: noticeType === "error" ? "#DC2626" : "#047857",
                }}
              >
                {notice}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
