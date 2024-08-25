const API_KEY = 'AIzaSyDT2sVolBj1PhM3iyn74-FBlGD9isyLyjc'; 
const SHEET_ID = '1NmPGcwQ67FebYd3McN4lf7jcN2hKcmM6W1cpBRcQZa4'; 

export const fetchSheetData = async (SHEET_NAME='word') => {
    const RANGE = `${SHEET_NAME}!A:E`; 
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const values = data.values;
        
        const headers = values[0];
        const rows = values.slice(1);

        const jsonData = rows.map(row => {
            const rowData = {};
            headers.forEach((header, index) => {
                rowData[header] = row[index] || ''; 
            });
            return rowData;
        });
        
        return jsonData;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};