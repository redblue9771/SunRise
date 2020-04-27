import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useFunctions } from 'reactfire';

export default () => {
  const [value, setValue] = useState({
    device_id: '',
    value_id: ''
  });

  const fn = useFunctions();

  const addData = async () => {
    try {
      const addDeviceData = fn.httpsCallable('addDeviceData');

      await addDeviceData({
        device_id: value.device_id,
        value_id: value.value_id,
        payload: Math.floor(Math.random() * 100)
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggle = () => {
    addData();
  };

  const handleChange = (name: string) => (e: any) => {
    setValue({ ...value, [name]: e?.target?.value ?? '' });
  };
  return (
    <>
      <div>
        <TextField
          value={value.device_id}
          onChange={handleChange('device_id')}
        />
      </div>
      <div>
        <TextField value={value.value_id} onChange={handleChange('value_id')} />
      </div>

      <Button onClick={handleToggle}>添加</Button>
    </>
  );
};
