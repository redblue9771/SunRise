// Material helpers
import { Button, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import classNames from 'classnames';
import React from 'react';
// Component styles

const useStyles = makeStyles((theme) => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

interface IProps {
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Toolbar: React.FC<IProps> = ({ className, onClick }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classNames(classes.root, className)}>
        <div className={classes.row}>
          <Button
            color="primary"
            size="small"
            startIcon={<AddIcon />}
            variant="contained"
            onClick={onClick}>
            添加设备
          </Button>
        </div>
      </div>
    </>
  );
};

export default Toolbar;
