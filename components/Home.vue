<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import ytStore from '@/utils/store';
import { storage } from 'wxt/storage';
import { StoreItemKey } from '@/utils/enum';
import Toggle from './Toggle.vue';

const store = ytStore();
let disableAutoPlay = ref<boolean | null>(null);
let hideComment = ref<boolean | null>(null);
let hideSidebar = ref<boolean | null>(null);
let hideYTSuggestions = ref<boolean | null>(null);
let hideChannelSuggestions = ref<boolean | null>(null);
let hideEndScreenNav = ref<boolean | null>(null);
let isActive = ref<boolean | null>(null);

onMounted(async () => {
    disableAutoPlay.value = await store.getStoreItem(StoreItemKey.DisableAutoPlay);
    hideSidebar.value = await store.getStoreItem(StoreItemKey.HideSidebar);
    hideComment.value = await store.getStoreItem(StoreItemKey.HideComment);
    hideYTSuggestions.value = await store.getStoreItem(StoreItemKey.HideYTSuggestions);
    hideChannelSuggestions.value = await store.getStoreItem(StoreItemKey.HideChannelSuggestions);
    hideEndScreenNav.value = await store.getStoreItem(StoreItemKey.HideEndScreenNav);
    isActive.value = await store.getStoreItem(StoreItemKey.GlobalActive);
});

function toggleSidebar() {
    hideSidebar.value = !hideSidebar.value;
}

function toggleComment() {
    hideComment.value = !hideComment.value;
}

function toggleAutoPlay() {
    disableAutoPlay.value = !disableAutoPlay.value;
}

function toggleYTSuggestions() {
    hideYTSuggestions.value = !hideYTSuggestions.value;
}

function toggleChannelSuggestions() {
    hideChannelSuggestions.value = !hideChannelSuggestions.value;
}

function toggleNavigation() {
    hideEndScreenNav.value = !hideEndScreenNav.value;
}

watch(disableAutoPlay, (val: boolean | null) => {
    store.updateStoreItem(StoreItemKey.DisableAutoPlay, val);
});

watch(hideSidebar, (val: boolean | null) => {
    store.updateStoreItem(StoreItemKey.HideSidebar, val);
});

watch(hideComment, (val: boolean | null) => {
    store.updateStoreItem(StoreItemKey.HideComment, val);
});

watch(hideYTSuggestions, (val: boolean | null) => {
    store.updateStoreItem(StoreItemKey.HideYTSuggestions, val);
});

watch(hideChannelSuggestions, (val: boolean | null) => {
    store.updateStoreItem(StoreItemKey.HideChannelSuggestions, val);
});

watch(hideEndScreenNav, (val: boolean | null) => {
    store.updateStoreItem(StoreItemKey.HideEndScreenNav, val);
});

storage.watch(`local:${StoreItemKey.GlobalActive}`, (val: boolean | null) => {
    isActive.value = val;
    disableAutoPlay.value = val;
    hideSidebar.value = val;
    hideComment.value = val;
    hideYTSuggestions.value = val;
    hideChannelSuggestions.value = val;
    hideEndScreenNav.value = val;
});
</script>

<template>
    <div class="container">
        <Toggle
            class="mb-4"
            label="Turn off auto-play"
            :isActive="isActive"
            v-model="disableAutoPlay"
            @toggle="toggleAutoPlay"
        />
        <Toggle class="mb-4" label="Hide sidebar" :isActive="isActive" v-model="hideSidebar" @toggle="toggleSidebar" />
        <Toggle class="mb-4" label="Hide comments" :isActive="isActive" v-model="hideComment" @toggle="toggleComment" />
        <Toggle
            class="mb-4"
            label="Hide end-screen channel overlays"
            :isActive="isActive"
            v-model="hideChannelSuggestions"
            @toggle="toggleChannelSuggestions"
        />
        <Toggle
            class="mb-4"
            label="Hide end-screen YT suggestions"
            :isActive="isActive"
            v-model="hideYTSuggestions"
            @toggle="toggleYTSuggestions"
        />
        <Toggle
            label="Hide end-screen navigation"
            :isActive="isActive"
            v-model="hideEndScreenNav"
            @toggle="toggleNavigation"
        />
    </div>
</template>

<style scoped>
.container {
    padding: 1rem;
    padding-right: 12px;
}
</style>
