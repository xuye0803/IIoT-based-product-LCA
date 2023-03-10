import React, { useState } from 'react';
import './index.css';
import { Card } from 'antd';
import { Pie1, Pie2 } from './piechart';
import DemoColumn from './barchart';
import DemoDecompositionTreeGraph from './lcadiagram';

const tabList = [
  {
    key: 'tab1',
    tab: 'Bar chart of grouped carbon emission results',
  },
  {
    key: 'tab2',
    tab: 'Pie chart of IPCC 2013, GWP 100a',
  },
  {
    key: 'tab3',
    tab: 'Pie chart of ReCiPe Midpoint (H), GWP 100a',
  },
  {
    key: 'tab4',
    tab: 'Carbon emissions LCA decomposition tree graph ',
  },
];

const contentList: Record<string, React.ReactNode> = {
  tab1: <DemoColumn />,
  tab2: <Pie1 />,
  tab3: <Pie2 />,
  tab4: <DemoDecompositionTreeGraph />,
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
        title="charts of carbon emission results"
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={(key) => {
          onTab1Change(key);
        }}
      >
        {contentList[activeTabKey1]}
      </Card>
    </>
  );
};

export default Tabcard;