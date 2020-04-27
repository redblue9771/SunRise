// Material helpers
import {
  Box,
  CircularProgress,
  Divider,
  Drawer,
  LinearProgress,
  makeStyles,
  useMediaQuery,
  useTheme
} from '@material-ui/core';
// Externals
import classNames from 'classnames';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { Route, useLocation, useHistory, Redirect } from 'react-router-dom';
import { AuthCheck, useFunctions, useFirestore } from 'reactfire';
import DataStreamPage from 'views/DataStream';
import DevicePage from 'views/Devices';
import HomePage from 'views/Home';
// Custom components
import { Footer, Sidebar, Topbar } from './components';
import AccountPage from 'views/Account';
import Loading from 'components/LoadingSVG';
import AuthRedirect from 'components/AuthRedirect';
import { SettingPage } from 'views/Setting/Setting';
import Test from 'views/Test';

const useStyles = makeStyles((theme) => ({
  topbar: {
    position: 'fixed',
    width: '100%',
    top: 0,
    left: 0,
    right: 'auto',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  topbarShift: {
    marginLeft: '271px',
    width: 'calc(-271px + 100vw)'
  },
  drawerPaper: {
    zIndex: 1200,
    width: '271px'
  },
  sidebar: {
    width: '270px'
  },
  content: {
    marginTop: '64px',
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    padding: theme.spacing(2),
    minHeight: 'calc(100vh - 64px)',
    display: 'flex',
    flexDirection: 'column'
  },
  contentShift: {
    marginLeft: '270px'
  },
  main: {
    flex: 1
  }
}));

type Props = {
  title: string;
};

const Dashboard: React.FC<Props> = ({ title }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isOpen, setIsOpen] = useState(!isMobile);
  const shift = useMemo(() => isOpen && !isMobile, [isOpen, isMobile]);
  const location = useLocation();

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location.pathname, isMobile]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleToggleOpen = () => {
    setIsOpen((prevState) => !prevState);
  };

  // useFunctions().useFunctionsEmulator('http://localhost:5001');

  return (
    <Suspense fallback={<Loading />}>
      <AuthCheck fallback={<AuthRedirect />}>
        <Topbar
          className={classNames(classes.topbar, {
            [classes.topbarShift]: shift
          })}
          isSidebarOpen={isOpen}
          onToggleSidebar={handleToggleOpen}
          title={title}
        />
        <Drawer
          anchor="left"
          classes={{ paper: classes.drawerPaper }}
          onClose={handleClose}
          open={isOpen}
          variant={isMobile ? 'temporary' : 'persistent'}>
          <Suspense fallback={<Loading />}>
            <Sidebar className={classes.sidebar} />
          </Suspense>
        </Drawer>
        <div
          className={classNames(classes.content, {
            [classes.contentShift]: shift
          })}>
          <Suspense fallback={<Loading />}>
            <main className={classes.main}>
              <Route exact component={HomePage} path="/dashboard/home" />
              <Route exact component={DevicePage} path="/dashboard/devices" />
              <Route exact component={AccountPage} path="/dashboard/account" />
              <Route exact component={SettingPage} path="/dashboard/settings" />
              <Route component={Test} exact path="/dashboard/test" />

              <Route
                exact
                component={DataStreamPage}
                path="/dashboard/devices/:device_id/data"
              />
              {/* <Redirect to="/dashboard/home" /> */}
            </main>

            <Box margin={theme.spacing(2, 0)}>
              <Divider />
            </Box>
            <Footer />
          </Suspense>
        </div>
      </AuthCheck>
    </Suspense>
  );
};

export default Dashboard;
