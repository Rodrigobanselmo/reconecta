import React from 'react';
import { ThemeProvider } from 'styled-components';
import themeColor from './styles/colors.js';
import { ThemeProvider as MuiThemeProvider,createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoaderProvider from './context/LoaderContext';
import NotificationProvider from './context/NotificationContext';
import { RouteComponent, routes } from './routes';
import { GlobalStyle } from './styles/global';
import { AuthProvider } from './context/AuthContext.js';
import { LoaderContext } from './context/LoadDashContext';

const ThemeColor = createMuiTheme(themeColor);

export const App = () => (
  <MuiThemeProvider theme={ThemeColor}>
    <ThemeProvider theme={ThemeColor}>
      <LoaderContext>
        <NotificationProvider>
          <LoaderProvider>
            <Router>
              <AuthProvider>
                  <Switch>
                    {routes.map((route) => (
                      <RouteComponent key={route.path} {...route} />
                    ))}
                  </Switch>
              </AuthProvider>
            </Router>
            <GlobalStyle />
          </LoaderProvider>
        </NotificationProvider>
      </LoaderContext>
    </ThemeProvider>
  </MuiThemeProvider>
);
