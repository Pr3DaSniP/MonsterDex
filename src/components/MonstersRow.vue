<template>
  <template
    v-for="(monster, index) in family.monsters"
    :key="family.family_id + '-' + monster.skill_group_id"
  >
    <template v-if="family.isCollaboredFamily">
      <DualCard :monster="monster" :filter="props.filter" />
    </template>
    <template v-else>
      <Card :monster="monster" :filter="props.filter" />
    </template>
  </template>
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import Card from './Card.vue'
import DualCard from './DualCard.vue'
import { type MonstersRowProps } from '@/types/props/MonstersRow.ts'

const props = defineProps<MonstersRowProps>()
const family = props.family
</script>
