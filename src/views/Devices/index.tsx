// Material helpers
import {
  Box,
  CircularProgress,
  Dialog,
  Grid,
  makeStyles
} from '@material-ui/core';
import React, { useEffect, useState, Suspense } from 'react';
import { useHistory } from 'react-router-dom';
import { useFunctions } from 'reactfire';
import { DeviceCard, DeviceEditor, DevicesToolbar } from './components';
import Loading from 'components/LoadingSVG';
// Custom components

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: theme.spacing(2)
  },
  progressWrapper: {
    paddingTop: '48px',
    paddingBottom: '24px',
    display: 'flex',
    justifyContent: 'center'
  },
  pagination: {
    marginTop: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

interface IProps {}

interface IDialogProps {
  open: boolean;
  deviceIndex?: number;
}

const DevicePage: React.FC<IProps> = () => {
  const classes = useStyles();
  const [devices, setDevices] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dialogProps, setDialogProps] = useState<IDialogProps>({
    open: false
  });
  const history = useHistory();

  const handleToggle = () => {
    setDialogProps({ open: !dialogProps.open });
  };

  const fc = useFunctions();
  const getInitialProps = async () => {
    const getAllDevice = fc.httpsCallable('getAllDevice');

    try {
      const { data } = await getAllDevice();
      setDevices([...(data || [])]);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleChangeDevices = ({ type, payload }: any) => {
    // console.log(type, payload);
    switch (type) {
      case 'add':
        setDevices([payload, ...devices]);
        break;
      case 'remove':
        setDevices(devices.filter((item) => item._id !== payload));
        break;
      case 'update':
        setDevices([
          ...devices.map((item) => {
            console.log(item, payload);
            return item._id === payload._id ? payload : item;
          })
        ]);
        break;
      default:
        break;
    }
  };

  const handleShowDevice = (index: number) => () => {
    setDialogProps({
      open: true,
      deviceIndex: index
    });
  };
  const handleShowDeviceData = (id: string) => () => {
    history.push(`/dashboard/devices/${id}/data`);
  };

  const handleDeleteDevice = (index: number) => async (e: any) => {
    e.stopPropagation();

    try {
      const deleteDevice = fc.httpsCallable('deleteDevice');
      await deleteDevice({
        _id: devices?.[index]?._id
      });

      handleChangeDevices({
        type: 'remove',
        payload: devices?.[index]?._id
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInitialProps();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <DevicesToolbar onClick={handleToggle} />
      <div className={classes.content}>
        <Grid container spacing={3}>
          {devices.map((device, idx) => (
            <Grid item key={idx} lg={3} md={4} sm={6} xs={12}>
              <DeviceCard
                device={device}
                onClick={handleShowDeviceData(device._id || '')}
                onAction={handleShowDevice(idx)}
                onDelete={handleDeleteDevice(idx)}
              />
            </Grid>
          ))}
        </Grid>
      </div>

      <Dialog open={dialogProps.open} onClose={handleToggle}>
        <Suspense fallback={<Loading />}>
          <DeviceEditor
            initialValues={
              dialogProps.deviceIndex === undefined
                ? null
                : { ...devices[dialogProps.deviceIndex], values: [] }
            }
            onToggle={handleToggle}
            onChangeDevice={handleChangeDevices}
          />
        </Suspense>
      </Dialog>
    </>
  );
};

export default DevicePage;
