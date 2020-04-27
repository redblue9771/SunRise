// Material components
// Shared layouts
import React, { Suspense } from 'react';
// Custom components
import { AccountDetails } from './components';
import { Grid } from '@material-ui/core';
import Loading from 'components/LoadingSVG';

const AccountPage: React.FC<{}> = () => {
  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Suspense fallback={<Loading />}>
          <AccountDetails />
        </Suspense>
      </Grid>
    </Grid>
  );
};

export default AccountPage;
