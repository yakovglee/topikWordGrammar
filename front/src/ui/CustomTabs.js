import React from "react";
import { Tabs } from "antd";
import "./styles/CustomTabs.css"; 

const { TabPane } = Tabs;

const Index = ({ tabs, className, onChange }) => (
  <div>
    <Tabs className={`custom-tab-bar ${className}`} onChange={onChange}>
      {tabs.map((tab) => (
        <TabPane tab={tab.tab} key={tab.tab} />
      ))}
    </Tabs>
  </div>
);

export default Index;
