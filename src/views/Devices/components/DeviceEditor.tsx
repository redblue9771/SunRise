import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  Typography,
  CircularProgress
} from '@material-ui/core';
import {
  AddCircleOutlineOutlined as AddIcon,
  RemoveCircleOutlineOutlined as RemoveIcon
} from '@material-ui/icons';
import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { useFunctions } from 'reactfire';
import theme from 'styles';

interface IDeviceValue {
  _id?: string;
  name: string;
  unit: string;
  display_ratio: number;
}

interface IForm {
  _id?: string;
  name: string;
  description: string;
  location?: string;
  values: Array<IDeviceValue>;
}

interface IActions {
  type: string;
  payload?: any;
  valueIndex?: number;
}

interface IProps {
  onToggle?: any;
  onChangeDevice?: any;
  initialValues?: IForm;
}

const initForm: IForm = {
  name: '',
  description: '',
  values: [
    {
      name: '',
      unit: '',
      display_ratio: 0
    }
  ]
};

const formReducer: React.Reducer<IForm, IActions> = (
  state,
  { type, payload, valueIndex }
) => {
  const typeTemp = type.split('.');
  switch (typeTemp[0]) {
    case 'addValue':
      return {
        ...state,
        values: [
          ...state.values,
          {
            name: '',
            unit: '',
            display_ratio: 0
          }
        ]
      };
    case 'removeValue':
      return {
        ...state,
        values: state.values.filter((_, idx) => idx !== valueIndex)
      };
    case 'values':
      return {
        ...state,
        values: state.values.map((item, idx) =>
          idx === valueIndex
            ? {
                ...item,
                [typeTemp[1]]:
                  typeTemp[1] === 'display_ratio'
                    ? Math.abs(Number(payload as number))
                    : payload
              }
            : item
        )
      };
    case 'initValues':
      return {
        ...state,
        values: payload
      };

    default:
      return {
        ...state,
        [typeTemp[0]]: payload
      };
  }
};

const DeviceEditor: React.FC<IProps> = ({
  initialValues,
  onToggle,
  onChangeDevice
}) => {
  const [form, dispatchForm] = useReducer(
    formReducer,
    initialValues || initForm
  );

  const fcs = useFunctions();

  const getInitialProps = async () => {
    if (!initialValues) {
      return;
    }
    const getDeviceValues = fcs.httpsCallable('getDeviceValues');

    try {
      const { data } = await getDeviceValues({ _id: initialValues._id });
      dispatchForm({ type: 'initValues', payload: data });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getInitialProps();
  }, []);

  const handleClickFormFiled = (
    action: Omit<IActions, 'payload'>
  ): React.MouseEventHandler<HTMLButtonElement> => () => {
    dispatchForm({ ...action });
  };

  const handleChangeFormFiled = (
    action: Omit<IActions, 'payload'>
  ): React.ChangeEventHandler<HTMLInputElement> => (event) => {
    dispatchForm({ ...action, payload: event.target.value });
  };

  const values: Array<number> = useMemo(() => {
    return [...form.values.keys()];
  }, [form.values]);

  const fc = useFunctions();
  const handleSubmit = async () => {
    if (form._id) {
      const updateDevice = fc.httpsCallable('updateDevice');

      try {
        const { data } = await updateDevice({
          ...form,
          values: form.values.filter((item) => !item._id)
        });
        if (onChangeDevice !== undefined) {
          onChangeDevice({ type: 'update', payload: data });
        }
        if (onToggle !== undefined) {
          onToggle();
        }
      } catch (error) {
        console.error(error);
      }
      return;
    }

    try {
      const createDevice = fc.httpsCallable('createDevice');
      const { data } = await createDevice(form);
      if (onChangeDevice !== undefined) {
        onChangeDevice({ type: 'add', payload: data });
      }
      if (onToggle !== undefined) {
        onToggle();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <DialogTitle>{form._id ? `设备信息` : '添加设备'}</DialogTitle>
      <DialogContent>
        <form>
          {form._id && <Typography variant="body1">ID：{form._id}</Typography>}
          <Input
            type="text"
            margin="dense"
            startAdornment={
              <InputAdornment position="start">设备名称：</InputAdornment>
            }
            fullWidth
            value={form.name}
            onChange={handleChangeFormFiled({ type: 'name' })}
            required
          />
          <Input
            type="text"
            margin="dense"
            startAdornment={
              <InputAdornment position="start">设备描述：</InputAdornment>
            }
            fullWidth
            value={form.description}
            onChange={handleChangeFormFiled({ type: 'description' })}
            required
          />

          <List disablePadding dense component="div">
            {values.map((idx) => (
              <Box key={`${idx}`} padding={`${theme.spacing(1)}px`}>
                <div>
                  <InputLabel shrink>属性{idx + 1}</InputLabel>
                  {form.values[idx]._id && (
                    <Typography
                      variant="caption"
                      component="span"
                      color="textPrimary">
                      绑定ID：{form.values[idx]._id}
                    </Typography>
                  )}
                </div>
                <ListItem component="div">
                  <div>
                    <Input
                      type="text"
                      readOnly={!!form.values[idx]._id}
                      disableUnderline={!!form.values[idx]._id}
                      startAdornment={
                        <InputAdornment position="start">
                          ┗属性名称：
                        </InputAdornment>
                      }
                      margin="dense"
                      value={form.values[idx].name}
                      onChange={handleChangeFormFiled({
                        type: 'values.name',
                        valueIndex: idx
                      })}
                      required
                    />

                    <Input
                      type="text"
                      readOnly={!!form.values[idx]._id}
                      disableUnderline={!!form.values[idx]._id}
                      startAdornment={
                        <InputAdornment position="start">
                          ┗属性单位：
                        </InputAdornment>
                      }
                      margin="dense"
                      value={form.values[idx].unit}
                      onChange={handleChangeFormFiled({
                        type: 'values.unit',
                        valueIndex: idx
                      })}
                      required
                    />
                    <Input
                      type="number"
                      readOnly={!!form.values[idx]._id}
                      disableUnderline={!!form.values[idx]._id}
                      startAdornment={
                        <InputAdornment position="start">
                          ┗显示比例：
                        </InputAdornment>
                      }
                      margin="dense"
                      value={form.values[idx].display_ratio}
                      onChange={handleChangeFormFiled({
                        type: 'values.display_ratio',
                        valueIndex: idx
                      })}
                      required
                    />
                  </div>
                  <ListItemSecondaryAction>
                    {!!idx && !form.values[idx]._id && (
                      <IconButton
                        edge="end"
                        onClick={handleClickFormFiled({
                          type: 'removeValue',
                          valueIndex: idx
                        })}>
                        <RemoveIcon color="error" />
                      </IconButton>
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
              </Box>
            ))}

            <ListItem disableGutters>
              <Button
                color="secondary"
                startIcon={<AddIcon />}
                onClick={handleClickFormFiled({ type: 'addValue' })}>
                添加一条属性
              </Button>
            </ListItem>
          </List>
        </form>
      </DialogContent>
      <DialogActions>
        <Button disableElevation onClick={onToggle}>
          取消
        </Button>
        <Button
          variant="contained"
          disableElevation
          color="secondary"
          onClick={handleSubmit}
          disabled={
            !form.name ||
            !form.description ||
            !!form.values
              .filter((item) => !item._id)
              .find(
                (item) => !item.name || !item.unit || item.display_ratio <= 0
              )
          }>
          确认
        </Button>
      </DialogActions>
    </>
  );
};

export default DeviceEditor;
