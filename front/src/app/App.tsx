import "./App.scss";
import { useState, useEffect } from "react";
import { CardWord, LvlBar, PartBar } from "../widget";
import { TWordData } from "../widget/CardWord/data/types";
import { getData } from "../shared/api/get_data";
import { Spin } from "antd";

function App() {
    const [selectedLvl, setSelectedLvl] = useState<number>(1);
    const [selectedPart, setSelectedPart] = useState<string>("명사");
    const [data, setData] = useState<TWordData[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            setData(null);

            try {
                const response = await getData(selectedPart, selectedLvl, 5);
                setData(response);
            } catch (err) {
                console.error("Error loading data:", err);
                setError("Error loading data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [selectedLvl, selectedPart]);

    const handleLvlChange = (lvl: string) => {
        setSelectedLvl(Number(lvl));
    };

    const handlePartChange = (part: string) => {
        setSelectedPart(part);
    };

    return (
        <>
            <LvlBar onChange={handleLvlChange} />
            <PartBar onChange={handlePartChange} />

            <div className="app-container">
                {isLoading && <Spin fullscreen />}

                {error && <p>{error}</p>}

                {data && data.length > 0
                    ? data.map((wordData, index) => (
                          <CardWord key={index} currentWord={wordData} />
                      ))
                    : !isLoading && <p>No data available</p>}
            </div>
        </>
    );
}

export default App;
