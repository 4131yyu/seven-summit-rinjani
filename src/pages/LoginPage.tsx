import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";

import { AuthLayout } from "../components/auth/AuthLayout";
import { AuthFieldIcon, PasswordVisibilityButton } from "../components/auth/AuthFieldIcon";
import { SocialAuthOptions, type SocialProvider } from "../components/auth/SocialAuthOptions";

const DEMO_USERNAME = "visitor";
const DEMO_PASSWORD = "rinjani123";
const DEMO_SESSION_KEY = "seven-summit-rinjani-demo-session";

type LoginErrors = {
  password?: string;
  username?: string;
  policy?: string;
};

export function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [formError, setFormError] = useState("");
  const [socialNotice, setSocialNotice] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: LoginErrors = {};

    if (!username.trim()) nextErrors.username = "Username perlu diisi.";
    if (!password) nextErrors.password = "Kata sandi perlu diisi.";
    if (!policyAccepted) nextErrors.policy = "Persetujuan kebijakan diperlukan untuk melanjutkan.";

    setErrors(nextErrors);
    setFormError("");

    if (Object.keys(nextErrors).length > 0) return;

    if (username !== DEMO_USERNAME || password !== DEMO_PASSWORD) {
      setFormError("Username atau kata sandi demo belum sesuai.");
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
    setSocialNotice(`${provider} login belum terhubung. Ini hanya opsi demonstrasi.`);
  };

  return (
    <AuthLayout title="Masuk ke akun">
      <p className="auth-eyebrow">Seven Summit Rinjani</p>
      <h1 className="auth-heading">LOG IN</h1>
      <p className="auth-intro">Masuk menggunakan akun demonstrasi untuk melanjutkan.</p>

      <div className="auth-demo-note">
        Demo: <strong>visitor</strong> / <strong>rinjani123</strong>
      </div>

      <form className="auth-form" noValidate onSubmit={handleSubmit}>
        <div className="auth-field-group">
          <div className={`auth-field ${errors.username ? "auth-field-invalid" : ""}`}>
            <label className="sr-only" htmlFor="username">Username</label>
            <AuthFieldIcon kind="username" />
            <input
              aria-describedby={errors.username ? "username-error" : undefined}
              aria-invalid={Boolean(errors.username)}
              autoComplete="username"
              className="auth-input"
              id="username"
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Username"
              type="text"
              value={username}
            />
          </div>
          {errors.username ? <p className="auth-error" id="username-error">{errors.username}</p> : null}
        </div>

        <div className="auth-field-group">
          <div className={`auth-field ${errors.password ? "auth-field-invalid" : ""}`}>
            <label className="sr-only" htmlFor="password">Password</label>
            <AuthFieldIcon kind="password" />
            <input
              aria-describedby={errors.password ? "password-error" : undefined}
              aria-invalid={Boolean(errors.password)}
              autoComplete="current-password"
              className="auth-input"
              id="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              type={passwordVisible ? "text" : "password"}
              value={password}
            />
            <PasswordVisibilityButton onToggle={() => setPasswordVisible((visible) => !visible)} visible={passwordVisible} />
          </div>
          {errors.password ? <p className="auth-error" id="password-error">{errors.password}</p> : null}
        </div>

        <label className="auth-policy">
          <input checked={policyAccepted} onChange={(event) => setPolicyAccepted(event.target.checked)} type="checkbox" />
          <span>Saya menyetujui <a href="#auth-policy-info">kebijakan privasi dan ketentuan penggunaan</a>.</span>
        </label>
        {errors.policy ? <p className="auth-policy-error">{errors.policy}</p> : null}

        {formError ? <p aria-live="polite" className="auth-form-error">{formError}</p> : null}

        <button className="auth-submit" type="submit">Log In</button>
      </form>

      <SocialAuthOptions onSelect={handleSocialSelect} />
      {socialNotice ? <p aria-live="polite" className="auth-social-notice">{socialNotice}</p> : null}

      <p className="auth-switch-prompt">Belum memiliki akun? <Link to="/signup">Sign up</Link></p>
      <Link className="auth-public-link" to="/">Kembali menjelajah tanpa masuk</Link>
      <span className="sr-only" id="auth-policy-info">Kebijakan dan ketentuan ini hanya persetujuan antarmuka demo, bukan kontrak layanan.</span>
    </AuthLayout>
  );
}
