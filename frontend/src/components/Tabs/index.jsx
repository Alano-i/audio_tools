import React, { useState, useEffect, useRef } from "react";
import "./index.css";

const Tabs = ({ tabs, value, onChange }) => {
  const [selectedTab, setSelectedTab] = useState(value || (tabs.length > 0 ? tabs[0].value : ""));
  const tabsRef = useRef(null);
  const tabRefs = useRef([]);

  const updateTabAfter = (index) => {
    if (!tabsRef.current || index >= tabRefs.current.length || index < 0) return;

    const tab = tabRefs.current[index];
    const targetRect = tab.getBoundingClientRect();
    const tabsRect = tabsRef.current.getBoundingClientRect();

    const width = `${targetRect.width}px`;
    const height = `${targetRect.height}px`;
    const left = `${targetRect.left - tabsRect.left - tabsRef.current.clientLeft}px`;

    tabsRef.current.style.setProperty("--tab-after-width", width);
    tabsRef.current.style.setProperty("--tab-after-height", height);
    tabsRef.current.style.setProperty("--tab-after-left", left);
  };

  useEffect(() => {
    // 默认选中第一项并设置样式
    if (tabs.length > 0) {
      updateTabAfter(tabs.findIndex((tab) => tab.value === selectedTab));
    }
  }, [selectedTab, tabs]);

  const handleClick = (tabValue, index) => {
    setSelectedTab(tabValue);
    onChange(tabValue);
    updateTabAfter(index);
  };

  return (
    <div className="tabs" ref={tabsRef}>
      {tabs.map((tab, index) => (
        <div
          key={tab.value}
          ref={(el) => (tabRefs.current[index] = el)}
          className={`tab ${selectedTab === tab.value ? "selected" : ""}`}
          onClick={() => handleClick(tab.value, index)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
