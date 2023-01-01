import React, { useState } from 'react';
import './index.css';
import { Card } from 'antd';
import { Pie1, Pie2 } from './piechart';

const tabList = [
  {
    key: 'tab1',
    tab: 'IPCC 2013, GWP 100a',
  },
  {
    key: 'tab2',
    tab: 'ReCiPe Midpoint (H), GWP 100a',
  },
];

const contentList: Record<string, React.ReactNode> = {
  tab1: <Pie1 />,
  tab2: <Pie2 />,
};



const Tabcard: React.FC = () => {
  const [activeTabKey1, setActiveTabKey1] = useState('tab1');
  

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };


  return (
    <>
      <Card
        style={{ width: '100%' }}
        title="Pie chart of carbon emission results"
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={(key) => {
          onTab1Change(key);
        }}
      >
        {contentList[activeTabKey1]}
      </Card>
      <br />
      <br />

    </>
  );
};

export default Tabcard;