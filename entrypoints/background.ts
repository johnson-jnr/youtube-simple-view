import { storage } from 'wxt/storage';
import ytStore from '@/utils/store';

export default defineBackground({
    main() {
        const store = ytStore().init();

        registerOnInstallListener();
        registerOnNavigationListener();
        registerGetStoreItemListener();
        registerUpdateStoreItemListener();

        function registerOnInstallListener() {
            browser.runtime.onInstalled.addListener((details) => {
                for (let key of Object.keys(store)) {
                    storage.setItem(`local:${key}`, true);
                }
            });
        }

        function registerOnNavigationListener() {
            browser.webNavigation.onHistoryStateUpdated.addListener(
                async (details) => {
                    try {
                        await browser.tabs.sendMessage(details.tabId, {
                            action: { onNavigate: true },
                            url: details.url,
                        });
                    } catch (e) {
                        if (String(e)?.includes('Receiving end does not exist')) {
                            browser.scripting.executeScript({
                                target: { tabId: details.tabId },
                                files: ['content-scripts/content.js'],
                            });
                            browser.scripting.insertCSS({
                                target: { tabId: details.tabId },
                                files: ['content-scripts/content.css'],
                            });
                        }
                    }
                },
                {
                    url: [{ hostContains: '.youtube.com' }],
                },
            );
        }

        function registerGetStoreItemListener() {
            browser.runtime.onMessage.addListener(
                (message: { action: string; key: string; value?: any }, sender, sendResponse: any) => {
                    if (message.action === 'getItem' && message.key) {
                        if (!store.hasOwnProperty(message.key)) {
                            return;
                        }

                        /**
                         * Check if we have the item in memory
                         * If not, fetch it from storage
                         */
                        if (store[message.key]) {
                            sendResponse({ data: store[message.key] });
                        } else {
                            storage.getItem<any>(`local:${message.key}`).then((val) => {
                                store[message.key] = val;
                                sendResponse({ data: store[message.key] });
                            });
                        }
                        return true; //return true to keep the callback active until response is ready
                    }
                },
            );
        }

        function registerUpdateStoreItemListener() {
             browser.runtime.onMessage.addListener(
                (message: { action: string; key: string; value?: any }, sender, sendResponse: any) => {
                    if (message.action === 'updateItem') {
                        if (!store.hasOwnProperty(message.key)) {
                            return;
                        }
                        if (message.key) {
                            store[message.key] = message.value;
                            storage.setItem(`local:${message.key}`, message.value).then((val) => {
                                sendResponse({ success: true });
                            });
                            return true; //return true to keep the callback active until response is ready
                        }
                    }
                },
            );
        }
    },
});
