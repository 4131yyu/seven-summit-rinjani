import type { LandingDestination } from "../../types/landing";

type DestinationSelectorProps = {
  activeDestinationId: string;
  destinations: LandingDestination[];
  onSelect: (destinationId: string) => void;
};

export function DestinationSelector({
  activeDestinationId,
  destinations,
  onSelect,
}: DestinationSelectorProps) {
  return (
    <div className="border-t border-white/25 pt-4 sm:pt-5">
      <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-white/70 uppercase">Pilih visual destinasi</p>
      <div
        aria-label="Pilih visual destinasi"
        className="scrollbar-hidden flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2"
      >
        {destinations.map((destination) => {
          const isActive = destination.id === activeDestinationId;

          return (
            <button
              aria-pressed={isActive}
              className={`min-h-11 shrink-0 snap-start rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                isActive
                  ? "border-white bg-white text-forest"
                  : "border-white/30 bg-charcoal/20 text-white hover:bg-white/15"
              }`}
              key={destination.id}
              onClick={() => onSelect(destination.id)}
              type="button"
            >
              {destination.selectorLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}
