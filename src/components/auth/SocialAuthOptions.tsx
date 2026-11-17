export type SocialProvider = "Google" | "Facebook" | "TikTok";

type SocialAuthOptionsProps = {
  onSelect: (provider: SocialProvider) => void;
};

const providers: SocialProvider[] = ["Google", "Facebook", "TikTok"];

export function SocialAuthOptions({ onSelect }: SocialAuthOptionsProps) {
  return (
    <div className="auth-social-options" aria-label="Opsi akun demo lainnya">
      <p>Atau lanjutkan dengan</p>
      <div>
        {providers.map((provider) => (
          <button key={provider} onClick={() => onSelect(provider)} type="button">
            <span aria-hidden="true" className={`auth-provider-mark auth-provider-${provider.toLowerCase()}`}>
              {provider === "Google" ? "G" : provider === "Facebook" ? "f" : "♪"}
            </span>
            <span>{provider}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
