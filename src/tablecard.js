import React, { useState } from 'react';
import './index.css';
import { Card } from 'antd';
import Tables from './table.tsx';
import LCATable from './lcatb.tsx';

const tabList = [
  {
    key: 'tab1',
    tab: 'Table of sub-level activities calculated from Ecoinvent',
  },
  {
    key: 'tab2',
    tab: 'Tables of parent activities calculated from sub-level activities',
  },
];

const contentList: Record<string, React.ReactNode> = {
  tab1: <Tables/>,
  tab2: <LCATable/>,
};



const Tablecard: React.FC = () => {
  const [activeTabKey1, setActiveTabKey1] = useState('tab1');
  

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };


  return (
    <>
      <Card
        style={{ width: '100%' }}
        title="Tables of GHG emission calculations"
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

export default Tablecard;