type AuthFieldIconProps = {
  kind: "email" | "password" | "username";
};

export function AuthFieldIcon({ kind }: AuthFieldIconProps) {
  if (kind === "email") {
    return (
      <svg aria-hidden="true" className="auth-field-icon" fill="none" viewBox="0 0 24 24">
        <rect height="14" rx="2.5" stroke="currentColor" strokeWidth="1.7" width="18" x="3" y="5" />
        <path d="m4 7 8 6 8-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
      </svg>
    );
  }

  if (kind === "password") {
    return (
      <svg aria-hidden="true" className="auth-field-icon" fill="none" viewBox="0 0 24 24">
        <rect height="10" rx="2" stroke="currentColor" strokeWidth="1.7" width="15" x="4.5" y="10" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="auth-field-icon" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5.5 20c.7-3.3 2.9-5 6.5-5s5.8 1.7 6.5 5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </svg>
  );
}

type PasswordVisibilityButtonProps = {
  visible: boolean;
  onToggle: () => void;
};

export function PasswordVisibilityButton({ visible, onToggle }: PasswordVisibilityButtonProps) {
  return (
    <button
      aria-label={visible ? "Sembunyikan password" : "Tampilkan password"}
      aria-pressed={visible}
      className="auth-password-toggle"
      onClick={onToggle}
      type="button"
    >
      <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
        {visible ? (
          <>
            <path d="M2.5 12s3.3-6 9.5-6 9.5 6 9.5 6-3.3 6-9.5 6-9.5-6-9.5-6Z" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.6" />
          </>
        ) : (
          <>
            <path d="M3 4.5 21 19.5M10.6 6.2c.5-.1.9-.2 1.4-.2 6.2 0 9.5 6 9.5 6a16 16 0 0 1-3.2 3.8M6.1 7.1C3.8 8.7 2.5 12 2.5 12s3.3 6 9.5 6c1 0 1.9-.2 2.7-.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
            <path d="M10.2 10.5a2.7 2.7 0 0 0 3.4 3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
          </>
        )}
      </svg>
    </button>
  );
}
