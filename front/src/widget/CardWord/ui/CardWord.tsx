import "./CardWord.scss";

import { useState } from "react";

import { Card, Carousel } from "antd";
import { data } from "../data/data";

export const CardWord = () => {
    const [wordId, setWordId] = useState(0);
    const [isReverse, setIsReverse] = useState(false);

    const handleCarouselChange = (current: number) => {
        setWordId(2 * current);
        setIsReverse(false);
    };

    const handleChangeReverse = () => {
        setIsReverse((prev) => !prev);
    };

    const currentWord = data[wordId] || data[0];

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
                                ? currentWord.trans_word.join(", ")
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
                                        {currentWord.trans_dfn[2 * idx] ||
                                            "No translation available"}
                                    </li>
                                    <li>
                                        {currentWord.trans_dfn[2 * idx + 1] ||
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
