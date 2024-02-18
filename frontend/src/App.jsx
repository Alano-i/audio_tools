import Tabs from "./components/Tabs";
import Container from "./components/Container";
import { Suspense, useEffect } from "react";
import { useLocation, useRoutes, useNavigate } from "react-router-dom";
import routes from "~react-pages";

const tabs = [
  {
    label: "播客源",
    value: "podcastSource",
    href: "/podcastSource",
  },
  {
    label: "生成",
    value: "generate",
    href: "/generate",
  },
  {
    label: "订阅",
    value: "subscribe",
    href: "/subscribe",
  },
  {
    label: "整理",
    value: "organize",
    href: "/organize",
  },
  {
    label: "日志",
    value: "log",
    href: "/log",
  },
  {
    label: "设置",
    value: "settings",
    href: "/settings",
  },
];

function App() {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const tabValue = pathname.split("/")?.[1];
  const tab = tabs.find((tab) => tab.value === tabValue)?.value;

  const onTabChange = (tabValue) => {
    const href = tabs.find((tab) => tab.value === tabValue)?.href;
    if (href) {
      navigate(href);
    }
  };

  useEffect(() => {
    // 重定向到默认 tab
    if (!tab) {
      navigate("/podcastSource");
    }
  }, [tab, navigate]);

  return (
    <Container>
      <Tabs tabs={tabs} value={tab} onChange={onTabChange} />
      <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>
    </Container>
  );
}

export default App;
