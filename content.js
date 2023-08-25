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



    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(addedNode => {
                if (addedNode.classList && addedNode.classList.contains('messageListItem-ZZ7v6g')) {
                    const messageContent = addedNode.querySelector('.contents-2MsGLg');
                    if (messageContent) {
                        const messageText = messageContent.textContent.trim();
                        console.log('Message:', messageText);
                    }
                }
            });
        });
    });

    observer.observe(conversation, { childList: true, subtree: true });

    const scroller = document.querySelector('.scroller-kQBbkU');

    setInterval(() => {
        scroller.scrollTop -= scroller.scrollHeight;
    }, 5000);
}
