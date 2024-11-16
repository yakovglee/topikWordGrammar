import "./CardWord.scss";

import { useState, FC } from "react";

import { Card, Carousel } from "antd";
import { TWordData } from "../data/types";

interface CardWordProps {
    currentWord: TWordData;
}

export const CardWord: FC<CardWordProps> = ({ currentWord }) => {
    const [isReverse, setIsReverse] = useState(false);

    const handleCarouselChange = () => {
        setIsReverse(false);
    };

    const handleChangeReverse = () => {
        setIsReverse((prev) => !prev);
    };

    return (
        <div className="custom-card">
            <Card>
                <div className="word_container">
                    <div
                        className="text-container"
                        onClick={handleChangeReverse}
                    >
                        <p className="textTitle">
                            {isReverse
                                ? currentWord.word_ru.join(", ")
                                : currentWord.word}
                        </p>
                    </div>
                </div>

                <div className="dfn_content">
                    <Carousel dots={true} afterChange={handleCarouselChange}>
                        {currentWord.dfn.map((dfn, idx) => (
                            <div
                                key={`definition-${idx}`}
                                className="carousel-item"
                            >
                                <ul>
                                    <li className="main-dfn">{dfn}</li>
                                    <li>
                                        {currentWord.dfn_ru[idx] ||
                                            "No translation available"}
                                    </li>
                                    <li>
                                        {currentWord.dfn_en[idx] ||
                                            "No translation available"}
                                    </li>
                                </ul>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </Card>
        </div>
    );
};
