# SalesRobot - LinkedIn Connect

**LinkedIn Connect** is a Chrome extension that automates sending connection requests to people listed on a LinkedIn page. It allows you to specify the maximum number of connection requests to send and provides the ability to stop the process at any time. It makes sure that the connection requests are sent every 5-10 seconds so your account does not get suspended.

### Features

- **Automated Requests**: Send connection requests to all visible users on a LinkedIn search or list page.
- **Request Limit**: Specify the number of requests you want to send in one session.
- **Request Interval**: Sends new connection request every 5-10 seconds to keep your linkedin account safe.
- **Stop Control**: A button to stop sending requests immediately if needed.
- **Request Counter**: Displays a count of successfully sent requests in real-time.
- **Loader Animation**: Shows a loading icon while the extension is sending requests.

## Demo

Here’s a preview of the extension in action:

![SalesRobot - LinkedIn Connect in Action](assets/img/demo.gif)

This GIF demonstrates the extension sending connection requests on LinkedIn automatically, following the specified request limit and interval settings.

---

## Directory Structure

```
salesrobot-linkedinconnect/
├── manifest.json
├── popup.html
├── assets/
│   ├── scripts/
│   │   ├── content.js
│   │   ├── popup.js
│   ├── styles/
│   │   ├── popup.css
│   ├── img/
│   │   ├── logo.png
```

---

## Prerequisites

- **Google Chrome**: This extension is built for Chrome; ensure you have the latest version installed.
- **LinkedIn Account**: Ensure you are logged in to LinkedIn and on a page with connectable user profiles.

---

## Installation

1. **Download the Source Code**:
   - Clone this repository or download it as a ZIP file, then unzip it on your machine.

2. **Load the Extension in Chrome**:
   - Open **Google Chrome** and navigate to `chrome://extensions/`.
   - Enable **Developer Mode** (toggle in the top-right corner).
   - Click **Load unpacked** and select the folder where you downloaded the extension.

3. **Verify Installation**:
   - You should now see the **SalesRobot - LinkedIn Connect** icon in your Chrome extensions bar.

---

## Usage Instructions

1. **Open LinkedIn**:
   - Go to a LinkedIn page with a list of people you want to connect with, such as a search results page, "People You May Know" section, or a company’s employees list.

2. **Open the Extension Popup**:
   - Click the **SalesRobot - LinkedIn Connect** icon in the extensions bar to open the extension popup.

3. **Set the Maximum Requests**:
   - In the popup window, you’ll see an input box.
   - Enter a number (e.g., `10`) to limit the number of connection requests to that specific count. Leaving this field blank will send requests to all connectable users on the page.

4. **Start Sending Requests**:
   - Click the **Connect** button. The extension will begin sending connection requests to the listed people, one request every 5-10 seconds. 
   - A loader icon will appear, and a counter will increment each time a request is sent.

5. **Monitor Progress**:
   - The real-time counter shows the number of requests sent so far.
   - To stop the process, click the **Stop** button. This will immediately stop sending requests.

6. **Completion**:
   - Once all requests are sent or the specified limit is reached, the extension will display a message indicating completion.

---

## Important Notes

- **Page Requirements**: Make sure you’re on a LinkedIn page that has connectable people profiles. The extension only works on LinkedIn domains.
- **Rate Limits**: LinkedIn may limit the number of connection requests you can send in a day. Be mindful not to exceed these limits to avoid restrictions.
- **Error Handling**: If an error occurs (e.g., no connection buttons found), the extension will display an alert. Ensure you are on a valid LinkedIn page with connectable users.

---

## Troubleshooting

If the extension is not working as expected, consider the following:

1. **Check Permissions**: Ensure the extension has permissions for `https://www.linkedin.com/*`.
2. **Reload the Extension**: Go to `chrome://extensions/`, disable and re-enable the extension, or click **Reload**.
3. **Console Logs**: For developers, open the console to view log messages that may provide insight into any issues.

---

## Technologies Used

- **HTML & CSS**: Popup and basic styling (with Tailwind CSS).
- **JavaScript**: Core functionality for sending requests.
- **Chrome Extensions API**: Integrates with LinkedIn using Chrome's scripting and messaging APIs.

---

## License

This project is open-source and available under the MIT License.
