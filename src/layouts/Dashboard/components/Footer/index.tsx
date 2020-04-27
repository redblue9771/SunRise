// Material components
import { Typography } from '@material-ui/core';
import React from 'react';

type Props = {
  className?: string;
};

const Footer: React.FC<Props> = () => {
  return (
    <>
      <Typography variant="body1" color="textPrimary">
        &copy; {new Date().getFullYear()} · 福建工程学院 · 高阳 · 毕业设计 由
        Firebase 强力驱动
      </Typography>
      <Typography variant="caption" color="textSecondary">
        创建属于自己的物联网！
      </Typography>
    </>
  );
};

export default Footer;
