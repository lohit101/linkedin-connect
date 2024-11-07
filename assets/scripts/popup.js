// get all required elements and define variables
const connectButton = document.getElementById("connect");
const stopButton = document.getElementById("stop");
const statusDiv = document.getElementById("status");
const loader = document.getElementById("loader");
const counter = document.getElementById("counter");
const reqNumberInput = document.getElementById("reqNumber");

let isStopped = false;
let sentCount = 0;
let maxRequests = Infinity; // default to maximum requests

// listen for changes to reqNumber input
reqNumberInput.addEventListener("input", () => {
    // update maxRequests based on input value or default to maximum
    maxRequests = reqNumberInput.value ? parseInt(reqNumberInput.value, 10) : Infinity;
});

connectButton.addEventListener("click", async () => {
    const tabId = await getCurrentTabId();
    isStopped = false;
    sentCount = 0;

    // enable stop button, disable connect button, and show loader
    connectButton.disabled = true;
    connectButton.classList.add("hidden");
    stopButton.disabled = false;
    stopButton.classList.remove("hidden");
    loader.classList.remove("hidden");
    statusDiv.innerText = "Sending connection requests...";

    // manually inject content script and start sending requests with maxRequests
    chrome.scripting.executeScript(
        {
            target: { tabId: tabId },
            files: ["assets/scripts/content.js"]
        },
        () => {
            if (chrome.runtime.lastError) {
                // handle errors
                console.error("Error injecting content script:", chrome.runtime.lastError);
                alert("Please make sure you are on a LinkedIn page and try again.");
                connectButton.disabled = false;
                stopButton.disabled = true;
                loader.classList.add("hidden");
                statusDiv.innerText = "Error: Content script not loaded.";
            } else {
                // send maxRequests to content.js
                chrome.tabs.sendMessage(tabId, { action: "start", maxRequests: maxRequests });
            }
        }
    );
});

stopButton.addEventListener("click", async () => {
    const tabId = await getCurrentTabId();
    isStopped = true;

    // disable stop button, enable connect button, and hide loader
    connectButton.disabled = false;
    connectButton.classList.remove("hidden");
    stopButton.disabled = true;
    stopButton.classList.add("hidden");
    loader.classList.add("hidden");
    statusDiv.innerText = `Finished with ${sentCount} requests.`;

    // stop content script
    chrome.tabs.sendMessage(tabId, { action: "stop" });
});

// get current tab info
async function getCurrentTabId() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab.id;
}

chrome.runtime.onMessage.addListener((message) => {
    // update counter from messages sent by content.js
    if (message.type === "updateCounter") {
        sentCount = message.count;
        counter.innerText = `Sent: ${sentCount}`;
    }
    // update status sent by content.js
    if (message.type === "statusFinished") {
        sentCount = message.count;
        counter.innerText = `Sent: ${sentCount}`;
        isStopped = true;

        // disable stop button, enable connect button, and hide loader
        connectButton.disabled = false;
        connectButton.classList.remove("hidden");
        stopButton.disabled = true;
        stopButton.classList.add("hidden");
        loader.classList.add("hidden");
        statusDiv.innerText = `Finished with ${sentCount} requests.`;
    }
});
