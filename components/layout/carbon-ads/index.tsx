"use client";
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import * as React from 'react';

interface CarbonAdsProps {
    className?: string;
}

export default function CarbonAds({ className }: CarbonAdsProps) {
    const router = useRouter();
    const [showing, setShowing] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(true);
    const adLoadedRef = React.useRef(false);
    const routeRef = React.useRef("");

    const cleanupAllAds = () => {
        const scripts = document.querySelectorAll('script[src*="carbonads"]');
        scripts.forEach(script => {
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        });

        const ads = document.querySelectorAll('#carbonads');
        ads.forEach(ad => {
            if (ad.parentNode) {
                ad.parentNode.removeChild(ad);
            }
        });

        const styles = document.getElementById('carbon-styles');
        if (styles && styles.parentNode) {
            styles.parentNode.removeChild(styles);
        }
    };

    const cleanupAd = () => {
        const existingScript = document.getElementById('_carbonads_js');
        if (existingScript && existingScript.parentNode) {
            existingScript.parentNode.removeChild(existingScript);
        }

        const existingAd = document.querySelector('#carbon-container #carbonads');
        if (existingAd && existingAd.parentNode) {
            existingAd.parentNode.removeChild(existingAd);
        }
    };

    React.useEffect(() => {
        cleanupAllAds();

        if (!adLoadedRef.current) {
            loadAd();
        }

        const handleThemeChange = () => {
            applyCarbonTheme();
        };

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', handleThemeChange);

        applyCarbonTheme();

        if (typeof window !== 'undefined') {
            routeRef.current = window.location.pathname;
        }

        return () => {
            mediaQuery.removeEventListener('change', handleThemeChange);
            cleanupAd();
        };
    }, [router]);

    React.useEffect(() => {
        const checkRouteChange = () => {
            const currentRoute = window.location.pathname;

            if (routeRef.current !== currentRoute) {
                routeRef.current = currentRoute;
                cleanupAllAds();
                loadAd();
            }
        };

        window.addEventListener('popstate', checkRouteChange);

        return () => {
            window.removeEventListener('popstate', checkRouteChange);
        };
    }, []);

    const applyCarbonTheme = () => {
        setTimeout(() => {
            const carbonAd = document.querySelector('#carbonads');
            if (carbonAd) {
                carbonAd.classList.remove('carbon-dark', 'carbon-light');

                const isDarkMode =
                    document.documentElement.classList.contains('dark') ||
                    window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (isDarkMode) {
                    carbonAd.classList.add('carbon-dark');
                } else {
                    carbonAd.classList.add('carbon-light');
                }
            }
        }, 100);
    };

    const loadAd = () => {
        cleanupAd();

        const carbonContainer = document.getElementById('carbon-container');
        if (!carbonContainer) return;

        carbonContainer.innerHTML = '';

        const style = document.createElement('style');
        style.id = 'carbon-styles';
        style.textContent = `
      #carbonads {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial, sans-serif;
        display: block;
        overflow: hidden;
        margin-bottom: 0;
        max-width: 100%;
        border-radius: 4px;
        box-shadow: 0 1px 2px hsla(0, 0%, 0%, .05);
        background-color: hsl(0, 0%, 98%);
        font-size: 12px;
        line-height: 1.4;
        color: #333333;
        border-radius: 4px;
      }

      #carbonads a {
        text-decoration: none;
        color: inherit;
      }

      #carbonads.carbon-dark {
        color: #e8e8e8;
        background-color: #1c1c1c;
      }

      #carbonads.carbon-light {
        color: #333333;
        background-color: hsl(0, 0%, 98%);
      }

      #carbonads span {
        position: relative;
        display: block;
        overflow: hidden;
      }

      .carbon-img {
        display: block;
        margin: 0 auto;
        line-height: 1;
      }

      .carbon-img img {
        display: block;
        margin: 0 auto;
        max-width: 100% !important;
        width: 100%;
        height: auto;
      }

      .carbon-text {
        display: block;
        padding: 6px;
        line-height: 1.2;
      }

      .carbon-poweredby {
        display: block;
        padding: 4px;
        background: rgba(128, 128, 128, .15);
        text-align: center;
        font-size: 8px;
        letter-spacing: .5px;
        border-radius: 4px;
      }

      .carbon-dark .carbon-poweredby {
        background: rgba(200, 200, 200, .15);
      }

      .carbon-light .carbon-poweredby {
        background: rgba(128, 128, 128, .15);
      }
    `;

        if (!document.getElementById('carbon-styles')) {
            document.head.appendChild(style);
        }

        const script = document.createElement('script');
        script.src =
            'https://cdn.carbonads.com/carbon.js?serve=CW7I6K7U&placement=wwwmanishtamangcom&format=rect';
        script.id = '_carbonads_js';
        script.async = true;
        script.defer = true;

        carbonContainer.appendChild(script);

        script.addEventListener('load', () => {
            setShowing(true);
            adLoadedRef.current = true;
            applyCarbonTheme();
        });
    };


    if (!isVisible) {
        return null;
    }

    return (
        <div
            className={clsx(
                'rounded-[4px] w-44 sm:w-44 max-w-44 z-10 bg-white dark:bg-neutral-900',
                className
            )}
        >

            <div id="carbon-container" className="w-44 h-54 flex justify-center bg-[#1c1c1c] dark:bg-neutral-900"></div>

            {showing && (
                <div className="px-1 pb-1 pt-0.5">
                    <span className="block text-center text-xs text-gray-500 dark:text-gray-400">
                        1 Click Supports this site
                    </span>
                </div>
            )}
        </div>
    );
}