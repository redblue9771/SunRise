// Material helpers
import { LinearProgress, ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import NotFound from 'views/NotFound';
// Views
import { AuthPage, Dashboard } from './layouts';
// Theme
import theme from './styles';
// Styles
import './styles/index.css';
import UnderDevelopment from './views/UnderDevelopment';

const App: React.FC<{}> = () => {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<LinearProgress />}>
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={2000}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}>
          <Router>
            <Switch>
              <Redirect exact from="/" to="/dashboard/home" />
              <Route
                component={UnderDevelopment}
                exact
                path="/under-development"
              />
              <Route component={AuthPage} path="/auth" />
              <Route component={Dashboard} path="/dashboard" />
              <Route component={NotFound} exact path="/404" />
              <Redirect to="/404" />
            </Switch>
          </Router>
        </SnackbarProvider>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
