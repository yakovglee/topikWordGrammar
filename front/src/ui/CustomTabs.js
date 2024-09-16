import React from "react";
import { Tabs } from "antd";
import "./styles/CustomTabs.css"; 

const { TabPane } = Tabs;

const Index = ({ tabs, className }) => (
  <div>
    <Tabs className={`custom-tab-bar ${className}`}>
      {tabs.map((tab, key) => (
        <TabPane tab={tab.tab} key={key} />
      ))}
    </Tabs>
  </div>
);

export default Index;
