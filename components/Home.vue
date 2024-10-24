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
let hideInVideoSuggestions = ref<boolean | null>(null);
let hideInVideoNavigation = ref<boolean | null>(null);
let isActive = ref<boolean | null>(null);

onMounted(async () => {
    disableAutoPlay.value = await store.getStoreItem(StoreItemKey.DisableAutoPlay);
    hideSidebar.value = await store.getStoreItem(StoreItemKey.HideSidebar);
    hideComment.value = await store.getStoreItem(StoreItemKey.HideComment);
    hideInVideoSuggestions.value = await store.getStoreItem(StoreItemKey.HideEndScreens);
    hideInVideoNavigation.value = await store.getStoreItem(StoreItemKey.HideEndNav);
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

function toggleSuggestions() {
    hideInVideoSuggestions.value = !hideInVideoSuggestions.value;
}

function toggleNavigation() {
    hideInVideoNavigation.value = !hideInVideoNavigation.value;
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

watch(hideInVideoSuggestions, (val: boolean | null) => {
    store.updateStoreItem(StoreItemKey.HideEndScreens, val);
});

watch(hideInVideoNavigation, (val: boolean | null) => {
    store.updateStoreItem(StoreItemKey.HideEndNav, val);
});

storage.watch(`local:${StoreItemKey.GlobalActive}`, (val: boolean | null) => {
    isActive.value = val;
    disableAutoPlay.value = val;
    hideSidebar.value = val;
    hideComment.value = val;
    hideInVideoSuggestions.value = val;
    hideInVideoNavigation.value = val;
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
        <Toggle class="mb-4" label=" Hide comments" :isActive="isActive" v-model="hideComment" @toggle="toggleComment" />
        <Toggle
            class="mb-4"
            label="Hide end-screen suggestions"
            :isActive="isActive"
            v-model="hideInVideoSuggestions"
            @toggle="toggleSuggestions"
        />
        <Toggle
            label="Hide end-screen navigation"
            :isActive="isActive"
            v-model="hideInVideoNavigation"
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
