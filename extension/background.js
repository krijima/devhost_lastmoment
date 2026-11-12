chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id || !/^https?:/.test(tab.url || '')) return;
  try { await chrome.scripting.executeScript({target:{tabId:tab.id},files:['engine.js','content.js']}); }
  catch (error) { console.warn('Shadow could not open on this page', error.message); }
});
