import { useEffect, useRef } from "react";
import { animate, createScope } from "animejs";
import { Link } from "react-router";
import { useLanguage } from "../../i18n/LanguageProvider";

const stepKeys = ["booking.step.package", "booking.step.traveler", "booking.step.invoice", "booking.step.payment", "booking.step.done"] as const;

type BookingProgressHeaderProps = {
  activeStep: number;
  closeTo: string;
};

export function BookingProgressHeader({ activeStep, closeTo }: BookingProgressHeaderProps) {
  const { t } = useLanguage();
  const progressRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = progressRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scope = createScope({ root }).add(() => {
      const activeMarker = root.querySelector(".booking-stepper-current > span");
      if (activeMarker) {
        animate(activeMarker, { scale: [0.82, 1], opacity: [0.72, 1], duration: 300, ease: "out(4)" });
      }
    });

    return () => scope.revert();
  }, [activeStep]);

  return (
    <header className="booking-wizard-header" ref={progressRef}>
      <Link aria-label={t("booking.progress.title")} className="booking-wizard-title" to={closeTo}>{t("booking.progress.title")}</Link>
      <nav aria-label={t("booking.progress.nav")} className="booking-stepper">
        {stepKeys.map((key, index) => {
          const label = t(key);
          const number = index + 1;
          return <div aria-current={activeStep === number ? "step" : undefined} className={`booking-stepper-item ${activeStep === number ? "booking-stepper-current" : activeStep > number ? "booking-stepper-done" : ""}`} key={label}><span>{activeStep > number ? "✓" : number}</span><small>{label}</small></div>;
        })}
      </nav>
      <Link className="booking-close-link" to={closeTo}>{t("booking.progress.close")}</Link>
    </header>
  );
}
