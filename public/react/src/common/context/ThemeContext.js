import React from 'react'

export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
    foreground_select: '#4CACFF',
    foreground_orange1: '#FF6800',
    foreground_tip: '#333',

  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

export const ThemeContext = React.createContext(
  themes.light // default value
);
