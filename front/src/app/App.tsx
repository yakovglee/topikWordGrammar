import "./App.scss";

import { CardWord, LvlBar, PartBar } from "../widget";

import { data } from "../widget/CardWord/data/data";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <LvlBar />
            <PartBar />
            <div className="app-container">
                {data.map((wordData, index) => (
                    <CardWord key={index} currentWord={wordData} />
                ))}
            </div>
        </QueryClientProvider>
    );
}

export default App;
