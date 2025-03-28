import { describe, it, expect, beforeEach } from 'vitest';
import background from '~/entrypoints/background';
import { fakeBrowser } from 'wxt/testing';
import { StoreItemKey } from '@/utils/enum';

describe('Background Entrypoint', () => {
    beforeEach(() => {
        fakeBrowser.reset();
    });

    it('should set all store items to truthy on install', async () => {
        background.main();
        await fakeBrowser.runtime.onInstalled.trigger({
            reason: 'install',
            temporary: false,
        });

        const disableAutoPlay = await storage.getItem(`local:${StoreItemKey.DisableAutoPlay}`);
        const hideSidebar = await storage.getItem(`local:${StoreItemKey.HideSidebar}`);
        const hideComment = await storage.getItem(`local:${StoreItemKey.HideComment}`);
        const hideYTSuggestions = await storage.getItem(`local:${StoreItemKey.HideYTSuggestions}`);
        const hideChannelSuggestions = await storage.getItem(`local:${StoreItemKey.HideChannelSuggestions}`);
        const hideEndScreenNav = await storage.getItem(`local:${StoreItemKey.HideEndScreenNav}`);
        const isActive = await storage.getItem(`local:${StoreItemKey.GlobalActive}`);

        expect(
            disableAutoPlay &&
            hideSidebar &&
            hideComment &&
            hideYTSuggestions &&
            hideChannelSuggestions &&
            hideEndScreenNav &&
            isActive,
        ).toBeTruthy;
    });
});