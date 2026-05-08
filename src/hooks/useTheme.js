import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

/**
 * useTheme Hook
 * Manages light and dark theme state.
 * 
 * @returns {[string, Function]} - Current theme and toggle function.
 */
function useTheme() {
  const [theme, setTheme] = useLocalStorage('velora-theme', 'dark');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return [theme, toggleTheme];
}

export default useTheme;
