<template>
    <div class="absolute bottom-4 left-4">
        <img :src="typeMap[type as ElementType]" :width="iconSize" :height="iconSize" alt="Water Type Icon" />
    </div>
</template>

<script setup lang="ts">
import waterType from '@/assets/types/water.png';
import darkType from '@/assets/types/dark.png';
import lightType from '@/assets/types/light.png';
import windType from '@/assets/types/wind.png';
import fireType from '@/assets/types/fire.png';
import { ElementType } from '@/types/element.ts';


const props = defineProps<{
    size?: number,
    type?: ElementType
}>();

const iconSize = props.size ? props.size : 24;
const type = props.type ? props.type : null;

const typeMap: Record<string, string> = {
    Water: waterType,
    Dark: darkType,
    Light: lightType,
    Wind: windType,
    Fire: fireType
};

</script>
