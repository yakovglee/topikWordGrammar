import { useState } from 'react';

import { Card, Carousel } from 'antd';

import './styles/NewCard.css'

import png from './assets/switch.png'


const Index = ({data}) => {

    const [wordId, setWordId] = useState(0);
    const [isReverse, setisReverse] = useState(false);

    const handleCarouselChange = (current) => {
        setWordId(2 * current);
        setisReverse(false);
    };

    const handleChangeReverse = () => {
        setisReverse(prev => !prev);
    };
    

    return (
        <div className='custom-card'>
            <Card>
            <div className='word_container'>
                <div className="text-container" onClick={handleChangeReverse}>
                    <p className="textTitle">{isReverse ? data.trans_word[wordId] : data.word}</p>
                    <img src={png} alt="Translate" className="translate-icon" />
                </div>
            </div>
                
                    <div className="dfn_content">
                        <Carousel dots={true} afterChange={handleCarouselChange}>
                            {data.dfn.map((dfn, idx) => (


                                <div key={`definition-${idx}`} className='carousel-item'>
                                    <ul>
                                        <li className='main-dfn'>{dfn}</li>
                                        <li>{data.trans_dfn[2*idx]}</li>
                                        <li>{data.trans_dfn[2*idx+1]}</li>
                                    </ul>
                                </div>
                            ))}
                        </Carousel>

                    </div>
                

            </Card>
        </div>
    )
}   
  
  
  
export default Index;
  