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
            initYTSuggestionsFocusMode();
            initChannelSuggestionsFocusMode();
            initNavigationFocusMode();
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

        async function initYTSuggestionsFocusMode(): Promise<void> {
            const isActive = await store.getStoreItem(StoreItemKey.HideYTSuggestions);
            setupYTSuggestionsFocusMode(isActive);

            storage.watch<boolean>(`local:${StoreItemKey.HideYTSuggestions}`, (val: boolean | null) => {
                setupYTSuggestionsFocusMode(val);
            });
        }

        async function initChannelSuggestionsFocusMode(): Promise<void> {
            const isActive = await store.getStoreItem(StoreItemKey.HideChannelSuggestions);
            setupChannelSuggestionsFocusMode(isActive);

            storage.watch<boolean>(`local:${StoreItemKey.HideChannelSuggestions}`, (val: boolean | null) => {
                setupChannelSuggestionsFocusMode(val);
            });
        }

        async function initNavigationFocusMode(): Promise<void> {
            const isActive = await store.getStoreItem(StoreItemKey.HideEndScreenNav);
            setupNavigationFocusMode(isActive);

            storage.watch<boolean>(`local:${StoreItemKey.HideEndScreenNav}`, (val: boolean | null) => {
                setupNavigationFocusMode(val);
            });
        }

        async function initAutoPlayFocus(): Promise<void> {
            if (util.getCurrentUrl().includes('watch')) {
                const isActive = await store.getStoreItem(StoreItemKey.DisableAutoPlay);
                setupAutoPlayFocusMode(isActive);

                storage.watch<boolean>(`local:${StoreItemKey.DisableAutoPlay}`, (val: boolean | null) => {
                    setupAutoPlayFocusMode(val);
                });
            } else {
                cleanupTimer();
            }
        }

        function uncheckAutoReplay(retries = 10): void {
            if (retries < 0) {
                cleanupTimer();
                return;
            }

            if (!util.isAutoPlayBtnInteractive()) {
                timeoutID = setTimeout(() => {
                    uncheckAutoReplay(retries - 1);
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

        function setupYTSuggestionsFocusMode(isActive: boolean | null): void {
            if (isActive) {
                util.addYTSuggestionsFocusClass();
            } else {
                util.removeYTSuggestionsFocusClass();
            }
        }

        function setupChannelSuggestionsFocusMode(isActive: boolean | null): void {
            if (isActive) {
                util.addChannelSuggestionsFocusClass();
            } else {
                util.removeChannelSuggestionsFocusClass();
            }
        }

        function setupNavigationFocusMode(isActive: boolean | null): void {
            if (isActive) {
                util.addNavigationFocusClass();
            } else {
                util.removeNavigationFocusClass();
            }
        }

        function cleanupTimer(): void {
            if (!timeoutID) return;
            clearTimeout(timeoutID);
            timeoutID = null;
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
