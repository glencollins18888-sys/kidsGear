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

export const CATEGORY_ICONS: Record<SportCategory, string> = {
  soccer: '\u26BD',
  basketball: '\uD83C\uDFC0',
  baseball: '\u26BE',
  swimming: '\uD83C\uDFCA',
  gymnastics: '\uD83E\uDD38',
  tennis: '\uD83C\uDFBE',
  football: '\uD83C\uDFC8',
  'track-and-field': '\uD83C\uDFC3',
  volleyball: '\uD83C\uDFD0',
  'martial-arts': '\uD83E\uDD4B',
};

export const CATEGORY_COLORS: Record<SportCategory, [string, string]> = {
  soccer: ['#16a34a', '#059669'],
  basketball: ['#ea580c', '#dc2626'],
  baseball: ['#dc2626', '#991b1b'],
  swimming: ['#0284c7', '#0369a1'],
  gymnastics: ['#d946ef', '#a21caf'],
  tennis: ['#65a30d', '#4d7c0f'],
  football: ['#7c3aed', '#6d28d9'],
  'track-and-field': ['#f59e0b', '#d97706'],
  volleyball: ['#06b6d4', '#0891b2'],
  'martial-arts': ['#1f2937', '#374151'],
};

export function getNextCategory(lastCategory: string | null): SportCategory {
  if (!lastCategory) return SPORTS_CATEGORIES[0];
  const index = SPORTS_CATEGORIES.indexOf(lastCategory as SportCategory);
  if (index === -1) return SPORTS_CATEGORIES[0];
  return SPORTS_CATEGORIES[(index + 1) % SPORTS_CATEGORIES.length];
}
