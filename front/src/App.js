import './App.css';
import React, { useState, useEffect } from 'react';
import CardContent from './ui/CardContent';

import { fetchSheetData } from './service/getters';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchSheetData().then((data) => {
      setData(data);
    }).catch(error => {
      console.error("Ошибка при загрузке данных:", error);
    });
  }, []);
  
  return (
    
    <CardContent data={data} />
  )
}

export default App;
