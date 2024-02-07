import { useEffect, useRef } from "react";
import "./index.css";

const Tabs = ({ tabs, value, onChange }) => {
  const tabsRef = useRef(null);
  const tabRefs = useRef({});

  const updateTabAfter = (value) => {
    if (!tabsRef.current || !tabRefs.current[value]) return;

    const tab = tabRefs.current[value];
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
    updateTabAfter(value);
  }, [value]);

  const handleClick = (tabValue) => {
    onChange(tabValue);
  };

  return (
    <div className="tabs" ref={tabsRef}>
      {tabs.map((tab) => (
        <div
          key={tab.value}
          ref={(el) => (tabRefs.current[tab.value] = el)}
          className={`tab ${value === tab.value ? "selected" : ""}`}
          onClick={() => handleClick(tab.value)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
