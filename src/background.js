chrome.alarms.create("keep-alive", { periodInMinutes: 1 });

let pingCount = 0;

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name !== "keep-alive") return;

  chrome.storage.local.get({ keepAlive: true }, (data) => {
    if (!data.keepAlive) return;

    const shouldLog = pingCount === 0 || pingCount % 10 === 0;
    pingCount++;

    fetch("https://app.composer.trade/portfolio", {
      credentials: "include",
    })
      .then((res) => {
        if (shouldLog) console.log(`[keep-alive] ping #${pingCount} → ${res.status}`);
      })
      .catch((err) => {
        if (shouldLog) console.warn(`[keep-alive] ping #${pingCount} failed:`, err);
      });
  });
});
