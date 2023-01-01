import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/plots';

const DemoColumn = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('http://127.0.0.1:8000/charts/')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const config = {
    data,
    isGroup: true,
    xField: 'Activity',
    yField: 'Carbon emission',
    seriesField: 'Methods',
    label: {
      position: 'middle', 
    },
    xAxis:{label:{autoRotate:false,text:"Activity Name"}},
    yAxis:{title:{text:"kg CO2-Eq"}},
    color: ['#6495ED', '#FFA500'],
    layout: [
        // 柱形图数据标签位置自动调整
        {
          type: 'interval-adjust-position',
        }, // 数据标签防遮挡
        {
          type: 'interval-hide-overlap',
        }, // 数据标签文颜色自动调整
        {
          type: 'adjust-color',
        },
      ],
    connectedArea: {
      style: (oldStyle, element) => {
        return {
          fill: 'rgba(0,0,0,0.25)',
          stroke: oldStyle.fill,
          lineWidth: 0.5,
        };
      },
    },
  };

  return <Column {...config} />;
};


export default DemoColumn;