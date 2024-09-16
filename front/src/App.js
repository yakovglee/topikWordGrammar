import './App.css';
import React, { useState, useEffect } from 'react';
import CardContent from './ui/CardContent';

import { fetchSheetData } from './service/getters';
import CardWord from './ui/CardWord';

import CustomTabs from './ui/CustomTabs';

function App() {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetchSheetData().then((data) => {
  //     setData(data);
  //   }).catch(error => {
  //     console.error("Ошибка при загрузке данных:", error);
  //   });
  // }, []);

  const tabsLvl = [
    { tab: "TOPIK I", key: "1"},
    { tab: "TOPIK II", key: "2"}
  ];

  const tabsPart = [
    { tab: "명사"},
    { tab: "형용사"},
    { tab: "동사"},
    { tab: "명사1"},
    { tab: "형용사1"},
    { tab: "동사1"},
    { tab: "명사"},
    { tab: "형용사"},
    { tab: "동사"},
    { tab: "명사1"},
    { tab: "형용사1"},
    { tab: "동사1"},
  ];
  
  return (
    
    
    <>
        {/* // <CardContent data={data} /> */}
        <CustomTabs tabs={tabsLvl} className="tabs-level" />
        <CustomTabs tabs={tabsPart} className="tabs-part" />
    </>
    
  )
}

export default App;
