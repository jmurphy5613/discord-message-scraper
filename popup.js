document.getElementById('startScraping').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const activeTab = tabs[0];

        // Send a message to the content script to start scraping
        chrome.tabs.sendMessage(activeTab.id, { action: 'startScraping' });
    });
});
