<script setup>
import { ref, computed } from 'vue'
import { useLedgerStore } from '@/stores'
import Swal from 'sweetalert2'

const ledgerStore = useLedgerStore()
const titles = ref([
  { title: '日期', className: 'text-left' },
  { title: '筆記', className: 'text-left' },
  { title: '金額', className: 'text-right' }
])

const totalAmount = computed(() => {
  const initialValue = 0
  const sumWithInitial = ledgerStore.ledgerList.reduce(
    (accumulator, currentValue) => accumulator + Number(currentValue.amount),
    initialValue
  )
  return sumWithInitial
})

const formatNumber = (number) => {
  return new Intl.NumberFormat().format(number)
}

const mySwal = (swalOpt = { title: '' }) => {
  return Swal.fire({
    ...swalOpt,
    position: 'top',
    showCancelButton: true,
    closeOnConfirm: false,
    confirmButtonText: '刪除',
    cancelButtonText: '取消',
    reverseButtons: true,
    customClass: {
      confirmButton: 'custom-swal2-clear'
    },
    text: '(›´ω`‹ )'
  })
}

const clearItemCheck = (item, index) => {
  const html = `<div class="grid grid-cols-2 w-[90%]">
    <span class="font-bold">日期</span><span class="text-right">${item.date}</span>
    <span class="font-bold">筆記</span><span class="text-right">${item.note}</span>
    <span class="font-bold">金額</span><span class="text-right">${formatNumber(item.amount)}</span>
    </div>`
  mySwal({ title: '確定要刪除這筆?', html: html }).then((value) => {
    if (value.isConfirmed) {
      ledgerStore.delItem(index)
    }
  })
}

const clearList = () => {
  if (ledgerStore.ledgerList.length === 0) {
    Swal.fire({
      title: '無法清除帳本啦!',
      position: 'top',
      confirmButtonText: 'いいよ',
      reverseButtons: true,
      customClass: {
        confirmButton: 'custom-swal2-confirm'
      }
    })
    return
  }
  mySwal({ title: '確定要清空帳本?' }).then((value) => {
    if (value.isConfirmed) {
      ledgerStore.clearList()
    }
  })
}
</script>

<template>
  <div class="h-[650px] w-full overflow-auto">
    <table class="h-full w-full">
      <thead class="sticky top-0 z-10">
        <tr class="total-amount-color">
          <th class="text-left">總金額</th>
          <th :colspan="titles.length" class="text-right">
            {{ formatNumber(totalAmount) }}
          </th>
        </tr>
        <tr class="bg-white">
          <th v-for="title in titles" :key="title.title" :class="title.className">
            {{ title.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="ledgerStore.ledgerList.length === 0">
          <tr>
            <td :colspan="titles.length" class="text-center">空空ㄉ (′゜ω。‵)....</td>
          </tr>
        </template>
        <template v-else>
          <tr
            v-for="(item, index) in ledgerStore.ledgerList"
            :key="index"
            class="border-b last:border-none"
            @click="clearItemCheck(item, index)"
          >
            <td class="pl-4">{{ item.date }}</td>
            <td>{{ item.note }}</td>
            <td class="pr-4 text-right">{{ formatNumber(item.amount) }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
  <button
    @click="clearList"
    class="active-transition ledger-clean-btn w-full rounded-t-none px-2 py-4 text-xl font-bold"
  >
    清空帳本
  </button>
</template>

<style scoped lang="scss">
th,
td {
  @apply p-3;
}

th {
  @apply text-xl font-bold;
}

td {
  @apply text-left align-middle;
}
</style>
