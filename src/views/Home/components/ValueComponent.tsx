import {
  Box,
  CardContent,
  CardHeader,
  IconButton,
  Typography
} from '@material-ui/core';
import { DeleteForever as DeleteIcon } from '@material-ui/icons';
import React from 'react';
import {
  useFirestore,
  useFirestoreCollectionData,
  useFirestoreDocDataOnce
} from 'reactfire';
import { IListener } from '../home.interface';

const ValueComponent: React.FC<{ meta: IListener; onRemove: any }> = ({
  meta,
  onRemove
}) => {
  const deviceRef = useFirestore().doc(`devices/${meta.device_id}`);
  const deviceData: any = useFirestoreDocDataOnce(deviceRef);
  const docRef = useFirestore()
    .collection(`devices/${meta.device_id}/values`)
    .doc(`${meta.value_id}`);
  const valueData: any = useFirestoreDocDataOnce(docRef);

  const ref = useFirestore()
    .collection(`devices/${meta.device_id}/values/${meta.value_id}/data`)
    .orderBy('timestamp')
    .limitToLast(2);
  const data: any[] = useFirestoreCollectionData(ref);
  console.log(data);
  return (
    <>
      <CardHeader
        title={`${deviceData?.name ?? ''} - ${valueData?.name ?? ''}`}
        action={
          <IconButton onClick={onRemove}>
            <DeleteIcon color="error" />
          </IconButton>
        }
      />

      <CardContent>
        <Box
          display="flex"
          alignContent="center"
          alignItems="center"
          flexDirection="column">
          <Typography variant="h2" color="secondary">
            {(
              (data?.[0]?.payload ?? 0) / (valueData?.display_ratio ?? 1)
            ).toFixed(2)}{' '}
            <span style={{ fontSize: '0.6em', color: '#000' }}>
              {valueData?.unit ?? ''}
            </span>
          </Typography>
          <Typography variant="body1">
            {data?.[0]?.timestamp?.seconds
              ? new Date(
                  (data?.[0]?.timestamp?.seconds ?? 0) * 1000
                ).toLocaleString()
              : '未知'}
          </Typography>
          <Typography variant="subtitle1">
            较上一次采集{' '}
            <span style={{ color: 'green' }}>
              {Math.sign(
                (data?.[0]?.payload ?? 0) - (data?.[1]?.payload ?? 0)
              ) >= 0 && '+'}
              {(
                ((data?.[0]?.payload ?? 0) - (data?.[1]?.payload ?? 0)) /
                (valueData?.display_ratio ?? 1)
              ).toFixed(2)}{' '}
            </span>
            {valueData?.unit ?? ''}
          </Typography>
        </Box>
      </CardContent>
    </>
  );
};

export default ValueComponent;
