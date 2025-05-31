
**Goal:**
I want to build a simple Chrome extension that forces the UI of any webpage to display in **Right-to-Left (RTL)** format. The extension should allow users to click an icon in the browser, and the page will immediately flip its layout direction to RTL.

---

### ✅ Step-by-Step Guide:

1. **Create a Project Folder**

   * Name it something like `rtl-extension`.

2. **Create `manifest.json` File**

   * This file will define the extension settings.
   * Use Manifest Version 3.
   * Add permissions for `"scripting"` and `"activeTab"`.
   * Define an action with a popup and icon.
   * Optionally, define a background script.

3. **Create a Popup UI (`popup.html`)**

   * This HTML file will include a simple button labeled “Apply RTL”.
   * When clicked, it will trigger a script that sets `document.body.dir = 'rtl'`.

4. **Write Logic in `popup.js`**

   * Add JavaScript that:

     * Gets the current active tab.
     * Injects a script into the page to change its text direction to `rtl`.

5. **Create a 128x128 Icon (`icon.png`)**

   * This will be used as the extension icon.

6. **(Optional)** Add a `background.js` file

   * In case you want to expand functionality later (like auto-apply RTL on certain domains).

7. **Load the Extension into Chrome**

   * Go to `chrome://extensions/`
   * Enable Developer Mode
   * Click “Load unpacked” and choose your extension folder

8. **Test the Extension**

   * Open any webpage
   * Click your extension icon
   * Press the button to apply RTL and verify that the page direction changes

---

### 🛠 Optional Improvements

* Add a toggle between LTR and RTL.
* Remember user preference per domain.
* Add a settings page for customizing behavior.
* Automatically apply RTL to specific domains on load.

---

If you want, I can turn this into a `.md` file or ZIP the full example code for you. Would you like that?
