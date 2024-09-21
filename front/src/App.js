import './App.css';
import React, { useState, useEffect } from 'react';
import { Spin} from 'antd';

import { fetchSheetData } from './service/getters';
import { tabsLvl, tabsPart } from './service/data.js';

import CustomTabs from './ui/CustomTabs.js';
import NewCard from './ui/NewCard.js';

function App() {
  const [data, setData] = useState([]);
  const [selectedTabLvl, setSelectedTabLvl] = useState('1 급');
  const [selectedTabPart, setSelectedTabPart] = useState('명사');
  const [filteredWords, setFilteredWords] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchSheetData().then((data) => {
      setData(data);
    }).catch(error => {
      console.error("Ошибка при загрузке данных:", error);
    }).finally(() => {
      setLoading(false);
  });
  }, []);

  useEffect(() => {
    if (data.length) {
      const filtered = data.filter(word =>
        word.lvl === parseInt(selectedTabLvl) && word.part === selectedTabPart
      );
      setFilteredWords(filtered);
    }
  }, [data, selectedTabLvl, selectedTabPart]);

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
      
      { loading ? (<Spin size='large'/>) : (
        filteredWords.map((word) =>(
          <NewCard data={word} />
        ))
      )
      }
        

    </>
  );
}

export default App;
