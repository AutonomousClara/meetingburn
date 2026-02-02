export type Platform = 'teams' | 'meet' | 'zoom' | 'other';

export interface Theme {
  name: string;
  accent: string;
  accentHover: string;
  accentBg: string;
  icon: string;
}

export const themes: Record<Platform, Theme> = {
  teams: {
    name: 'Microsoft Teams',
    accent: '#6264A7',
    accentHover: '#7B7DC0',
    accentBg: 'rgba(98, 100, 167, 0.15)',
    icon: '🟣',
  },
  meet: {
    name: 'Google Meet',
    accent: '#00897B',
    accentHover: '#26A69A',
    accentBg: 'rgba(0, 137, 123, 0.15)',
    icon: '🟢',
  },
  zoom: {
    name: 'Zoom',
    accent: '#2D8CFF',
    accentHover: '#5BA3FF',
    accentBg: 'rgba(45, 140, 255, 0.15)',
    icon: '🔵',
  },
  other: {
    name: 'Outro',
    accent: '#A855F7',
    accentHover: '#C084FC',
    accentBg: 'rgba(168, 85, 247, 0.15)',
    icon: '🔥',
  },
};

export function getThemeStyles(platform: Platform) {
  const theme = themes[platform];
  return {
    '--accent': theme.accent,
    '--accent-hover': theme.accentHover,
    '--accent-bg': theme.accentBg,
  } as React.CSSProperties;
}
