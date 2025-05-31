/**
 * RTL Page Converter
 * Copyright (c) 2025 ES dev. All rights reserved.
 */

// Function to get the current active tab
function getCurrentTab() {
  return chrome.tabs.query({ active: true, currentWindow: true });
}

// Function to update status with visual feedback
function updateStatus(message, type = 'info') {
  const statusElement = document.getElementById('status');
  statusElement.textContent = message;
  
  // Reset classes
  statusElement.classList.remove('success', 'error');
  
  // Add appropriate class based on message type
  if (type === 'success') {
    statusElement.classList.add('success');
  } else if (type === 'error') {
    statusElement.classList.add('error');
  }
  
  // Clear status after delay
  if (message) {
    setTimeout(() => {
      statusElement.textContent = '';
      statusElement.classList.remove('success', 'error');
    }, 2000);
  }
}

// Function to inject and execute script in the current tab
function executeScript(direction) {
  updateStatus('Processing...', 'info');
  
  getCurrentTab().then(tabs => {
    const activeTab = tabs[0];
    
    chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      function: applyDirection,
      args: [direction]
    }).then((results) => {
      if (results && results[0] && results[0].result) {
        updateStatus(`${direction.toUpperCase()} applied successfully!`, 'success');
      } else {
        updateStatus('Could not apply direction change', 'error');
      }
    }).catch(error => {
      updateStatus(`Error: ${error.message}`, 'error');
      console.error('Script execution failed:', error);
    });
  }).catch(error => {
    updateStatus('Could not access the active tab', 'error');
    console.error('Tab access failed:', error);
  });
}

// Function that will be injected into the page
function applyDirection(direction) {
  try {
    // Set direction on root elements
    document.documentElement.dir = direction;
    document.body.dir = direction;
    
    // Apply RTL to all elements with text alignment
    const elements = document.querySelectorAll('*');
    let count = 0;
    
    elements.forEach(el => {
      const style = window.getComputedStyle(el);
      
      // Handle text alignment
      if (style.textAlign === 'left' && direction === 'rtl') {
        el.style.textAlign = 'right';
        count++;
      } else if (style.textAlign === 'right' && direction === 'ltr') {
        el.style.textAlign = 'left';
        count++;
      }
      
      // Handle float properties
      if (style.float === 'left' && direction === 'rtl') {
        el.style.float = 'right';
        count++;
      } else if (style.float === 'right' && direction === 'ltr') {
        el.style.float = 'left';
        count++;
      }
      
      // Handle margin and padding
      if (direction === 'rtl') {
        if (style.marginLeft && style.marginLeft !== '0px') {
          el.style.marginRight = style.marginLeft;
          el.style.marginLeft = style.marginRight;
          count++;
        }
        if (style.paddingLeft && style.paddingLeft !== '0px') {
          el.style.paddingRight = style.paddingLeft;
          el.style.paddingLeft = style.paddingRight;
          count++;
        }
      } else if (direction === 'ltr') {
        if (style.marginRight && style.marginRight !== '0px') {
          el.style.marginLeft = style.marginRight;
          el.style.marginRight = style.marginLeft;
          count++;
        }
        if (style.paddingRight && style.paddingRight !== '0px') {
          el.style.paddingLeft = style.paddingRight;
          el.style.paddingRight = style.paddingLeft;
          count++;
        }
      }
    });
    
    console.log(`RTL Page Converter: Applied ${direction} direction to ${count} elements`);
    return true;
  } catch (error) {
    console.error('RTL Page Converter error:', error);
    return false;
  }
}

// Function to check the current direction of the page
function checkCurrentDirection() {
  return new Promise((resolve) => {
    getCurrentTab().then(tabs => {
      const activeTab = tabs[0];
      
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        function: () => document.documentElement.dir || document.body.dir || 'ltr'
      }).then(results => {
        if (results && results[0]) {
          resolve(results[0].result);
        } else {
          resolve('ltr'); // Default to LTR if we can't determine
        }
      }).catch(() => {
        resolve('ltr'); // Default to LTR on error
      });
    }).catch(() => {
      resolve('ltr'); // Default to LTR if we can't access the tab
    });
  });
}

// Add event listeners when the popup is loaded
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('directionToggle');
  
  // Check the current direction when popup opens
  checkCurrentDirection().then(direction => {
    // Set the toggle to match the current page direction
    toggle.checked = direction === 'rtl';
  });
  
  // Toggle switch event listener
  toggle.addEventListener('change', () => {
    const direction = toggle.checked ? 'rtl' : 'ltr';
    executeScript(direction);
  });
  
  // Check if we can access the current tab
  getCurrentTab().catch(error => {
    updateStatus('Cannot access tabs. Try refreshing the page.', 'error');
    console.error('Initial tab access failed:', error);
  });
});
