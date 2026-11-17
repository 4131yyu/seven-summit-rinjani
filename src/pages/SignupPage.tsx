import { type FormEvent, useState } from "react";
import { Link } from "react-router";

import { AuthLayout } from "../components/auth/AuthLayout";
import { AuthFieldIcon, PasswordVisibilityButton } from "../components/auth/AuthFieldIcon";
import { SocialAuthOptions, type SocialProvider } from "../components/auth/SocialAuthOptions";

type SignupErrors = {
  email?: string;
  password?: string;
  policy?: string;
};

export function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [errors, setErrors] = useState<SignupErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [socialNotice, setSocialNotice] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: SignupErrors = {};

    if (!email.trim()) nextErrors.email = "Email perlu diisi.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "Masukkan format email yang valid.";
    if (!password) nextErrors.password = "Password perlu diisi.";
    if (!policyAccepted) nextErrors.policy = "Persetujuan kebijakan diperlukan untuk melanjutkan.";

    setErrors(nextErrors);
    setSubmitted(false);
    if (Object.keys(nextErrors).length === 0) setSubmitted(true);
  };

  const handleSocialSelect = (provider: SocialProvider) => {
    setSocialNotice(`${provider} signup belum terhubung. Ini hanya opsi demonstrasi.`);
  };

  return (
    <AuthLayout title="Buat akun">
      <p className="auth-eyebrow">Seven Summit Rinjani</p>
      <h1 className="auth-heading">SIGN UP</h1>
      <p className="auth-intro">Buat akun demo untuk memulai.</p>

      {submitted ? (
        <p aria-live="polite" className="auth-success">
          Form pendaftaran demo berhasil diisi. Belum ada akun yang disimpan karena layanan akun belum terhubung.
        </p>
      ) : null}

      <form className="auth-form" noValidate onSubmit={handleSubmit}>
        <div className="auth-field-group">
          <div className={`auth-field ${errors.email ? "auth-field-invalid" : ""}`}>
            <label className="sr-only" htmlFor="signup-email">Email</label>
            <AuthFieldIcon kind="email" />
            <input
              aria-describedby={errors.email ? "signup-email-error" : undefined}
              aria-invalid={Boolean(errors.email)}
              autoComplete="email"
              className="auth-input"
              id="signup-email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              type="email"
              value={email}
            />
          </div>
          {errors.email ? <p className="auth-error" id="signup-email-error">{errors.email}</p> : null}
        </div>

        <div className="auth-field-group">
          <div className={`auth-field ${errors.password ? "auth-field-invalid" : ""}`}>
            <label className="sr-only" htmlFor="signup-password">Password</label>
            <AuthFieldIcon kind="password" />
            <input
              aria-describedby={errors.password ? "signup-password-error" : undefined}
              aria-invalid={Boolean(errors.password)}
              autoComplete="new-password"
              className="auth-input"
              id="signup-password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              type={passwordVisible ? "text" : "password"}
              value={password}
            />
            <PasswordVisibilityButton onToggle={() => setPasswordVisible((visible) => !visible)} visible={passwordVisible} />
          </div>
          {errors.password ? <p className="auth-error" id="signup-password-error">{errors.password}</p> : null}
        </div>

        <label className="auth-policy">
          <input checked={policyAccepted} onChange={(event) => setPolicyAccepted(event.target.checked)} type="checkbox" />
          <span>Saya menyetujui <a href="#signup-policy-info">kebijakan privasi dan ketentuan penggunaan</a>.</span>
        </label>
        {errors.policy ? <p className="auth-policy-error">{errors.policy}</p> : null}

        <button className="auth-submit" type="submit">Sign Up</button>
      </form>

      <SocialAuthOptions onSelect={handleSocialSelect} />
      {socialNotice ? <p aria-live="polite" className="auth-social-notice">{socialNotice}</p> : null}

      <p className="auth-switch-prompt">Sudah memiliki akun? <Link to="/login">Login</Link></p>
      <span className="sr-only" id="signup-policy-info">Kebijakan dan ketentuan ini hanya persetujuan antarmuka demo, bukan kontrak layanan.</span>
    </AuthLayout>
  );
}
