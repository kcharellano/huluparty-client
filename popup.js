const WINDOW_ID = 0;
const QUERY_OPT = {active: true, currentWindow: true};
const EXEC_OPT = {file: 'content.js'}

let createButton = document.getElementById("SessionButton");

// Start running here. 
chrome.tabs.query(QUERY_OPT, (tabs) => {
    //Run content script
    let sendMessage = function sendMessage(message) {
        chrome.tabs.sendMessage(tabs[WINDOW_ID].id, message);
    }

    chrome.tabs.executeScript(tabs[WINDOW_ID].id, EXEC_OPT, () => {
        createButton.addEventListener('click', (eventObj) => {
            sendMessage("POPUP");
        });
    });
});
