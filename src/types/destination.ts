export type Destination = {
  id: string;
  slug: string;
  name: string;
  selectorLabel: string;
  shortDescription: string;
  altitude: string;
  location: string;
  backgroundImage: string;
  cardImage: string;
  previewVideo?: string;
  videoPoster?: string;
  mountainType?: string;
  temperature?: string;
  estimatedDuration?: string;
  estimatedDurationLabel?: string;
  difficulty?: string;
  internalNote?: string;
};
