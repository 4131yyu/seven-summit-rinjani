import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";

const DEMO_USERNAME = "visitor";
const DEMO_PASSWORD = "rinjani123";
const DEMO_SESSION_KEY = "seven-summit-rinjani-demo-session";

type LoginErrors = {
  password?: string;
  username?: string;
};

export function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [formError, setFormError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: LoginErrors = {};

    if (!username.trim()) nextErrors.username = "Username perlu diisi.";
    if (!password) nextErrors.password = "Kata sandi perlu diisi.";

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

    navigate("/");
  };

  return (
    <section className="relative isolate flex min-h-[calc(100svh-73px)] items-center overflow-hidden bg-forest px-5 py-12 sm:px-8 lg:px-12">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgb(200_121_88_/_35%),transparent_28rem),radial-gradient(circle_at_85%_85%,rgb(244_240_231_/_14%),transparent_26rem)]" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1fr_minmax(22rem,28rem)] lg:gap-16">
        <div className="max-w-xl text-white">
          <p className="text-sm font-semibold tracking-[0.2em] text-cream/75 uppercase">Seven Summit Rinjani</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Masuk untuk melanjutkan pengalaman demo.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-cream/80 sm:text-lg">
            Akses ini bersifat opsional. Anda tetap dapat menjelajahi halaman publik tanpa masuk.
          </p>
        </div>

        <div className="rounded-3xl border border-white/25 bg-charcoal/45 p-6 text-white shadow-2xl backdrop-blur-md sm:p-8">
          <p className="text-sm font-semibold tracking-[0.18em] text-terracotta uppercase">Akun demonstrasi</p>
          <h2 className="mt-3 font-display text-3xl font-semibold">Masuk</h2>
          <p className="mt-3 text-sm leading-6 text-cream/80">
            Gunakan <strong>visitor</strong> dan <strong>rinjani123</strong>. Tidak ada akun atau
            pembayaran nyata pada demo ini.
          </p>

          <form className="mt-7 space-y-5" noValidate onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-semibold" htmlFor="username">
                Username
              </label>
              <input
                aria-describedby={errors.username ? "username-error" : undefined}
                aria-invalid={Boolean(errors.username)}
                autoComplete="username"
                className="mt-2 min-h-12 w-full rounded-xl border border-white/30 bg-white/10 px-4 text-white outline-none placeholder:text-cream/55 focus:border-terracotta focus:ring-2 focus:ring-terracotta/50"
                id="username"
                onChange={(event) => setUsername(event.target.value)}
                placeholder="visitor"
                type="text"
                value={username}
              />
              {errors.username ? <p className="mt-2 text-sm text-orange-200" id="username-error">{errors.username}</p> : null}
            </div>

            <div>
              <label className="text-sm font-semibold" htmlFor="password">
                Kata sandi
              </label>
              <input
                aria-describedby={errors.password ? "password-error" : undefined}
                aria-invalid={Boolean(errors.password)}
                autoComplete="current-password"
                className="mt-2 min-h-12 w-full rounded-xl border border-white/30 bg-white/10 px-4 text-white outline-none placeholder:text-cream/55 focus:border-terracotta focus:ring-2 focus:ring-terracotta/50"
                id="password"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Masukkan kata sandi demo"
                type="password"
                value={password}
              />
              {errors.password ? <p className="mt-2 text-sm text-orange-200" id="password-error">{errors.password}</p> : null}
            </div>

            {formError ? <p aria-live="polite" className="rounded-xl border border-orange-200/40 bg-orange-100/10 px-4 py-3 text-sm text-orange-100">{formError}</p> : null}

            <button className="min-h-12 w-full rounded-xl bg-terracotta px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#af684c] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white" type="submit">
              Masuk ke demo
            </button>
          </form>

          <Link className="mt-6 inline-flex rounded-lg text-sm font-semibold text-cream underline decoration-terracotta underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" to="/">
            Kembali menjelajah tanpa masuk
          </Link>
        </div>
      </div>
    </section>
  );
}
