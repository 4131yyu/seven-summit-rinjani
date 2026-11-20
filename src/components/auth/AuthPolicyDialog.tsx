import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";

import { useLanguage } from "../../i18n/LanguageProvider";

export function AuthPolicyDialog() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [isOpen]);

  const handleDialogKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
    } else if (event.key === "Tab") {
      event.preventDefault();
      closeRef.current?.focus();
    }
  };

  return (
    <>
      <button
        aria-haspopup="dialog"
        className="auth-policy-link"
        onClick={() => setIsOpen(true)}
        ref={triggerRef}
        type="button"
      >
        {t("auth.policy.link")}
      </button>
      {isOpen ? createPortal(
        <div className="auth-policy-overlay" onClick={(event) => { if (event.target === event.currentTarget) setIsOpen(false); }}>
          <section
            aria-describedby="auth-policy-dialog-copy"
            aria-labelledby="auth-policy-dialog-title"
            aria-modal="true"
            className="auth-policy-dialog"
            onKeyDown={handleDialogKeyDown}
            role="dialog"
            tabIndex={-1}
          >
            <div className="auth-policy-dialog-heading">
              <h2 id="auth-policy-dialog-title">{t("auth.policy.dialog.title")}</h2>
              <button className="auth-policy-close" onClick={() => setIsOpen(false)} ref={closeRef} type="button">
                {t("auth.policy.close")}
              </button>
            </div>
            <div className="auth-policy-dialog-copy" id="auth-policy-dialog-copy">
              <section>
                <h3>{t("auth.policy.privacy.title")}</h3>
                <p>{t("auth.policy.privacy.copy")}</p>
              </section>
              <section>
                <h3>{t("auth.policy.terms.title")}</h3>
                <p>{t("auth.policy.terms.copy")}</p>
              </section>
            </div>
          </section>
        </div>,
        document.body,
      ) : null}
    </>
  );
}
