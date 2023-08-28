import { encode } from 'gpt-3-encoder';

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

	fetch('/data/rawData.json')
		.then(response => response.json())
		.then(data => {
			convertJsonToChunks(data);
		})
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'scrapingFinished') {
		console.log("Scraping finished");
		const messagesFormatted = request.messagesFormatted;
		const messageCount = request.messageCount;

	}
});

const convertJsonToChunks = (json) => {

	/*
	Current chunk protocol:
	- 200 characters max but with a minimum of 2 messages
	*/

	let messageCount = 0;
	let string = ''
	for (const message of json) {
		message.messageText = message.messageText.replace(/\r?\n|\r/g, " ");
		const newMessage = `${message.messageAuthorName}:${message.messageText}` + "\n"
		if (string.length + newMessage < 200 || messageCount < 2) {
			string = string.concat(newMessage)
		} else {
			console.log(string)

			string = newMessage
		}
	}
	console.log(encode(string))
}

