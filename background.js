chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed!!!');
});
  
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'storeData') {
        // Store the scraped data using storage API
        chrome.storage.local.set({ data: request.data });
    }
});
  