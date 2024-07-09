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
             <div className=" relative w-fit  left-[80%] flex flex-col items-center z-10">
            <DarkModeSwitch
                checked={isDark}
                onChange={handleSwitchChange}
                size={80}
            />

        </div>
        <p className="text-5xl left-9 lg:left-0  font-normal  w-fit   relative bottom-10 tracking-tight text-primary dark:text-white lg:text-8xl   ">
          Go {isDark ? 'Light' : 'Dark'}!
        </p>
       
        </div>
    );
};

export default Switcher;
