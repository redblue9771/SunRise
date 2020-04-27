// Material helpers
import {
  Avatar,
  Box,
  Button,
  makeStyles,
  TextField,
  InputAdornment
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

interface IForm {
  displayName: string;
  email: string;
}

export const AccountDetails: React.FC<IProps> = ({ className }) => {
  const classes = useStyles();

  const auth = useAuth();
  const user: any = useUser();
  const storage = useStorage();
  const { enqueueSnackbar } = useSnackbar();
  const [formValues, setFormValues] = useState<IForm>({
    displayName: user?.displayName ?? '',
    email: user?.email ?? ''
  });

  const handleChange = (type: string) => (e: any) => {
    setFormValues({
      ...formValues,
      [type]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      await auth.currentUser?.updateProfile({
        displayName: formValues.displayName
      });
      // await auth.currentUser?.updateEmail(formValues.email);
      enqueueSnackbar('资料更新成功!', {
        variant: 'success'
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar('资料更新失败!请重试', {
        variant: 'error'
      });
    }

    // auth.currentUser?.updatePhoneNumber(formValues.phoneNumber)
  };

  const handleUpload = async (e: any) => {
    if (e.target?.files?.length === 0) {
      return;
    }
    const image = e.target?.files?.[0] ?? e.dataTransfer?.files?.[0];
    if (image && image.name) {
      const temp = image.name.match(/\.[^\.]+$/);

      try {
        const ref = storage
          .ref()
          .child(`images/${new Date().getTime()}${temp?.[0]}`);
        const { ref: imgRef } = await ref.put(image);

        await auth.currentUser?.updateProfile({
          photoURL: `images/${imgRef.name}`
        });
        enqueueSnackbar('更新成功！', {
          variant: 'success'
        });
      } catch (error) {
        console.log(error);
        enqueueSnackbar('更新失败！', {
          variant: 'error'
        });
      }
    }
  };
  return (
    <Portlet className={className || ''}>
      <PortletHeader>
        <PortletLabel title="个人资料" />
      </PortletHeader>
      <PortletContent noPadding>
        <Box className={classes.field} margin="0 auto">
          <input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            hidden
            onChange={handleUpload}
          />
          <label htmlFor="contained-button-file">
            <Button disableElevation component="span">
              <Avatar className={classes.avatar}>
                {user?.photoURL && <StorageImage storagePath={user.photoURL} />}
              </Avatar>
            </Button>
          </label>
        </Box>

        <form autoComplete="off" noValidate>
          <div className={classes.field}>
            <TextField
              className={classes.textField}
              label="邮箱地址"
              type="email"
              required
              size="small"
              disabled
              value={formValues.email}
              variant="outlined"
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              className={classes.textField}
              label="用户名"
              required
              size="small"
              value={formValues.displayName}
              variant="outlined"
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      color="primary"
                      variant="text"
                      disableElevation
                      disabled={!formValues.displayName}
                      onClick={handleSubmit}>
                      保 存
                    </Button>
                  </InputAdornment>
                )
              }}
              onChange={handleChange('displayName')}
            />

            {/* <TextField
              className={classes.textField}
              label="电话号码"
              type="string"
              value={formValues.phoneNumber}
              variant="outlined"
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              error={
                !formValues.phoneNumber.match(/^(?:(?:\+|00)86)?1[3-9]\d{9}$/)
              }
              onChange={handleChange('phone')}
            /> */}
          </div>
        </form>
      </PortletContent>
    </Portlet>
  );
};

// export default AccountDetails;
