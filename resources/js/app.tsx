import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ReduxProvider } from './Components/Provider/ReduxProvider';
import { ThemeProvider } from './Components/Provider/ThemeProvider';
import { UIProvider } from './Components/Provider/UIProvider';
import { Toaster } from 'react-hot-toast';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ReduxProvider>
                <UIProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="light"
                        storageKey="imarket-theme"
                        enableSystem={true}
                    >
                        <App {...props} />
                        <Toaster
                            position="bottom-right"
                            reverseOrder={false}
                        />
                    </ThemeProvider>
                </UIProvider>
            </ReduxProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
