/**
 * RTL Page Converter - Background Service Worker
 * Copyright (c) 2025 ES dev. All rights reserved.
 *
 * This background script handles extension installation and provides
 * infrastructure for future functionality enhancements.
 */

// Handle extension installation or update
chrome.runtime.onInstalled.addListener((details) => {
  const version = chrome.runtime.getManifest().version;
  const reason = details.reason;
  
  console.log(`RTL Page Converter (v${version}) ${reason}`);
  
  if (reason === 'install') {
    // First-time installation
    console.log('Thank you for installing RTL Page Converter!');
    
    // Could show an onboarding page or tutorial in the future
    // chrome.tabs.create({ url: 'onboarding.html' });
  } else if (reason === 'update') {
    // Extension was updated
    console.log(`Updated from version ${details.previousVersion} to ${version}`);
  }
});

/**
 * Future functionality could include:
 * - Auto-applying RTL to specific domains
 * - Remembering user preferences per domain
 * - Handling keyboard shortcuts
 * - Providing a settings page
 * - Adding context menu options
 */
