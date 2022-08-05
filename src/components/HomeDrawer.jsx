import { Drawer } from 'antd';
import React, { useCallback, useEffect, useRef } from 'react';
import * as charts from 'echarts';
import { chartOptions } from '../charts';

const HomeDrawer = props => {
  const roundedRef = useRef(null);

  const renderRoundedChart = useCallback(() => {
    const chartInstance = charts.init(roundedRef.current);
    chartInstance.setOption(chartOptions.getHomeRoundedChart());
  }, []);

  useEffect(() => {
    props.visible && roundedRef.current && renderRoundedChart();
  }, [roundedRef, renderRoundedChart, props.visible]);

  return (
    <>
      <Drawer title="Basic Drawer" placement="right" {...props}>
        <div ref={roundedRef} style={{ width: '100%', height: '100%' }}></div>
      </Drawer>
    </>
  );
};

export default HomeDrawer;
