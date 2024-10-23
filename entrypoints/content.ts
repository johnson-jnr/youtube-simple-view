import './style.sass';
import { storage } from 'wxt/storage';
import ytUtil from '@/utils/helper';
import ytStore from '@/utils/store';
import { StoreItemKey } from '@/utils/enum';

export default defineContentScript({
    matches: ['*://*.youtube.com/*'],
    runAt: 'document_start',
    main() {
        let timeoutID: NodeJS.Timeout | null = null;
        const util = ytUtil();
        const store = ytStore();

        initFocusModes();
        registerEventListener();

        function initFocusModes(): void {
            initAutoPlayFocus();
            initSidebarFocusMode();
            initCommentFocusMode();
            initSuggestionsFocusMode();
            initNavigationFocusMode();
        }

        function initAutoPlayFocus(): void {
            if (util.getCurrentUrl().includes('watch')) {
                enableAutoPlayFocusMode();
            } else {
                cleanupTimer();
            }
        }

        function cleanupTimer(): void {
            if (!timeoutID) return;
            clearTimeout(timeoutID);
            timeoutID = null;
        }

        async function enableAutoPlayFocusMode(): Promise<void> {
            const isActive = await store.getStoreItem(StoreItemKey.DisableAutoPlay);
            setupAutoPlayFocusMode(isActive);

            storage.watch<boolean>(`local:${StoreItemKey.DisableAutoPlay}`, (val: boolean | null) => {
                setupAutoPlayFocusMode(val);
            });
        }

        async function initSidebarFocusMode(): Promise<void> {
            const isActive = await store.getStoreItem(StoreItemKey.HideSidebar);
            setupSidebarFocusMode(isActive);

            storage.watch<boolean>(`local:${StoreItemKey.HideSidebar}`, (val: boolean | null) => {
                setupSidebarFocusMode(val);
                if (val) {
                    window.scrollTo({ top: 0 });
                }
            });
        }

        async function initCommentFocusMode(): Promise<void> {
            const isActive = await store.getStoreItem(StoreItemKey.HideComment);
            setupCommentFocusMode(isActive);

            storage.watch<boolean>(`local:${StoreItemKey.HideComment}`, (val: boolean | null) => {
                setupCommentFocusMode(val);
                if (val) {
                    window.scrollTo({ top: 0 });
                }
            });
        }

        async function initSuggestionsFocusMode(): Promise<void> {
            const isActive = await store.getStoreItem(StoreItemKey.HideEndScreens);
            setupSuggestionsFocusMode(isActive);

            storage.watch<boolean>(`local:${StoreItemKey.HideEndScreens}`, (val: boolean | null) => {
                setupSuggestionsFocusMode(val);
            });
        }

        async function initNavigationFocusMode(): Promise<void> {
            const isActive = await store.getStoreItem(StoreItemKey.HideEndNav);
            setupNavigationFocusMode(isActive);

            storage.watch<boolean>(`local:${StoreItemKey.HideEndNav}`, (val: boolean | null) => {
                setupNavigationFocusMode(val);
            });
        }

        function uncheckAutoReplay(retry = 0, maxTimeout = 10): void {
            if (retry > maxTimeout) {
                cleanupTimer();
                return;
            }

            if (!util.isAutoPlayBtnInteractive()) {
                timeoutID = setTimeout(() => {
                    uncheckAutoReplay(retry + 1);
                }, 1000);
            } else {
                if (util.isAutoPlayBtnChecked()) {
                    util.getAutoPlayButtonEl()?.click();
                }
                cleanupTimer();
            }
        }

        function setupAutoPlayFocusMode(isActive: boolean | null): void {
            if (isActive) {
                uncheckAutoReplay();
            }
        }

        function setupSidebarFocusMode(isActive: boolean | null): void {
            if (isActive) {
                util.addSidebarFocusClass();
            } else {
                util.removeSidebarFocusClass();
            }
        }

        function setupCommentFocusMode(isActive: boolean | null): void {
            if (isActive) {
                util.addCommentFocusClass();
            } else {
                util.removeCommentFocusClass();
            }
        }

        function setupSuggestionsFocusMode(isActive: boolean | null): void {
            if (isActive) {
                util.addSuggestionsFocusClass();
            } else {
                util.removeSuggestionsFocusClass();
            }
        }

        function setupNavigationFocusMode(isActive: boolean | null): void {
            if (isActive) {
                util.addNavigationFocusClass();
            } else {
                util.removeNavigationFocusClass();
            }
        }

        function registerEventListener(): void {
            window.addEventListener('load', () => {
                browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
                    if (message.action.onNavigate) {
                        initAutoPlayFocus();
                    }
                });
            });
        }
    },
});
