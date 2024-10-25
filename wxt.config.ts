import { defineConfig } from 'wxt';
import vue from '@vitejs/plugin-vue';

// See https://wxt.dev/api/config.html
export default defineConfig({
    manifest: {
        name: 'YouTube Simple View: Hide distractions & more',
        description: 'Focus tool for YouTube: control distracting elements and autoplay settings to stay focused.',
        version: '0.9.2',
        permissions: ['webNavigation', 'storage', 'scripting'],
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