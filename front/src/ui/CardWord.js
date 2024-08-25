import React from 'react';

import { Collapse } from 'antd';

const CardWord = ({items}) => {

  const itemsView = items.map((item, index) => ({
    key: item.id,
    label: item.word, 
    children: item.example,
  }));


  return (
    <Collapse accordion items={itemsView} bordered={false} />
  )
  
}

export default CardWord;