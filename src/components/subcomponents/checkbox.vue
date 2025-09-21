<template>
    <div class="flex items-center gap-2">
        <label class="text-xs font-medium text-white" :for="inputId">{{ label }}</label>
        <input type="checkbox" :id="inputId" class="form-checkbox h-5 w-5 rounded bg-gray-700 border-gray-600"
            :checked="modelValue" @change="$emit('update:modelValue', ($event.target && ($event.target as HTMLInputElement).checked) || false)" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    label?: string
    modelValue?: boolean
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>()

const inputId = `checkbox-${Math.random().toString(36).slice(2, 11)}`

</script>
