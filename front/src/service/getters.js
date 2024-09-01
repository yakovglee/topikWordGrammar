export const fetchSheetData = async (SHEET_NAME='word') => {
    const url = 'https://thejustiks.pythonanywhere.com/';
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
            
        return data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};