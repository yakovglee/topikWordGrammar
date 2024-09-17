import './App.css';
import React, { useState } from 'react';

// import { fetchSheetData } from './service/getters';
import { tabsLvl, tabsPart } from './service/data.js';

import CustomTabs from './ui/CustomTabs.js';
import NewCard from './ui/NewCard.js';

function App() {
  const [data, setData] = useState([]);
  const [selectedTabLvl, setSelectedTabLvl] = useState('1 급');
  const [selectedTabPart, setSelectedTabPart] = useState('명사');

  // useEffect(() => {
  //   fetchSheetData().then((data) => {
  //     setData(data);
  //   }).catch(error => {
  //     console.error("Ошибка при загрузке данных:", error);
  //   });
  // }, []);

  const handleTabChangeLvl = (key) => {
    setSelectedTabLvl(key);
  };

  const handleTabChangePart = (key) => {
    setSelectedTabPart(key);
  };

  return (
    <>
      <CustomTabs tabs={tabsLvl} className="tabs-level" onChange={handleTabChangeLvl} />
      <CustomTabs tabs={tabsPart} className="tabs-part" onChange={handleTabChangePart} />
      
      <NewCard /> 
      <NewCard /> 

    </>
  );
}

export default App;
