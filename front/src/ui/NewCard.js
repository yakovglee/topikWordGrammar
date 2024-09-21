import { useState } from 'react';

import { Card, Carousel } from 'antd';

import './styles/NewCard.css'


const Index = ({data}) => {

    const [wordId, setWordId] = useState(0);
    const [isRevere, setisRevere] = useState(false);

    const handleCarouselChange = (current) => {
        setWordId(2 * current);
        setisRevere(false);
    };

    const handleChangeReverse = () => {
        setisRevere(prev => !prev);
    };
    

    return (
        <div className='custom-card'>
            <Card>
                <p className="textTitle"  onClick={handleChangeReverse}>{ isRevere ? data.trans_word[wordId] : data.word }</p>
                
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
  