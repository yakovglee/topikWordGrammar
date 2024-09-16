import React from "react";
import { Tabs } from "antd";
import "./styles/CustomTabs.css"; 

const { TabPane } = Tabs;

const Index = ({ tabs, className }) => (
  <div>
    <Tabs className={`custom-tab-bar ${className}`}>
      {tabs.map(tab => (
        <TabPane tab={tab.tab} key={tab.key} />
      ))}
    </Tabs>
  </div>
);

export default Index;
