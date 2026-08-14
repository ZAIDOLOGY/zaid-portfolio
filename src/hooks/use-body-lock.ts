import { useEffect } from 'react';

/**
 * Disables document body scrolling when a modal or drawer is open.
 */
export function useBodyLock(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      // Prevent scrolling
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      
      // Cleanup
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isLocked]);
}
