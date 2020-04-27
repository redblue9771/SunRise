import Loading from './LoadingSVG';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import React from 'react';
import { useSnackbar } from 'notistack';

export default () => {
  const history = useHistory();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    history.replace('/auth/login', {
      from: {
        pathname: location.pathname,
        state: location.state
      }
    });
    enqueueSnackbar('身份无效！请登录！', {
      variant: 'warning'
    });
  }, []);

  return <Loading />;
};
