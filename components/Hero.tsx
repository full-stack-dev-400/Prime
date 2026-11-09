"use client";

import { useEffect, useState, type SyntheticEvent } from "react";
import styles from "./hero.module.css";

const HERO_MEDIA = {
  webm: "/JKVGlobalHrobg.webm",
  mp4: "/JKVGlobalHrobg.mp4",
  poster: "/JKVGlobalHrobg.webp",
} as const;

type VideoFormat = "webm" | "mp4";

export default function Hero() {
  const [allowMotion, setAllowMotion] = useState(false);
  const [videoFormat, setVideoFormat] = useState<VideoFormat | null>("webm");
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncPreference = () => {
      setAllowMotion(!query.matches);
      if (query.matches) setVideoReady(false);
    };

    syncPreference();
    query.addEventListener("change", syncPreference);

    return () => query.removeEventListener("change", syncPreference);
  }, []);

  const handleVideoError = () => {
    setVideoReady(false);
    setVideoFormat((current) => (current === "webm" ? "mp4" : null));
  };

  const handleVideoPlaying = (event: SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;

    // Keep the image until the first real video frame is displayed.
    if (typeof video.requestVideoFrameCallback === "function") {
      video.requestVideoFrameCallback(() => {
        if (video.isConnected && !video.paused && !video.ended) {
          setVideoReady(true);
        }
      });
    } else {
      setVideoReady(true);
    }
  };

  return (
    <section className={styles.hero} id="home" aria-labelledby="hero-title">
      <div className={styles.media} aria-hidden="true">
        {/* Placeholder disappears when videoReady becomes true. */}
        <div
          className={`${styles.poster} ${
            videoReady ? styles.posterHidden : ""
          }`}
          style={{
            backgroundImage: `url("${HERO_MEDIA.poster}")`,
          }}
        />

        {allowMotion && videoFormat && (
          <video
            key={videoFormat}
            className={`${styles.video} ${videoReady ? styles.videoReady : ""}`}
            src={HERO_MEDIA[videoFormat]}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            onPlaying={handleVideoPlaying}
            onWaiting={() => setVideoReady(false)}
            onError={handleVideoError}
          />
        )}
      </div>

      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.copy}>
          <h1 className={styles.title} id="hero-title">
            The world&apos;s financial centres,{" "}
            <span>one liquidity source.</span>
          </h1>

          <p className={styles.description}>
            One prime relationship for aggregated FX liquidity, FIX connectivity
            at Equinix LD4/LD5 and real-time risk control, built for brokers,
            funds and exchanges.
          </p>

          <div className={styles.actions}>
            <a className={styles.primaryButton} href="#solutions">
              Explore solutions <span aria-hidden="true">→</span>
            </a>

            <a className={styles.secondaryButton} href="#contact">
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
