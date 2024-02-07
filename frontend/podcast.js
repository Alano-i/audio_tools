const tabs = document.querySelector(".tabs");
const tabElements = document.querySelectorAll(".tab");

tabElements.forEach((tab, index) => {
  tab.addEventListener("click", (event) => {
    updateTabAfter(event.target);
    tabElements.forEach((t) => t.classList.remove("selected"));
    event.target.classList.add("selected");
  });
});

function updateTabAfter(tab) {
  const targetRect = tab.getBoundingClientRect();
  const tabsRect = tabs.getBoundingClientRect();

  const width = targetRect.width + "px";
  const height = targetRect.height + "px";
  const left = targetRect.left - tabsRect.left - tabs.clientLeft + "px";

  tabs.style.setProperty("--tab-after-width", width);
  tabs.style.setProperty("--tab-after-height", height);
  tabs.style.setProperty("--tab-after-left", left);
}

// 默认选中第一项
if (tabElements.length > 0) {
  updateTabAfter(tabElements[0]);
  tabElements[0].classList.add("selected");
  // Trigger click event on the first tab
  tabElements[0].click();
}