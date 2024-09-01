import React from 'react';
import { Collapse, Divider } from 'antd';

// Helper function to group items by level
const groupByLevel = (items) => {
  return items.reduce((acc, item) => {
    if (!acc[item.lvl]) {
      acc[item.lvl] = [];
    }
    acc[item.lvl].push(item);
    return acc;
  }, {});
};

const CardWord = ({ items }) => {
  // Group items by their level
  const groupedItems = groupByLevel(items);

  return (
    <div>
      {Object.keys(groupedItems).map(level => (
        <div key={level}>
          <Divider orientation="left">Level {level}</Divider>
          <Collapse accordion bordered={false}>
            {groupedItems[level].map((item, index) => (
              <Collapse.Panel key={index} header={item.word}>
                <div>
                  <div>
                    <strong>Definitions:</strong>
                    <ul>
                      {item.dfn.map((def, i) => (
                        <li key={i}>{def}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong>Translations:</strong>
                    <ul>
                      {item.trans_dfn.map((trans, i) => (
                        <li key={i}>{trans}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong>Link:</strong> <a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a>
                  </div>
                </div>
              </Collapse.Panel>
            ))}
          </Collapse>
        </div>
      ))}
    </div>
  );
}

export default CardWord;
