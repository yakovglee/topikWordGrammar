import { Card, Carousel } from 'antd';

import './styles/NewCard.css'


const Index = ({data}) => {

    return (
        <div className='custom-card'>
            <Card>
                <p className="textTitle">{data.word}</p>
                
                    <div className="dfn_content">
                        <Carousel dots={true}>
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
  