import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <span className="h-9 w-9" aria-hidden />;
    }

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="group flex h-9 w-9 items-center justify-center rounded-md border border-warm bg-surface text-secondary transition-all hover:border-cinnabar hover:text-cinnabar"
            aria-label="切换深浅色主题"
        >
            <span className="transition-transform duration-500 group-hover:rotate-[135deg]">
                {theme === 'dark' ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
            </span>
        </button>
    );
}
