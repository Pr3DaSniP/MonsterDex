<template>
  <template
    v-for="(monster, index) in family.monsters"
    :key="family.family_id + '-' + monster.skill_group_id"
  >
    <div
      v-if="monster.variants.some((v) => v.com2us_id === -1) && !props.filter"
      class="w-[1fr] h-[1fr]"
    ></div>
    <DualCard v-else-if="family.isCollaboredFamily" :monster="monster" :filter="props.filter" />
    <Card v-else :monster="monster" :filter="props.filter" />
  </template>
</template>

<script setup lang="ts">
import Card from './Card.vue'
import DualCard from './DualCard.vue'
import { type MonstersRowProps } from '@/types/props/MonstersRow.ts'

const props = defineProps<MonstersRowProps>()
const family = props.family
</script>
