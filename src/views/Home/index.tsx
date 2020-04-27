// Material helpers
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Dialog,
  makeStyles,
  useMediaQuery
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/BarChartOutlined';
import React, { Suspense, useState } from 'react';
import RGL, { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import theme from 'styles';
import LayoutEditor from './components/LayoutEditor';
import LineChartComponent from './components/LineChart';
import ValueComponent from './components/ValueComponent';
import { IListener } from './home.interface';
import Loading from 'components/LoadingSVG';

// Component styles
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    padding: theme.spacing(2)
  },
  item: {
    height: '100%'
  }
}));

const ReactGridLayout = WidthProvider(Responsive);

interface IProps {
  isDraggable: boolean;
  isResizable: boolean;
  items: number;
  rowHeight: number;
  onLayoutChange: (T: RGL.Layout[]) => {};
  cols: number;
}

const HomePage = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [chartList, setChartList] = useState<Array<IListener>>(
    () =>
      JSON.parse(
        localStorage.getItem('chartList') ?? JSON.stringify({ data: [] })
      )?.data ?? []
  );

  const handleAddChartList = (data: IListener) => {
    setChartList((prevState) => {
      const res = [...prevState, data];
      localStorage.setItem(
        'chartList',
        JSON.stringify({
          data: res
        })
      );
      return res;
    });

    setOpen(false);
  };

  const handleRemoveChartList = (index: number) => () => {
    setChartList((prevState) => {
      const res = prevState.filter((item, idx) => index !== idx);
      localStorage.setItem(
        'chartList',
        JSON.stringify({
          data: res
        })
      );
      return res;
    });
  };

  const [layouts, setLayouts] = React.useState<RGL.Layouts>(() =>
    getFromLS('layouts')
  );

  const onLayoutChange = (layout: any, layouts: any) => {
    saveToLS('layouts', layouts);
    setLayouts(layouts);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Box padding={theme.spacing(2, 0)}>
        <Button
          color="primary"
          onClick={handleToggle}
          size="small"
          startIcon={<AddIcon />}
          variant="contained">
          添加图表
        </Button>
      </Box>
      <ReactGridLayout
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        layouts={layouts}
        rowHeight={100}
        onLayoutChange={onLayoutChange}
        isDraggable={!isMobile}
        // isDraggable={false}
      >
        {chartList.map((item, idx) =>
          item.type === 0 ? (
            <Card key={idx}>
              <ValueComponent
                meta={item}
                onRemove={handleRemoveChartList(idx)}
              />
            </Card>
          ) : (
            <Card key={idx}>
              <LineChartComponent
                meta={item}
                onRemove={handleRemoveChartList(idx)}
              />
            </Card>
          )
        )}
      </ReactGridLayout>

      <Dialog open={open} onClose={handleToggle} maxWidth="lg">
        <Suspense fallback={<Loading />}>
          <LayoutEditor onClose={handleAddChartList} />
        </Suspense>
      </Dialog>
    </>
  );
};

function getFromLS(key: any): any {
  try {
    return JSON.parse(localStorage.getItem('rgl-8') || '')?.[key];
  } catch (e) {
    /*Ignore*/
  }
}

function saveToLS(key: any, value: any) {
  localStorage.setItem(
    'rgl-8',
    JSON.stringify({
      [key]: value
    })
  );
}

export default HomePage;
