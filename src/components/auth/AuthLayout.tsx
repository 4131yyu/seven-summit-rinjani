import { useEffect, useState, type ReactNode } from "react";

import { assetPaths } from "../../config/assets";

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
};

export function AuthLayout({ children, title }: AuthLayoutProps) {
  const [videoFailed, setVideoFailed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return (
    <section aria-label={title} className="auth-page">
      <img alt="" className="auth-background" src={assetPaths.heroPoster} />
      {!prefersReducedMotion && !videoFailed ? (
        <video
          autoPlay
          className="auth-background auth-background-video"
          loop
          muted
          onError={() => setVideoFailed(true)}
          playsInline
          poster={assetPaths.heroPoster}
          preload="metadata"
        >
          <source src={assetPaths.heroVideo} type="video/mp4" />
        </video>
      ) : null}
      <div aria-hidden="true" className="auth-background-overlay" />
      <div className="auth-panel">
        <div aria-hidden="true" className="auth-paper-texture" />
        <div className="auth-form-content">{children}</div>
      </div>
      <p className="auth-visual-title" aria-hidden="true">YOUR HOME ABOVE<br />THE CLOUDS</p>
    </section>
  );
}
