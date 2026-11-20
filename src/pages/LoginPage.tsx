import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";

import { AuthLayout } from "../components/auth/AuthLayout";
import { AuthFieldIcon, PasswordVisibilityButton } from "../components/auth/AuthFieldIcon";
import { AuthLanguageToggle } from "../components/auth/AuthLanguageToggle";
import { AuthPolicyDialog } from "../components/auth/AuthPolicyDialog";
import { SocialAuthOptions, type SocialProvider } from "../components/auth/SocialAuthOptions";
import { useLanguage } from "../i18n/LanguageProvider";
import type { TranslationKey } from "../i18n/translations";

const DEMO_USERNAME = "visitor";
const DEMO_PASSWORD = "rinjani123";
const DEMO_SESSION_KEY = "seven-summit-rinjani-demo-session";

type LoginErrors = {
  password?: TranslationKey;
  username?: TranslationKey;
  policy?: TranslationKey;
};

export function LoginPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [formError, setFormError] = useState<TranslationKey | "">("");
  const [socialNotice, setSocialNotice] = useState<SocialProvider | "">("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: LoginErrors = {};

    if (!username.trim()) nextErrors.username = "auth.login.error.username";
    if (!password) nextErrors.password = "auth.login.error.password";
    if (!policyAccepted) nextErrors.policy = "auth.policy.required";

    setErrors(nextErrors);
    setFormError("");

    if (Object.keys(nextErrors).length > 0) return;

    if (username !== DEMO_USERNAME || password !== DEMO_PASSWORD) {
      setFormError("auth.login.error.credentials");
      return;
    }

    try {
      sessionStorage.setItem(
        DEMO_SESSION_KEY,
        JSON.stringify({ username: DEMO_USERNAME, loggedInAt: new Date().toISOString() }),
      );
    } catch {
      // The landing page remains public if session storage is unavailable.
    }

    navigate("/home");
  };

  const handleSocialSelect = (provider: SocialProvider) => {
    setSocialNotice(provider);
  };

  return (
    <AuthLayout title={t("auth.login.title")}>
      <div className="auth-topline">
        <p className="auth-eyebrow">Seven Summit Rinjani</p>
        <AuthLanguageToggle />
      </div>
      <h1 className="auth-heading">{t("auth.login.submit")}</h1>
      <p className="auth-intro">{t("auth.login.intro")}</p>

      <div className="auth-demo-note">
        {t("auth.demo.credentials")}: <strong>visitor</strong> / <strong>rinjani123</strong>
      </div>

      <form className="auth-form" noValidate onSubmit={handleSubmit}>
        <div className="auth-field-group">
          <div className={`auth-field ${errors.username ? "auth-field-invalid" : ""}`}>
              <label className="sr-only" htmlFor="username">{t("auth.username")}</label>
            <AuthFieldIcon kind="username" />
            <input
              aria-describedby={errors.username ? "username-error" : undefined}
              aria-invalid={Boolean(errors.username)}
              autoComplete="username"
              className="auth-input"
              id="username"
              onChange={(event) => setUsername(event.target.value)}
              placeholder={t("auth.username")}
              type="text"
              value={username}
            />
          </div>
          {errors.username ? <p className="auth-error" id="username-error">{t(errors.username)}</p> : null}
        </div>

        <div className="auth-field-group">
          <div className={`auth-field ${errors.password ? "auth-field-invalid" : ""}`}>
              <label className="sr-only" htmlFor="password">{t("auth.password")}</label>
            <AuthFieldIcon kind="password" />
            <input
              aria-describedby={errors.password ? "password-error" : undefined}
              aria-invalid={Boolean(errors.password)}
              autoComplete="current-password"
              className="auth-input"
              id="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder={t("auth.password")}
              type={passwordVisible ? "text" : "password"}
              value={password}
            />
            <PasswordVisibilityButton onToggle={() => setPasswordVisible((visible) => !visible)} visible={passwordVisible} />
          </div>
          {errors.password ? <p className="auth-error" id="password-error">{t(errors.password)}</p> : null}
        </div>

        <label className="auth-policy">
          <input checked={policyAccepted} id="login-policy" onChange={(event) => setPolicyAccepted(event.target.checked)} type="checkbox" />
          <span className="auth-policy-copy"><label htmlFor="login-policy">{t("auth.policy")}</label> <AuthPolicyDialog />.</span>
        </label>
        {errors.policy ? <p className="auth-policy-error">{t(errors.policy)}</p> : null}

        {formError ? <p aria-live="polite" className="auth-form-error">{t(formError)}</p> : null}

        <button className="auth-submit" type="submit">{t("auth.login.submit")}</button>
      </form>

      <SocialAuthOptions onSelect={handleSocialSelect} />
      {socialNotice ? <p aria-live="polite" className="auth-social-notice">{socialNotice} {t("auth.login.social")}</p> : null}

      <p className="auth-switch-prompt">{t("auth.login.switch")} <Link to="/signup">{t("auth.signup.submit")}</Link></p>
      <Link className="auth-public-link" to="/">{t("auth.back")}</Link>
    </AuthLayout>
  );
}
