<script lang="ts" setup>
import { watch, ref, onMounted } from 'vue';
import ytStore from '@/utils/store';
import Home from '@/components/Home.vue';
import Toggle from '@/components/Toggle.vue';
import { StoreItemKey } from '@/utils/enum';

const store = ytStore();
const model = ref<boolean | null>(null);

onMounted(async () => {
    const result = await store.getStoreItem(StoreItemKey.GlobalActive);
    model.value = result;
});

function toggleSetting() {
    model.value = !model.value;
}

watch(model, async (val: boolean | null) => {
    await store.updateStoreItem(StoreItemKey.GlobalActive, val);
});
</script>

<template>
    <main>
        <div class="text-base pl-4 pr-3 py-3 border-b">
            <Toggle label="Custom Settings for YouTube" v-model="model" @toggle="toggleSetting">
                <template #beforeLabel>
                    <img class="mr-[6px]" src="/assets/setting.svg" alt="" />
                </template>
            </Toggle>
        </div>

        <Home />
    </main>
</template>

<style scoped></style>
