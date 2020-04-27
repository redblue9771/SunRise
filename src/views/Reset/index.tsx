// Material helpers
import {
  Box,
  Button,
  Fade,
  makeStyles,
  TextField,
  useTheme
} from '@material-ui/core';
import { EmailRule, PwdRule } from 'helpers';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from 'reactfire';

const useStyles = makeStyles((theme) => ({
  person: {},
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100vh'
  },
  grid: {
    height: '100%'
  },
  quoteWrapper: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.common.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/sign_up_1.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.common.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.common.white
  },
  bio: {
    color: theme.palette.common.white
  },
  contentWrapper: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  backButton: {},
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: '100px',
    paddingRight: '100px',
    paddingBottom: '125px',
    width: '400px',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  subtitle: {
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(0.5)
  },
  facebookButton: {
    marginTop: theme.spacing(3),
    width: '100%'
  },
  facebookIcon: {
    marginRight: theme.spacing(1)
  },
  googleButton: {
    marginTop: theme.spacing(2),
    width: '100%'
  },
  googleIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(2)
    // textAlign: 'center'
  },
  fields: {
    marginTop: theme.spacing(2)
  },
  textField: {
    width: '100%',
    '& + & ': {
      marginTop: theme.spacing(2)
    }
  },
  policy: {
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  policyText: {
    display: 'inline',
    color: theme.palette.text.secondary
  },
  policyUrl: {
    color: theme.palette.text.primary,
    '&:hover': {
      cursor: 'pointer',
      color: theme.palette.primary.main
    }
  },
  progress: {
    display: 'block',
    marginTop: theme.spacing(2),
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  signInButton: {
    marginTop: theme.spacing(2),
    width: '100%'
  },
  signUp: {
    marginTop: theme.spacing(2),
    color: theme.palette.text.secondary
  },
  signUpUrl: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    '&:hover': {
      color: theme.palette.primary.main
    }
  },
  fieldError: {
    color: theme.palette.danger.main,
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1)
  },
  submitError: {
    color: theme.palette.danger.main,
    alignText: 'center',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2)
  }
}));

interface IProps {
  className: string;
}

const ResetPage: React.FC<IProps> = () => {
  const classes = useStyles();
  const theme = useTheme();

  const history = useHistory();
  const auth = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [values, setValues] = useState({
    email: '',
    password: '',
    dispayName: ''
  });

  const handleChange = (name: string) => (e: any) => {
    setValues({
      ...values,
      [name]: e?.target?.value ?? ''
    });
  };

  const handleSubmit = async () => {
    try {
      await auth.sendPasswordResetEmail(values.email);
      enqueueSnackbar('发送成功！请及时查看邮箱', {
        variant: 'success'
      });
    } catch (err) {
      console.log(err);
      enqueueSnackbar('发送失败！请重试', {
        variant: 'error'
      });
    }
  };

  return (
    <Fade in>
      <div className={classes.fields}>
        <TextField
          className={classes.textField}
          label="邮 箱"
          name="email"
          size="small"
          type="text"
          variant="outlined"
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          value={values.email}
          onChange={handleChange('email')}
        />

        <Box marginTop={`${theme.spacing(2)}px`}>
          <Button
            variant="contained"
            disableElevation
            color="secondary"
            fullWidth
            disabled={!values.email}
            onClick={handleSubmit}>
            发送邮件
          </Button>
        </Box>
      </div>
    </Fade>
  );
};

export default ResetPage;
