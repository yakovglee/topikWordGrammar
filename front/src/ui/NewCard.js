import { Card } from 'antd';

import './styles/NewCard.css'


const Index = ({data}) => {

    return (
        <div className='custom-card'>
        <Card>
            <p className="textTitle">{data.word}</p>
            
            <div className="dfn_content">
                <ul>
                    <li className='main-dfn'>{data.dfn[0]}</li>
                    <li>{data.trans_dfn[0]}</li>
                    <li>{data.trans_dfn[1]}</li>                   
                </ul>
                

            </div>
        </Card>
        </div>
    )
}   
  
  
  
export default Index;
  