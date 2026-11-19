import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { HeroSection } from "../components/landing/HeroSection";

export function LandingPage() {
  const navigate = useNavigate();
  const [isWelcomeVisible, setIsWelcomeVisible] = useState(false);
  const [isWelcomeLeaving, setIsWelcomeLeaving] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const welcomeEnterTimeout = window.setTimeout(() => setIsWelcomeVisible(true), 50);
    const welcomeLeaveTimeout = window.setTimeout(() => setIsWelcomeLeaving(true), 1300);
    const welcomeFinishTimeout = window.setTimeout(() => setIsWelcomeVisible(false), 1900);
    const redirectTransitionTimeout = window.setTimeout(() => setIsRedirecting(true), 3700);
    const navigationTimeoutId = window.setTimeout(() => {
      navigate("/login", { replace: true });
    }, 4400);

    return () => {
      window.clearTimeout(welcomeEnterTimeout);
      window.clearTimeout(welcomeLeaveTimeout);
      window.clearTimeout(welcomeFinishTimeout);
      window.clearTimeout(redirectTransitionTimeout);
      window.clearTimeout(navigationTimeoutId);
    };
  }, [navigate]);

  return (
    <div className="landing-transition-surface">
      <HeroSection />
      {isWelcomeVisible ? (
        <div
          aria-atomic="true"
          aria-hidden={isWelcomeLeaving}
          aria-live="polite"
          className={`landing-welcome-overlay${isWelcomeLeaving ? " landing-welcome-leaving" : " landing-welcome-visible"}`}
        >
          <div className="landing-welcome-copy">
            <p>Seven Summit Rinjani</p>
            <h2>Selamat Datang</h2>
          </div>
        </div>
      ) : null}
      <div aria-hidden="true" className={`landing-login-transition${isRedirecting ? " landing-login-transition-active" : ""}`} />
    </div>
  );
}
