import { Card } from 'antd';

import './styles/NewCard.css'


const Index = () => {

    return (
        <div className='custom-card'>
        <Card>
            <p className="textTitle">기억하다</p>
            
            <div className="dfn_content">
                <ul>
                    <li className='main-dfn'>이전의 모습, 사실, 지식, 경험 등을 잊지 않거나 다시 생각해 내다.</li>
                    <li>Do not forget to think or remember the past image, fact, knowledge, experience, etc.</li>
                    <li>Не забывать и снова думать или вспоминать прошлый образ, факт, знания, опыт и т.п.</li>                    
                </ul>
                

            </div>
        </Card>
        </div>
    )
}   
  
  
  
export default Index;
  