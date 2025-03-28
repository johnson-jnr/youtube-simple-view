import { StoreItemKey } from '@/utils/enum';

export default function ytStore() {
    const init = () => {
        let store: Record<string, boolean | null> = {
            [StoreItemKey.GlobalActive]: null,
            [StoreItemKey.DisableAutoPlay]: null,
            [StoreItemKey.HideSidebar]: null,
            [StoreItemKey.HideComment]: null,
            [StoreItemKey.HideYTSuggestions]: null,
            [StoreItemKey.HideChannelSuggestions]: null,
            [StoreItemKey.HideEndScreenNav]: null,
        };
        return store;
    };

    const getStoreItem = async (key: string): Promise<any> => {
        const response = await browser.runtime.sendMessage({ action: 'getItem', key });
        if ('data' in response) {
            return response.data;
        } else {
            throw new Error('Failed to fetch item');
        }
    };

    const updateStoreItem = async (key: string, value: any): Promise<any> => {
        const { success } = await browser.runtime.sendMessage({
            action: 'updateItem',
            key,
            value,
        });
        if (!success) {
            throw new Error('Failed to update item');
        }
        return success;
    };

    return {
        init,
        getStoreItem,
        updateStoreItem,
    };
}
