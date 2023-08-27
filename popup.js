document.getElementById('startScraping').addEventListener('click', () => {
    console.log("Start scraping");
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const activeTab = tabs[0];
        // Send a message to the content script to start scraping
        chrome.tabs.sendMessage(activeTab.id, { action: 'startScraping' });
    });
});

document.getElementById("demo-data-button").addEventListener('click', () => {
    console.log("Demo data");

    fetch('rawData.json')
    .then(response => response.json()) 
    .then(data => {
        convertJsonToCsv(data);
    })
}); 

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'scrapingFinished') {
        console.log("Scraping finished");
        const messagesFormatted = request.messagesFormatted;
        const messageCount = request.messageCount;
        
    }
});

const convertJsonToCsv = (json) => {
    console.log(json)
}

