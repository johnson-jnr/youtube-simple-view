import { defineConfig } from 'wxt';
import vue from '@vitejs/plugin-vue';

// See https://wxt.dev/api/config.html
export default defineConfig({
    manifest: {
        name: 'Custom settings for YouTube',
        description: 'Allows you to focus while watching youtube',
        version: '0.9.0',
        permissions: ['webNavigation', 'tabs', 'storage', 'scripting'],
        host_permissions: ['*://*.youtube.com/*'],
    },
    imports: {
        addons: {
            vueTemplate: true,
        },
    },
    vite: () => ({
        plugins: [vue()],
        build: {
            // Enabling sourcemaps with Vue during development is known to cause problems with Vue
            sourcemap: false,
        },
    }),
});