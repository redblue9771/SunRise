import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  Text
} from 'recharts';
import { IListener } from '../home.interface';
import {
  useFirestore,
  useFirestoreCollectionData,
  useFirestoreDocDataOnce
} from 'reactfire';
import {
  Typography,
  CardContent,
  CardHeader,
  IconButton,
  Icon
} from '@material-ui/core';
import { DeleteForever as DeleteIcon } from '@material-ui/icons';

const LineChartComponent: React.FC<{ meta: IListener; onRemove: any }> = ({
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
    .limitToLast(10);
  const data = useFirestoreCollectionData(ref);

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
      <CardContent
        style={{
          maxWidth: '100%',
          overflow: 'auto'
        }}>
        <LineChart
          width={500}
          height={300}
          data={(data ?? []).map((item: any) => {
            return {
              payload: (item?.payload ?? 0) / (valueData?.display_ratio ?? 1),
              dateTime: new Date(
                (item?.timestamp?.seconds ?? 0) * 1000
              ).toLocaleString()
            };
          })}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="dateTime"
            name="时间"
            tick={{
              // angle: -45,
              width: 100,
              scaleToFit: true
            }}
            tickCount={data.length}
          />
          <YAxis unit={valueData?.unit ?? ''} name="数值" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="payload" stroke="#8884d8" />
        </LineChart>
      </CardContent>
    </>
  );
};

export default LineChartComponent;
