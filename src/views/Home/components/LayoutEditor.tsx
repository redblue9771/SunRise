import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useFunctions } from 'reactfire';
import { IListener } from '../home.interface';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  }
}));

interface IProps {
  onClose: (data: IListener) => void;
}

const VerticalLinearStepper: React.FC<IProps> = ({ onClose }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const fn = useFunctions();

  const [values, setValues] = useState<IListener>({
    device_id: '-1',
    value_id: '-1',
    type: 0
  });

  const [allDevice, setAllDevice] = useState<any[]>([]);
  const [deviceVals, setDeviceVals] = useState<any[]>([]);
  const getInitialProps = async () => {
    try {
      const getAllDevice = fn.httpsCallable('getAllDevice');
      const { data } = await getAllDevice();

      return setAllDevice([...data]);
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  useEffect(() => {
    getInitialProps();
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSelectDevice = async () => {
    try {
      const { device_id } = values;
      const getDeviceValues = fn.httpsCallable('getDeviceValues');
      const { data } = await getDeviceValues({
        _id: device_id
      });

      setDeviceVals([...data]);
    } catch (err) {
      console.log(err);
    }
    handleNext();
  };

  const handleChange = (name: string) => (e: any) => {
    if (!e.target || !e.target.value) {
      return;
    }
    switch (name) {
      case 'type':
        setValues({ ...values, [name]: Number(e.target.value) });

        break;

      default:
        setValues({ ...values, [name]: e.target.value });

        break;
    }
  };

  const handleSubmit = () => {
    onClose(values);
  };

  return (
    <>
      <DialogTitle>新的监听面板</DialogTitle>
      <DialogContent className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel>选择设备</StepLabel>
            <StepContent>
              <TextField
                select
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">设备：</InputAdornment>
                  )
                }}
                margin="normal"
                value={values.device_id}
                onChange={handleChange('device_id')}>
                <MenuItem value={'-1'}>请选择</MenuItem>
                {Array.isArray(allDevice) &&
                  allDevice.map((item) => (
                    <MenuItem key={item?._id} value={item?._id}>
                      {item?.name}
                    </MenuItem>
                  ))}
              </TextField>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={values.device_id === '-1'}
                    onClick={handleSelectDevice}
                    className={classes.button}>
                    下一步
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>

          <Step>
            <StepLabel>选择属性</StepLabel>
            <StepContent>
              <TextField
                select
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">属性：</InputAdornment>
                  )
                }}
                margin="normal"
                value={values.value_id}
                onChange={handleChange('value_id')}>
                <MenuItem value={'-1'}>请选择</MenuItem>
                {Array.isArray(deviceVals) &&
                  deviceVals.map((item) => (
                    <MenuItem key={item?._id} value={item?._id}>
                      {item?.name}
                    </MenuItem>
                  ))}
              </TextField>
              <div className={classes.actionsContainer}>
                <div>
                  <Button onClick={handleBack} className={classes.button}>
                    上一步
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={values.value_id === '-1'}
                    onClick={handleNext}
                    className={classes.button}>
                    下一步
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>方式</StepLabel>
            <StepContent>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">可视化类型</FormLabel>
                <RadioGroup
                  name="选择显示方式"
                  value={values.type}
                  onChange={handleChange('type')}>
                  <FormControlLabel
                    value={0}
                    control={<Radio />}
                    label="单值"
                  />
                  <FormControlLabel
                    value={1}
                    control={<Radio />}
                    label="图表"
                  />
                </RadioGroup>
              </FormControl>

              <div className={classes.actionsContainer}>
                <div>
                  <Button onClick={handleBack} className={classes.button}>
                    上一步
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    className={classes.button}>
                    完成
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        </Stepper>
      </DialogContent>
    </>
  );
};

export default VerticalLinearStepper;
