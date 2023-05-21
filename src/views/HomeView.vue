<script setup>
import { shallowRef, onBeforeMount } from 'vue'
import CounterView from '@/views/CounterView.vue'
import LedgerListView from '@/views/LedgerListView.vue'

import { useLedgerStore } from '@/stores'
const ledgerStore = useLedgerStore()

let currentComponent = shallowRef(CounterView)
const components = {
  ledgerList: LedgerListView,
  counter: CounterView
}
const changeView = (name) => {
  currentComponent.value = components[name]
}

onBeforeMount(() => {
  ledgerStore.getList()
})
</script>

<template>
  <div class="w-full">
    <div class="max-h-[800px]">
      <component :is="currentComponent" />
    </div>
    <div class="grid w-full grid-cols-2 sm:fixed sm:bottom-0">
      <button @click="changeView('counter')" class="router-btn font-bold">記帳</button>
      <button @click="changeView('ledgerList')" class="router-btn font-bold">帳本</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
button {
  @apply h-[7.2rem] text-2xl;
}
</style>
