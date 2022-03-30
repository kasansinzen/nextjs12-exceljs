import {styled } from '@mui/material';
import AppBar, { AppBarProps } from "@mui/material/AppBar";
import { MuiThemeService } from '../services/mui-theme.service';

const AppBarStyle = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps<any>>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: MuiThemeService.drawerWidth,
    width: `calc(100% - ${MuiThemeService.drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default AppBarStyle;