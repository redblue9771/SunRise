// Material helpers
import {
  Grid,
  IconButton,
  makeStyles,
  Typography,
  CardMedia,
  Button,
  Fade
} from '@material-ui/core';
// Material icons
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowToIcon
} from '@material-ui/icons';
import React, { useState } from 'react';
import { Link, Route, useLocation, useHistory } from 'react-router-dom';
import SignIn from 'views/Login';
import BGimg from 'assets/bg.jpg';
import Logo from 'assets/fjut.png';
import Register from 'views/Register';
import ResetPage from 'views/Reset';

const useStyles = makeStyles((theme) => ({
  person: {
    textShadow: '0 0 20px #000',
    color: '#fff',
    marginTop: theme.spacing(4),
    fontSize: '32px'
  },
  root: {
    height: 'auto',
    [theme.breakpoints.up('md')]: {
      height: '100vh'
    }
  },
  grid: {
    height: '100%'
  },
  quoteWrapper: {
    minHeight: '300px'
  },
  quote: {
    height: '300px',
    backgroundImage: `url(${BGimg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    [theme.breakpoints.up('md')]: {
      height: '100%'
    }
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
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      paddingTop: 0
    }
  },
  backButton: {},
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flex: 'auto',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    transition: 'all 0.5s',
    paddingLeft: '100px',
    paddingRight: '100px',
    [theme.breakpoints.down('md')]: {
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
  },
  quoteAfter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    background: `linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0));`,
    [theme.breakpoints.up('md')]: {
      background: `linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0));`
    }
  },
  logo: {
    width: '150px',
    height: '150px',
    filter: 'drop-shadow(0 0 10px #000)',
    margin: '0 auto'
  }
}));

interface IProps {
  className: string;
}

const AuthPage: React.FC<IProps> = () => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const handleBack = () => {
    history.replace('/auth/login');
  };
  const handleToRegister = () => {
    history.replace('/auth/register');
  };
  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.quoteWrapper} item md={7} xs={12}>
          <div className={classes.quote}>
            <div className={classes.quoteAfter}>
              <div className={classes.quoteInner}>
                <CardMedia image={Logo} className={classes.logo} />
                <div className={classes.person}>2020年本科毕业设计</div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className={classes.content} item md={5} xs={12}>
          <div className={classes.contentBody}>
            <form className={classes.form}>
              {location.pathname.match('register') && (
                <Button
                  startIcon={<ArrowBackIcon />}
                  onClick={handleBack}
                  disableElevation>
                  已有账号？去登录
                </Button>
              )}
              {location.pathname.match('reset') && (
                <Button
                  startIcon={<ArrowBackIcon />}
                  onClick={handleBack}
                  disableElevation>
                  去登录
                </Button>
              )}
              {location.pathname.match('login') && (
                <Button
                  startIcon={<ArrowToIcon />}
                  onClick={handleToRegister}
                  disableElevation>
                  还没有账号? 去注册
                </Button>
              )}
              <Typography className={classes.title} variant="h2">
                物联网数据监控系统
              </Typography>
              <Typography className={classes.sugestion} variant="body1">
                IoT Data Monitoring System
              </Typography>

              <Route exact component={SignIn} path="/auth/login" />
              <Route exact component={Register} path="/auth/register" />
              <Route exact component={ResetPage} path="/auth/reset" />
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AuthPage;
