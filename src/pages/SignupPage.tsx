import { type FormEvent, useState } from "react";
import { Link } from "react-router";

import { AuthLayout } from "../components/auth/AuthLayout";
import { AuthFieldIcon, PasswordVisibilityButton } from "../components/auth/AuthFieldIcon";
import { AuthLanguageToggle } from "../components/auth/AuthLanguageToggle";
import { AuthPolicyDialog } from "../components/auth/AuthPolicyDialog";
import { SocialAuthOptions, type SocialProvider } from "../components/auth/SocialAuthOptions";
import { useLanguage } from "../i18n/LanguageProvider";
import type { TranslationKey } from "../i18n/translations";

type SignupErrors = {
  email?: TranslationKey;
  password?: TranslationKey;
  policy?: TranslationKey;
};

export function SignupPage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [errors, setErrors] = useState<SignupErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [socialNotice, setSocialNotice] = useState<SocialProvider | "">("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: SignupErrors = {};

    if (!email.trim()) nextErrors.email = "auth.signup.error.email";
    else if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "auth.signup.error.emailInvalid";
    if (!password) nextErrors.password = "auth.signup.error.password";
    if (!policyAccepted) nextErrors.policy = "auth.policy.required";

    setErrors(nextErrors);
    setSubmitted(false);
    if (Object.keys(nextErrors).length === 0) setSubmitted(true);
  };

  const handleSocialSelect = (provider: SocialProvider) => {
    setSocialNotice(provider);
  };

  return (
    <AuthLayout title={t("auth.signup.title")}>
      <div className="auth-topline">
        <p className="auth-eyebrow">Seven Summit Rinjani</p>
        <AuthLanguageToggle />
      </div>
      <h1 className="auth-heading">{t("auth.signup.submit")}</h1>
      <p className="auth-intro">{t("auth.signup.intro")}</p>

      {submitted ? (
        <p aria-live="polite" className="auth-success">
          {t("auth.signup.success")}
        </p>
      ) : null}

      <form className="auth-form" noValidate onSubmit={handleSubmit}>
        <div className="auth-field-group">
          <div className={`auth-field ${errors.email ? "auth-field-invalid" : ""}`}>
              <label className="sr-only" htmlFor="signup-email">{t("auth.email")}</label>
            <AuthFieldIcon kind="email" />
            <input
              aria-describedby={errors.email ? "signup-email-error" : undefined}
              aria-invalid={Boolean(errors.email)}
              autoComplete="email"
              className="auth-input"
              id="signup-email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t("auth.email")}
              type="email"
              value={email}
            />
          </div>
          {errors.email ? <p className="auth-error" id="signup-email-error">{t(errors.email)}</p> : null}
        </div>

        <div className="auth-field-group">
          <div className={`auth-field ${errors.password ? "auth-field-invalid" : ""}`}>
              <label className="sr-only" htmlFor="signup-password">{t("auth.password")}</label>
            <AuthFieldIcon kind="password" />
            <input
              aria-describedby={errors.password ? "signup-password-error" : undefined}
              aria-invalid={Boolean(errors.password)}
              autoComplete="new-password"
              className="auth-input"
              id="signup-password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder={t("auth.password")}
              type={passwordVisible ? "text" : "password"}
              value={password}
            />
            <PasswordVisibilityButton onToggle={() => setPasswordVisible((visible) => !visible)} visible={passwordVisible} />
          </div>
          {errors.password ? <p className="auth-error" id="signup-password-error">{t(errors.password)}</p> : null}
        </div>

        <label className="auth-policy">
          <input checked={policyAccepted} id="signup-policy" onChange={(event) => setPolicyAccepted(event.target.checked)} type="checkbox" />
          <span className="auth-policy-copy"><label htmlFor="signup-policy">{t("auth.policy")}</label> <AuthPolicyDialog />.</span>
        </label>
        {errors.policy ? <p className="auth-policy-error">{t(errors.policy)}</p> : null}

        <button className="auth-submit" type="submit">{t("auth.signup.submit")}</button>
      </form>

      <SocialAuthOptions onSelect={handleSocialSelect} />
      {socialNotice ? <p aria-live="polite" className="auth-social-notice">{socialNotice} {t("auth.signup.social")}</p> : null}

      <p className="auth-switch-prompt">{t("auth.signup.switch")} <Link to="/login">{t("auth.login.submit")}</Link></p>
    </AuthLayout>
  );
}
