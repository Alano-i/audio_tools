import { useState } from "react";
import Tabs from "./components/Tabs";
import Container from "./components/Container";

const tabs = [
  {
    label: "播客源",
    value: "podcastSource",
  },
  {
    label: "生成",
    value: "generate",
  },
  {
    label: "订阅",
    value: "subscribe",
  },
  {
    label: "整理",
    value: "organize",
  },
  {
    label: "旧版本日志",
    value: "log",
  },
  {
    label: "设置",
    value: "settings",
  },
];

function App() {
  const [tab, setTab] = useState("podcastSource");

  return (
    <Container>
      <Tabs tabs={tabs} value={tab} onChange={setTab} />
      <div>
        <pre>
          {JSON.stringify(
            tabs.find((t) => t.value === tab),
            null,
            2,
          )}
        </pre>
      </div>
    </Container>
  );
}

export default App;
