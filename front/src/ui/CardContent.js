import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { Divider } from 'antd';

import CardWord from './CardWord';

const tabListNoTitle = [
  {
    key: '명사',
    label: '명사',
  },
  {
    key: '형용사',
    label: '형용사',
  },
  {
    key: '동사',
    label: '동사',
  },
  {
    key: '부사',
    label: '부사',
  },
  {
    key: '의존명사',
    label: '의존명사',
  },
  {
    key: '대명사',
    label: '대명사',
  },
];


const CardContent = ({data}) => {
  const [activeTabKey, setActiveTabKey] = useState('명사');
  const [filteredData, setFilteredData] = useState([]);

  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  useEffect(() => {
    if (data.length > 0) {
        setFilteredData(
            data.filter(item => item.part === activeTabKey || activeTabKey === '')
        );
    }
}, [activeTabKey]);
  
  return (
    <>
      <Card
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey}
        onTabChange={onTabChange}
      >
        <CardWord items={filteredData} />
      
      </Card>
    </>
  );
};


export default CardContent;