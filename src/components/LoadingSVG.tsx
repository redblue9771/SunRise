import React from 'react';
import { Box, SvgIcon } from '@material-ui/core';

const Loading: React.FC<{}> = ({}) => {
  return (
    <Box margin="0 auto">
      <SvgIcon
        style={{
          width: '200px',
          height: '200px',
          margin: 'auto',
          display: 'block'
        }}
        width={200}
        height={200}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid">
        <circle
          cx="50"
          cy="50"
          r="29.6576"
          fill="none"
          stroke="#e6e90c"
          strokeWidth="2">
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="1s"
            values="0;40"
            keyTimes="0;1"
            keySplines="0 0.2 0.8 1"
            calcMode="spline"
            begin="-0.5s"></animate>
          <animate
            attributeName="opacity"
            repeatCount="indefinite"
            dur="1s"
            values="1;0"
            keyTimes="0;1"
            keySplines="0.2 0 0.8 1"
            calcMode="spline"
            begin="-0.5s"></animate>
        </circle>
        <circle
          cx="50"
          cy="50"
          r="8.18012"
          fill="none"
          stroke="#46dff0"
          strokeWidth="2">
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="1s"
            values="0;40"
            keyTimes="0;1"
            keySplines="0 0.2 0.8 1"
            calcMode="spline"></animate>
          <animate
            attributeName="opacity"
            repeatCount="indefinite"
            dur="1s"
            values="1;0"
            keyTimes="0;1"
            keySplines="0.2 0 0.8 1"
            calcMode="spline"></animate>
        </circle>
      </SvgIcon>
    </Box>
  );
};

export default Loading;
