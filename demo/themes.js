import wyboTheme from 'reapop-theme-wybo';
import bootstrapTheme from 'reapop-theme-bootstrap';

export const DEFAULT_THEME = 'wybo';

export const THEMES = {
  wybo: {
    label: 'Wybo',
    theme: wyboTheme
  },
  bootstrap: {
    label: 'Bootstrap',
    theme: bootstrapTheme
  }
};
