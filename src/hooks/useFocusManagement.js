import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook to manage focus on route changes for accessibility
 * Resets focus to the first focusable element on the page when navigating
 */
export const useFocusManagement = () => {
  const location = useLocation();
  const mainContentRef = useRef(null);

  useEffect(() => {
    // Small delay to ensure DOM is updated after route change
    const timeoutId = setTimeout(() => {
      const focusFirstElement = () => {
        // Try to focus the main content area first
        if (mainContentRef.current) {
          mainContentRef.current.focus();
          return;
        }

        // Fallback: find the first focusable element in the main content
        const mainElement = document.getElementById('content');
        if (mainElement) {
          // Strategy 1: Look for the first heading (h1) as it's typically the first meaningful content
          const firstHeading = mainElement.querySelector('h1');
          if (firstHeading) {
            firstHeading.setAttribute('tabindex', '-1');
            firstHeading.focus();
            return;
          }

          // Strategy 2: Look for the first interactive element (links, buttons, etc.)
          const interactiveElements = mainElement.querySelectorAll(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );
          
          if (interactiveElements.length > 0) {
            interactiveElements[0].focus();
            return;
          }

          // Strategy 3: Look for any heading (h1-h6) as fallback
          const anyHeading = mainElement.querySelector('h1, h2, h3, h4, h5, h6');
          if (anyHeading) {
            anyHeading.setAttribute('tabindex', '-1');
            anyHeading.focus();
            return;
          }

          // Last resort: focus the main element itself
          mainElement.focus();
        }
      };

      // Only focus if the page is visible (not in background tab)
      if (document.visibilityState === 'visible') {
        focusFirstElement();
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  return mainContentRef;
};
