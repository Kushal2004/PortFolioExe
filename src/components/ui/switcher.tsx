import React, { useState, useEffect } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const useDarkSide = () => {
    const [theme, setTheme] = useState<string>(
        typeof window !== 'undefined' && localStorage.theme ? localStorage.theme : 'light'
    );
    const colorTheme = theme === 'dark' ? 'light' : 'dark';

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const root = window.document.documentElement;
            root.classList.remove(colorTheme);
            root.classList.add(theme);

            // Save theme to Local Storage
            localStorage.setItem('theme', theme);
        }
    }, [theme, colorTheme]);

    return [colorTheme, setTheme] as const;
};

const Switcher: React.FC = () => {
    const [colorTheme, setTheme] = useDarkSide();
    const [darkSide, setDarkSide] = useState<boolean>(colorTheme === "light");

    const toggleDarkMode = (checked: boolean) => {
        setTheme(colorTheme);
        setDarkSide(checked);
    };

    return (
        <div className="m-16 flex flex-col items-center">
            <DarkModeSwitch
                checked={darkSide}
                onChange={toggleDarkMode}
                size={56}
            />
            <h3 className="text-gray-800 dark:text-gray-300 pt-4">
                {colorTheme === 'light' ? "Dark mode" : "Light mode"}
            </h3>
        </div>
    );
};

export default Switcher;
