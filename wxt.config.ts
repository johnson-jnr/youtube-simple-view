import { defineConfig } from 'wxt';
import vue from '@vitejs/plugin-vue';

// See https://wxt.dev/api/config.html
export default defineConfig({
    manifest: {
        name: 'YouTube Simple View (Hide Sidebar and more)',
        description: 'Customize your YouTube experience with settings and features to enhance your focus',
        version: '0.9.1',
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