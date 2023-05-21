<script setup>
import { useCounterStore } from '@/stores'
const counterStore = useCounterStore()

const isSymbol = (item) => {
  return counterStore.symbolHelper.keyList.includes(item)
}
</script>

<template>
  <div class="h-[210px] w-full rounded-md rounded-b-none bg-slate-200 p-4 text-right">
    <div class="overflow-hidden overflow-x-hidden">
      <div class="screen-top-number float-right mt-4 whitespace-nowrap text-4xl">
        <div
          v-for="item in counterStore.currentCounterList"
          class="inline-block text-center"
          :class="{ 'w-[1.5rem]': isSymbol(item) }"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <p class="screen-bottom-number mt-[2rem] text-6xl">{{ counterStore.counter }}</p>
  </div>
</template>

<style scoped lang="scss"></style>
