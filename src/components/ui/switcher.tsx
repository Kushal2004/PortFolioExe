import React, { useEffect, useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const Switcher: React.FC = () => {
    const [isDark, setIsDark] = useState<boolean>(() => {
        if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
            return localStorage.getItem('theme') === 'dark';
        }
        return true; // Default to dark mode if no theme is set in localStorage
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const handleSwitchChange = (checked: boolean) => {
        setIsDark(checked);
    };

    return (
        <div className="m-16 flex flex-col items-center">
            <DarkModeSwitch
                checked={isDark}
                onChange={handleSwitchChange}
                size={56}
            />
            <h3 className="text-gray-800 dark:text-gray-300 pt-4">
                {isDark ? 'Dark mode' : 'Light mode'}
            </h3>
        </div>
    );
};

export default Switcher;
