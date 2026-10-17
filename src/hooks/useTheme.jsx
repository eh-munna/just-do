import { useEffect, useState } from 'react';

const initialTheme = () => {
  if (typeof window === 'undefined') return null;
  const savedTheme = localStorage.getItem('theme');
  return savedTheme
    ? savedTheme
    : document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light';
};

export const useTheme = () => {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    if (!theme) return;
    document.documentElement.classList.toggle('dark', theme === 'dark');

    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.log(error);
    }
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  return { theme, toggleTheme };
};
