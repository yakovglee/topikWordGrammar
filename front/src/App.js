import './App.css';
import React, { useState, useEffect } from 'react';

// import { fetchSheetData } from './service/getters';

import CustomTabs from './ui/CustomTabs.js';
// import CardContent from './ui/CardContent.js';
// import NewCard from './ui/NewCard.js';

function App() {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetchSheetData().then((data) => {
  //     setData(data);
  //   }).catch(error => {
  //     console.error("Ошибка при загрузке данных:", error);
  //   });
  // }, []);

  const tabsLvl = [
    { tab: "1 급"},
    { tab: "2 급"},
    { tab: "3 급"},
    { tab: "4 급"},
    { tab: "5 급"},
    { tab: "6 급"},
  ];

  const tabsPart = [
    {
      tab: '명사',
    },
    {
      tab: '형용사',
    },
    {
      tab: '동사',
    },
    {
      tab: '부사',
    },
    {
      tab: '의존명사',
    },
    {
      tab: '대명사',
    },
    {
      tab: '수사',
    },
    {
      tab: '관형사',
    },
    {
      tab: '감탄사',
    },
    {
      tab: '접사',
    },
    {
      tab: '줄어든말',
    },
  ];
  
  return (
    
    
    <>
        
        {/* <CustomTabs tabs={tabsLvl} className="tabs-level" />
        <CustomTabs tabs={tabsPart} className="tabs-part" />

        <NewCard /> */}
        <CustomTabs tabs={tabsPart} className="tabs-part" />
        <CustomTabs tabs={tabsLvl} className="tabs-level" />

    </>
    
  )
}

export default App;
