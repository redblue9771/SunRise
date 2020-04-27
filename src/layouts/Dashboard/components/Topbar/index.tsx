// Material components
import { IconButton, Toolbar, Typography } from '@material-ui/core';
// Material icons
import {
  Close as CloseIcon,
  Input as InputIcon,
  Menu as MenuIcon
} from '@material-ui/icons';
// Externals
import classNames from 'classnames';
import { Notif } from 'data/notifications';
import React, { Fragment } from 'react';
import { useHistory } from 'react-router';
// Component styles
import useStyles from './useStyles';
import { useAuth } from 'reactfire';

type Props = {
  title: string;
  className: string;
  isSidebarOpen: boolean;
  onToggleSidebar: any;
};

type State = {
  notifications: Notif[];
  notificationsLimit: number;
  notificationsCount: number;
  notificationsEl: any;
};
const Topbar: React.FC<Props> = ({
  className,
  title,
  isSidebarOpen,
  onToggleSidebar
}) => {
  const classes = useStyles();
  const rootClassName = classNames(classes.root, className);

  const history = useHistory();
  const auth = useAuth();

  const handleSignOut = async () => {
    try {
      localStorage.setItem('isAuthenticated', 'false');
      localStorage.clear();
      await auth.signOut();

      history.replace('/auth/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className={rootClassName}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            className={classes.menuButton}
            onClick={onToggleSidebar}
            // variant="text"
          >
            {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Typography className={classes.title} variant="h4">
            {title}
          </Typography>
          <IconButton
            className={classes.notificationsButton}
            onClick={handleSignOut}>
            <InputIcon />
          </IconButton>
        </Toolbar>
      </div>
    </Fragment>
  );
};

export default Topbar;
