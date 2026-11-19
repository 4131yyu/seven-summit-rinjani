import { Link } from "react-router";

import { assetPaths } from "../../config/assets";

export function BrandFooter() {
  return (
    <footer className="bg-charcoal px-6 py-8 text-white sm:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <Link aria-label="Seven Summit Rinjani, ke homepage" className="inline-flex w-fit rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" to="/home">
          <img alt="Seven Summit Rinjani" className="h-12 w-auto object-contain" src={assetPaths.logoLight} />
        </Link>
        <p className="text-xs text-white/60">© {new Date().getFullYear()} Seven Summit Rinjani · Demo</p>
      </div>
    </footer>
  );
}
