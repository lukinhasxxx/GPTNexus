import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('original');

    useEffect(() => {
        document.body.className = `theme-${theme}`;
    }, [theme]);

    const toggleTheme = (newTheme) => {
        setTheme(newTheme);
        document.body.className = `theme-${newTheme}`;
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}

export default ThemeContext;
