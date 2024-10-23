export default function ytUtil() {
    const selectors = {
        autoPlayButton: '.ytp-button[data-tooltip-target-id="ytp-autonav-toggle-button"]',
        autoPlayInnerWrapper: '.ytp-autonav-toggle-button',
    };

    let autoPlayButtonEl: HTMLButtonElement | null = null;
    let autoPlayInnerWrapperEl: HTMLDivElement | null = null;

    const getAutoPlayButtonEl = (): HTMLButtonElement | null => {
        return document.querySelector(selectors.autoPlayButton);
    };

    const getAutoPlayInnerWrapperEl = (): HTMLDivElement | null => {
        return document.querySelector(selectors.autoPlayInnerWrapper);
    };

    const isAutoPlayBtnInteractive = () => {
        autoPlayButtonEl = getAutoPlayButtonEl();
        return autoPlayButtonEl && autoPlayButtonEl?.offsetParent && !autoPlayButtonEl?.disabled;
    };

    const isAutoPlayBtnChecked = () => {
        autoPlayInnerWrapperEl = getAutoPlayInnerWrapperEl();
        return autoPlayInnerWrapperEl?.getAttribute('aria-checked') === 'true';
    };

    const addSidebarFocusClass = () => {
        document.documentElement.classList.add('yt-sidebar-focus');
    };

    const removeSidebarFocusClass = () => {
        document.documentElement.classList.remove('yt-sidebar-focus');
    };

    const addCommentFocusClass = () => {
        document.documentElement.classList.add('yt-comment-focus');
    };

    const removeCommentFocusClass = () => {
        document.documentElement.classList.remove('yt-comment-focus');
    };

    const addSuggestionsFocusClass = () => {
        document.documentElement.classList.add('yt-suggestions-focus');
    };

    const removeSuggestionsFocusClass = () => {
        document.documentElement.classList.remove('yt-suggestions-focus');
    };

    const addNavigationFocusClass = () => {
        document.documentElement.classList.add('yt-navigation-focus');
    };

    const removeNavigationFocusClass = () => {
        document.documentElement.classList.remove('yt-navigation-focus');
    };

    const getCurrentUrl = (): string => {
        return window.location.href;
    }

    return {
        selectors,
        getCurrentUrl,
        getAutoPlayButtonEl,
        getAutoPlayInnerWrapperEl,
        isAutoPlayBtnInteractive,
        isAutoPlayBtnChecked,
        addNavigationFocusClass,
        removeNavigationFocusClass,
        addSidebarFocusClass,
        removeSidebarFocusClass,
        addCommentFocusClass,
        removeCommentFocusClass,
        addSuggestionsFocusClass,
        removeSuggestionsFocusClass,
    };
}
