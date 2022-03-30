import React from 'react'
import { Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DrawerStyle from '../styles/DrawerStyle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TemplateDefaultContext from '../stores/TemplateDefault.context';

const NavigatorDefault: React.FC = (props) => {

  const templateDefaultContext = React.useContext(TemplateDefaultContext);
  const {isOpen, toggleDrawer} = templateDefaultContext;

  const getListMenuItems = (): {url: string, title: string, icon: any}[] => {
    return [
      {title: "Read Excel", url: "/read-excel", icon: <DashboardIcon />}
    ];
  }

  return <DrawerStyle variant="permanent" open={isOpen}>
    <Toolbar
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
      }}
    >
      <IconButton onClick={toggleDrawer}>
        <ChevronLeftIcon />
      </IconButton>
    </Toolbar>
    <Divider />
    <List component="nav">
      {getListMenuItems().map(item => <ListItemButton>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.title} />
      </ListItemButton>)}
      <Divider sx={{ my: 1 }} />
      {/* {secondaryListItems} */}
    </List>
  </DrawerStyle>
}

export default NavigatorDefault;