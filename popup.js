const WINDOW_ID = 0;
const QUERY_OPT = {active: true, currentWindow: true};
const EXEC_OPT = {file: 'content.js'}
const PARAM_INDEX = 1;
const SESSIONID_INDEX = 1;

let createButton = document.getElementById("CreateButton");
let joinButton = document.getElementById("JoinButton");
let testButton = document.getElementById("testButton");

// Get current tab 
chrome.tabs.query(QUERY_OPT, (tabs) => {
    let sendMessage = function sendMessage(message) {
        chrome.tabs.sendMessage(tabs[WINDOW_ID].id, message);
    }
    //Run content script
    chrome.tabs.executeScript(tabs[WINDOW_ID].id, EXEC_OPT, () => {
        //Create listeners for popup inputs
        
        createButton.addEventListener('click', (eventObj) => {
            let message = {"request": "create-session"};
            sendMessage(message);
        });

        joinButton.addEventListener('click', (eventObj) => {
            let message = {
                "request": "join-session",
                "data": document.getElementById('joinTextBox').value.split('?')[PARAM_INDEX].split('=')[SESSIONID_INDEX]
            };
            sendMessage(message);
        });

        testButton.addEventListener('click', (eventObj) => {
            let message = {
                "request": "test"
            };
            sendMessage(message);
        });
    });
});

// Receive messages from content script
chrome.runtime.onMessage.addListener((message, sender, callback) => {
    document.getElementById('createTextBox').value = message;
});