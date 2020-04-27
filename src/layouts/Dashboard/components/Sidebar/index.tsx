// Material components
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core';
// Material icons
import {
  AccountBoxOutlined as AccountBoxIcon,
  DashboardOutlined as DashboardIcon,
  InfoOutlined as InfoIcon,
  SettingsOutlined as SettingsIcon
} from '@material-ui/icons';
import RouterIcon from '@material-ui/icons/Router';
// Externals
import classNames from 'classnames';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
// Component styles
import useStyles from './useStyles';
import { useUser, StorageImage } from 'reactfire';

type Props = {
  className?: string;
};

const Sidebar: React.FC<Props> = ({ className }) => {
  const classes = useStyles();
  const rootClassName = classNames(classes.root, className);
  const user: any = useUser();

  return (
    <nav className={rootClassName}>
      <div className={classes.logoWrapper}>
        <Typography variant="h4">物联网数据监控系统</Typography>
      </div>
      <Divider className={classes.logoDivider} />
      <div className={classes.profile}>
        <Link to="/dashboard/account">
          <Avatar alt={user?.displayName ?? ''} className={classes.avatar}>
            {user?.photoURL && <StorageImage storagePath={user?.photoURL} />}
          </Avatar>
        </Link>
        <Typography className={classes.nameText} variant="h6">
          {user?.displayName ?? ''}
        </Typography>
        <Typography className={classes.bioText} variant="caption">
          {user?.email ?? ''}
        </Typography>
      </div>
      <Divider className={classes.profileDivider} />
      <List component="div" disablePadding>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/dashboard/home">
          <ListItemIcon className={classes.listItemIcon}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="仪表板"
          />
        </ListItem>

        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/dashboard/devices">
          <ListItemIcon className={classes.listItemIcon}>
            <RouterIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="我的设备"
          />
        </ListItem>

        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/dashboard/account">
          <ListItemIcon className={classes.listItemIcon}>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="我的资料"
          />
        </ListItem>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/dashboard/settings">
          <ListItemIcon className={classes.listItemIcon}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="设置"
          />
        </ListItem>
      </List>
      <Divider className={classes.listDivider} />
      <List component="div" disablePadding>
        <ListItem className={classes.listItem}>
          <ListItemIcon className={classes.listItemIcon}>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="最近一次登录"
            secondary={new Date(
              user?.metadata?.lastSignInTime ?? ''
            ).toLocaleString()}
          />
        </ListItem>
      </List>
    </nav>
  );
};
export default Sidebar;
