chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const activeTab = tabs[0];

  if (activeTab && activeTab.url.includes("youtube.com")) {
    chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      func: () => {
        const video = document.querySelector("video");
        if (video && video.paused) video.play();
      },
    });
  } else {
    chrome.tabs.query({ url: "*://*.youtube.com/*" }, (tabs) => {
      tabs.forEach((tab) => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => {
            const video = document.querySelector("video");
            if (video && !video.paused) video.pause();
          },
        });
      });
    });
  }
});
