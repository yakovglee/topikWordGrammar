import "./App.scss";

import { CardWord, LvlBar, PartBar } from "../widget";

function App() {
    return (
        <>
            <LvlBar />
            <PartBar />
            <div className="app-container">
                <CardWord />
                <CardWord />
                <CardWord />
            </div>
        </>
    );
}

export default App;
