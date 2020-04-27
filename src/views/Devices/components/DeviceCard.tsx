import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core';
// Material icons
import {
  AccessTime as AccessTimeIcon,
  DevicesOther as DeviceIcon,
  Edit as EditIcon,
  DeleteForever as DeleteIcon
} from '@material-ui/icons';
import classNames from 'classnames';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  imageWrapper: {
    margin: '0 auto',
    width: '75px',
    height: '75px'
  },
  image: {
    width: '100%'
  },
  title: {
    fontSize: '18px',
    lineHeight: '21px',
    textAlign: 'center',
    marginTop: theme.spacing(2)
  },
  description: {
    lineHeight: '16px',
    height: theme.spacing(4),
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: theme.palette.text.secondary,
    textAlign: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
  stats: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(1)
  },
  updateIcon: {
    color: theme.palette.text.secondary
  },
  updateText: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text.secondary,
    fontSize: '.8em'
  },
  detail: {
    marginLeft: 'auto',
    color: theme.palette.text.secondary
  },
  downloadsText: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text.secondary
  }
}));

interface IProps {
  className?: string;
  device?: any;
  onAction?: any;
  onClick?: any;
  onDelete: any;
}

const DeviceCard: React.FC<IProps> = ({
  onClick,
  className,
  device = {},
  onAction,
  onDelete
}) => {
  const classes = useStyles();

  return (
    <Card className={classNames(className)}>
      <CardActionArea onClick={onClick}>
        <CardHeader
          action={
            <IconButton aria-label="settings" onClick={onDelete}>
              <DeleteIcon color="error" />
            </IconButton>
          }
        />

        <CardContent>
          <Avatar className={classes.imageWrapper}>
            <DeviceIcon fontSize="large" />
          </Avatar>
          <Typography className={classes.title} variant="h4">
            {device.name}
          </Typography>
          <Typography className={classes.description} variant="body1">
            {device.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider />
      <CardActions disableSpacing>
        <AccessTimeIcon className={classes.updateIcon} />
        <Typography className={classes.updateText} variant="body2">
          最近一次采集:{' '}
          {device?.update_at
            ? new Date(
                (device?.update_at?._seconds ?? 0) * 1000
              ).toLocaleString()
            : '未知'}
        </Typography>
        <Button
          startIcon={<EditIcon />}
          className={classes.detail}
          variant="text"
          onClick={onAction}>
          详情
        </Button>
      </CardActions>
    </Card>
  );
};

export default DeviceCard;
