import { useState, useEffect } from 'react';

/**
 * useWindowSize Hook
 * A custom hook to track the browser window dimensions.
 * Useful for conditional rendering based on screen size.
 * 
 * @returns {Object} - An object containing width and height.
 */
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;
