<template>
    <div
        class="flex justify-between items-center"
        @click="$emit('toggle')"
        :class="isActive ? 'cursor-pointer' : ['pointer-events-none', 'opacity-50']"
    >
        <div class="text-sm flex items-center">
            <slot name="beforeLabel"> </slot>
            <span> {{ label }} </span>
            <slot name="afterLabel"> </slot>
        </div>

        <button
            type="button"
            class="group relative inline-flex h-5 w-10 flex-shrink-0 items-center justify-center rounded-full focus:outline-none"
            role="switch"
            aria-checked="false"
        >
            <span class="sr-only">Custom setting to {{ label }}</span>
            <span aria-hidden="true" class="pointer-events-none absolute h-full w-full rounded-md bg-white"></span>
            <span
                ref="input-wrapper"
                aria-hidden="true"
                class="pointer-events-none absolute mx-auto h-4 w-7 rounded-full"
                :class="model ? 'bg-[#1c64f2]' : 'bg-gray-200'"
            ></span>
            <span
                ref="input-dot"
                aria-hidden="true"
                class="pointer-events-none absolute left-0 inline-block h-3 w-3 transform rounded-full border border-gray-200 bg-white shadow ring-0"
                :class="model ? ['translate-x-5', 'left-0'] : 'translate-x-0 left-2'"
            ></span>
            <slot name="afterLabel"> </slot>
        </button>
    </div>
</template>

<script lang="ts" setup>
import { onUpdated, useTemplateRef } from 'vue';

defineProps({
    label: String,
    isActive: {
        default: true,
        type: [Boolean, null],
    },
});
defineEmits(['toggle']);

const model = defineModel();
const inputWrapper = useTemplateRef('input-wrapper');
const inputDot = useTemplateRef('input-dot');

onUpdated(() => {
    setTimeout(() => {
        inputWrapper.value?.classList.add('transition-colors', 'duration-200', 'ease-in-out');
        inputDot.value?.classList.add('transition-transform', 'duration-200', 'ease-in-out');
    }, 500);
});
</script>

<style scoped></style>
