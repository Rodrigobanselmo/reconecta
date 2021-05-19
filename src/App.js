import React from 'react';
import { ThemeProvider } from 'styled-components';
import themeColor from './styles/colors.js';
import { ThemeProvider as MuiThemeProvider,createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoaderProvider from './context/LoaderContext';
import NotificationProvider from './context/NotificationContext';
import { RouteComponent, routes } from './routes';
import { GlobalStyle } from './styles/global';

const ThemeColor = createMuiTheme(themeColor);

export const App = () => (
  <MuiThemeProvider theme={ThemeColor}>
    <ThemeProvider theme={ThemeColor}>
      <NotificationProvider>
        <LoaderProvider>
          <Router>
            <Switch>
              {routes.map((route) => (
                <RouteComponent key={route.path} {...route} />
              ))}
            </Switch>
          </Router>
          <h1>Hello i</h1>
          <GlobalStyle />
        </LoaderProvider>
      </NotificationProvider>
    </ThemeProvider>
  </MuiThemeProvider>
);
