// define all required variables
let isStopped = false;
let sentCount = 0;
let maxRequests = Infinity;

// handle start and stop requests
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "start") {
        isStopped = false;
        sentCount = 0;
        maxRequests = message.maxRequests || Infinity; // set maximum requests or default to maximum
        sendConnectionRequests();
    } else if (message.action === "stop") {
        isStopped = true;
    }
});

async function sendConnectionRequests() {
    const buttons = Array.from(document.querySelectorAll('button'))
        .filter(button => button.innerText.includes("Connect") && !button.disabled); // find connect buttons out of all buttons on the page

    if (buttons.length === 0) {
        // handle errors if no connect button is found
        alert("No connection requests found on this page.");
        return;
    }

    // function to send single connection request
    async function sendRequest(button) {
        button.click();
        sentCount++;

        // handle confirmation dialog (if it appears)
        setTimeout(() => {
            const confirmButton = document.querySelector('button[aria-label="Send now"]');
            if (confirmButton) {
                confirmButton.click();
            }
        }, 500);

        // send updated count to popup.js
        chrome.runtime.sendMessage({ type: "updateCounter", count: sentCount });
        console.log(`Sent connection request #${sentCount}`);
    }

    // loop through each button with 5 second interval
    for (let i = 0; i < buttons.length && sentCount < maxRequests; i++) {
        if (isStopped) {
            console.log("Stopped sending requests");
            break;
        }
        await sendRequest(buttons[i]);
        await new Promise(resolve => setTimeout(resolve, 5000)); // use of promise resolution instead of interval for optimized performance
    }

    // return finished status to popup.js
    if (!isStopped) {
        chrome.runtime.sendMessage({ type: "statusFinished", count: sentCount });
    }
}
