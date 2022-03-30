import { createTheme } from "@mui/material"

export const MuiThemeService = new class MuiThemeService {
  drawerWidth: number = 240;

  constructor() { }

  default() {
    let theme = createTheme({
      palette: {
        primary: {
          main: '#ed1c26',
          light: '#ff6363',
          dark: '#b30000',
        },
      },
    });

    theme = {
      ...theme,
      components: {}
    };

    return theme;
  }
}