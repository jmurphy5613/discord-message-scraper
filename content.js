chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    console.log("message received")

    if (request.action === 'startScraping') {
        startScraping();
    }
});

function startScraping() {
    const conversation = document.querySelector('.chatContent-3KubbW');
    console.log(conversation)
    if (!conversation) {
        console.log('Conversation element not found.');
        return;
    }

    const messagesFormatted = [];

    let messageCount = 0;

    const observer = new MutationObserver(mutations => {

        let messageItemList = []

        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(addedNode => {
                if (addedNode.classList && addedNode.classList.contains('messageListItem-ZZ7v6g')) {
                    const messageAuthor = addedNode.querySelector('.headerText-2z4IhQ');
                    const messageContent = addedNode.querySelector('.messageContent-2t3eCI');
                    if (messageAuthor) {
                        const messageAuthorName = messageAuthor.textContent.trim();
                        messageItemList.push({ messageType: 'author', messageAuthorName })
                    }
                    if (messageContent) {
                        const messageText = messageContent.textContent.trim();
                        messageItemList.push({ messageType: 'text', messageText })
                        messageCount++;
                    }

                }
            });
        });

        console.log("Message Item List:", messageItemList)

        let messageAuthorName = '';
        let messageText = '';
        for (const messageItem of messageItemList) {
            if (messageItem.messageType === 'author' && messageAuthorName !== '') {
                messagesFormatted.push({ messageAuthorName, messageText })
                messageAuthorName = messageItem.messageAuthorName;
                messageText = '';
            }
            else if (messageItem.messageType === 'author') {
                messageAuthorName = messageItem.messageAuthorName;
            } else {
                messageText = messageText.concat(messageItem.messageText + ". ");
            }
        }

    });

    observer.observe(conversation, { childList: true, subtree: true });

    const scroller = document.querySelector('.scroller-kQBbkU');

    let scrollInterval = setInterval(() => {
        if(scroller.scrollTop !== 0) {
            scroller.scrollTop -= scroller.scrollHeight;
        } else {
            clearInterval(scrollInterval);
            console.log("Scrolling finished");

            chrome.runtime.sendMessage({ action: 'scrapingFinished', messagesFormatted, messageCount });
        }
    }, 500);
}
