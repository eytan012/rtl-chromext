https://chromewebstore.google.com/detail/rtl-page-converter/benaigcnejamedbkoolofjlndlphanmp

# RTL Page Converter Chrome Extension

A sleek, modern Chrome extension that converts any webpage to Right-to-Left (RTL) format with a single click. Perfect for reading content in RTL languages or testing website layouts.

## Features

- Convert any webpage to RTL format instantly
- Convert back to LTR format when needed
- Modern, intuitive user interface with a simple toggle switch
- Visual feedback on operations
- Works on any webpage
- Handles text alignment, margins, padding, and float properties

## Repository

This extension is available on GitHub: [https://github.com/eytan012/rtl-chromext](https://github.com/eytan012/rtl-chromext)

## Installation

### Option 1: Install from source

1. Clone this repository:
   ```
   git clone https://github.com/eytan012/rtl-chromext.git
   ```
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" using the toggle in the top-right corner
4. Click "Load unpacked" and select the cloned extension folder
5. The RTL Page Converter extension should now appear in your extensions list

## Usage

1. Navigate to any webpage you want to convert to RTL
2. Click the RTL Page Converter icon in your Chrome toolbar
3. Click the "Apply RTL" button to convert the page to RTL format
4. Click the "Apply LTR" button to convert back to Left-to-Right format
5. The status area will show feedback on the operation

## Technical Details

The extension works by:

- Setting the `dir` attribute to "rtl" on document root elements
- Adjusting text alignment properties (right to left and vice versa)
- Swapping margin and padding values for left/right sides
- Adjusting float properties to maintain proper layout

## Future Improvements

- Remember user preference per domain
- Add a settings page for customizing behavior
- Automatically apply RTL to specific domains on load
- Add keyboard shortcuts
- Support for complex CSS transformations

## License

Proprietary - All rights reserved

## Copyright

© 2025 ES dev. All rights reserved.
