// Material helpers
import {
  Avatar,
  Box,
  Button,
  makeStyles,
  TextField,
  InputAdornment,
  Grid
} from '@material-ui/core';
// Shared components
import {
  Portlet,
  PortletContent,
  PortletFooter,
  PortletHeader,
  PortletLabel
} from 'components';
import { EmailRule } from 'helpers';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { StorageImage, useAuth, useStorage, useUser } from 'reactfire';

const useStyles = makeStyles((theme) => ({
  field: {
    margin: theme.spacing(3)
  },
  textField: {
    width: '420px',
    maxWidth: '100%',
    marginRight: theme.spacing(3)
  },
  portletFooter: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  avatar: {
    marginLeft: 'auto',
    height: '110px',
    width: '110px',
    flexShrink: 0,
    flexGrow: 0,
    fontSize: 92,
    backgroundColor: '#EB4537'
  }
}));

interface IProps {
  className?: string;
  [propname: string]: any;
}

export const SettingPage: React.FC<IProps> = ({ className }) => {
  const auth = useAuth();
  const user: any = useUser();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async () => {
    try {
      await auth.sendPasswordResetEmail(user?.email);
      enqueueSnackbar('邮件发送成功!', {
        variant: 'success'
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar('邮件发送失败！请重试', {
        variant: 'error'
      });
    }

    // auth.currentUser?.updatePhoneNumber(formValues.phoneNumber)
  };

  return (
    <Grid container>
      <Grid item md={6} xs={12}>
        <Portlet className={className || ''}>
          <PortletHeader>
            <PortletLabel title="安全设置" />
          </PortletHeader>
          <PortletContent>
            <Button
              color="primary"
              variant="contained"
              disableElevation
              onClick={handleSubmit}>
              发送重置密码邮件
            </Button>
          </PortletContent>
        </Portlet>
      </Grid>
    </Grid>
  );
};
