import { Box, Container, createTheme, CssBaseline, ThemeProvider, Toolbar } from '@mui/material';
import React from 'react'
import Copyright from './components/Copyright';
import HeaderDefault from './components/HeaderDefault';
import NavigatorDefault from './components/NavigatorDefault';
import { TemplateDefaultContextProvider } from './stores/TemplateDefault.context';

const mdTheme = createTheme()

const TemplateDefault: React.FC = (props) => {
  return <TemplateDefaultContextProvider>
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <HeaderDefault />
        <NavigatorDefault />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {props.children}
          </Container>
          <Copyright />
        </Box>
      </Box>
    </ThemeProvider>
  </TemplateDefaultContextProvider>
}

export default TemplateDefault;