export const SPORTS_CATEGORIES = [
  'soccer',
  'basketball',
  'baseball',
  'swimming',
  'gymnastics',
  'tennis',
  'football',
  'track-and-field',
  'volleyball',
  'martial-arts',
] as const;

export type SportCategory = (typeof SPORTS_CATEGORIES)[number];

export const CATEGORY_DISPLAY_NAMES: Record<SportCategory, string> = {
  soccer: 'Soccer',
  basketball: 'Basketball',
  baseball: 'Baseball',
  swimming: 'Swimming',
  gymnastics: 'Gymnastics',
  tennis: 'Tennis',
  football: 'Football',
  'track-and-field': 'Track & Field',
  volleyball: 'Volleyball',
  'martial-arts': 'Martial Arts',
};

export function getNextCategory(lastCategory: string | null): SportCategory {
  if (!lastCategory) return SPORTS_CATEGORIES[0];
  const index = SPORTS_CATEGORIES.indexOf(lastCategory as SportCategory);
  if (index === -1) return SPORTS_CATEGORIES[0];
  return SPORTS_CATEGORIES[(index + 1) % SPORTS_CATEGORIES.length];
}
