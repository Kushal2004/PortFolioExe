import React, { useEffect, useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { isDarkGlobe } from '../cards/GlobeCard';

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
        // Additional logic to refresh the globe based on the theme change
        isDarkGlobe();
    };

    return (
        <div>
        <p className="text-xl font-normal tracking-tight text-primary dark:text-white lg:text-8xl  flex ">
          Go {isDark ? 'Light' : 'Dark'}!
        </p>
        <div className="mt-10  flex flex-col items-center">
            <DarkModeSwitch
                checked={isDark}
                onChange={handleSwitchChange}
                size={80}
            />

        </div>
        </div>
    );
};

export default Switcher;
