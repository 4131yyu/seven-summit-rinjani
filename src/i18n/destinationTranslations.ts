import type { Destination } from "../types/destination";
import type { Language } from "./translations";

const englishDestinationCopy: Record<string, Partial<Pick<Destination, "shortDescription" | "estimatedDuration" | "estimatedDurationLabel" | "difficulty" | "location" | "mountainType" | "temperature">>> = {
  "gunung-rinjani": {
    shortDescription: "An active stratovolcano with a vast caldera measuring approximately 6 × 8.5 km.",
    estimatedDuration: "At least 2 days for hikes to Pelawangan, Segara Anak Lake, and the Rinjani summit.",
    estimatedDurationLabel: "Min. 2 days · TNGR trekking routes",
    difficulty: "Extreme (demo label as requested by the project owner)",
    location: "Spans East Lombok, Central Lombok, and North Lombok Regencies, West Nusa Tenggara.",
    mountainType: "An active stratovolcano with a vast caldera measuring approximately 6 × 8.5 km.",
    temperature: "Ranges from 10°C to 20°C at campsites and may drop to around 0°C–5°C at the summit before dawn.",
  },
  "bukit-sempana": {
    shortDescription: "A long trail with steep terrain and an exposed ridge.",
    estimatedDuration: "About 4 to 6 hours uphill at a normal hiking pace (or 2 days and 1 night when camping).",
    estimatedDurationLabel: "4–6 hours uphill · 2D1N camping",
    difficulty: "Moderate to challenging (long trail with steep terrain and an exposed ridge).",
    location: "Sembalun Bumbung Village, Sembalun District, East Lombok Regency.",
  },
  "bukit-gedong": {
    shortDescription: "A relatively short trail with steep climbs that can be physically demanding.",
    estimatedDuration: "About 2 to 3 hours uphill, with a normal round trip taking approximately 4 to 5 hours.",
    estimatedDurationLabel: "2–3 hours uphill · 4–5 hours round trip",
    difficulty: "Moderate (shorter than Rinjani or Sempana, but with demanding steep climbs).",
    location: "Sembalun Bumbung Village, Sembalun District, East Lombok Regency.",
  },
  "bukit-kondo": {
    shortDescription: "A gentle trek with a relatively gradual incline compared with nearby hills.",
    estimatedDuration: "About 2 to 3 hours at a relaxed pace from the starting point to the summit.",
    estimatedDurationLabel: "2–3 hours uphill",
    difficulty: "Easy to moderate (gentle trekking with a relatively gradual incline).",
    location: "Sembalun area, Sembalun District, East Lombok Regency.",
  },
  "bukit-anak-dara": {
    shortDescription: "A relatively short route with steep climbs from the start to near the summit.",
    estimatedDuration: "About 2.5 to 4 hours uphill at a normal hiking pace.",
    estimatedDurationLabel: "2.5–4 hours uphill",
    difficulty: "Moderate (relatively short, but dominated by steep climbs almost to the summit).",
    location: "Sembalun Lawang Village, Sembalun District, East Lombok Regency.",
  },
  "bukit-pergangsingan": {
    shortDescription: "A relatively short, maintained trail with a steep climb near the beginning.",
    estimatedDuration: "About 2 to 3 hours at a relaxed pace to reach the summit.",
    estimatedDurationLabel: "2–3 hours uphill",
    difficulty: "Easy to moderate (a relatively short, maintained trail with a steep initial climb).",
    location: "Sembalun Lawang Village, Sembalun District, East Lombok Regency.",
  },
  "bukit-bao-daya": {
    shortDescription: "The lowest point among the seven summits of Sembalun Seven Summits.",
    estimatedDuration: "About 1.5 to 3 hours uphill, or around 4 to 6 hours for a relaxed round trip.",
    estimatedDurationLabel: "1.5–3 hours uphill · 4–6 hours round trip",
    difficulty: "Easy to moderate; a beginner-friendly option compared with the old Bao Ritip route and other high hills in Sembalun.",
    location: "Access via the Sembalun Bumbung Village field, on the route toward Bukit Nanggi, Sembalun District, East Lombok Regency; the main post is at BAO DAYA S7S.",
  },
};

const englishAltitudes: Record<string, string> = {
  "gunung-rinjani": "3,726 m a.s.l. (Dewi Anjani Summit)",
  "bukit-sempana": "Approx. 2,329 m a.s.l.",
  "bukit-gedong": "Approx. 2,200 m a.s.l. (trailhead at around 1,500 m)",
  "bukit-kondo": "Approx. 1,934–1,937 m a.s.l.",
  "bukit-anak-dara": "Approx. 1,923 m a.s.l.",
  "bukit-pergangsingan": "Approx. 1,670–1,700 m a.s.l. (about 500–600 m above Sembalun Valley)",
  "bukit-bao-daya": "Approx. 1,600 m a.s.l.",
};

export function localizeDestination(destination: Destination, language: Language): Destination {
  if (language === "ID") return destination;
  return { ...destination, altitude: englishAltitudes[destination.slug] ?? destination.altitude, ...englishDestinationCopy[destination.slug] };
}
