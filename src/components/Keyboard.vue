<script setup>
import { storeToRefs } from 'pinia'
import { watch, ref } from 'vue'
import { useCounterStore, useLedgerStore } from '@/stores'
import Swal from 'sweetalert2'

const counterStore = useCounterStore()
const ledgerStore = useLedgerStore()
const { currentCounterList } = storeToRefs(counterStore)

const numberArr = ref([7, 8, 9, 4, 5, 6, 1, 2, 3])
const funcList = ref([
  { text: 'DEL', method: 'del' },
  { text: 'CRL', method: 'clean' },
  { text: '', method: '' },
  { text: '=', method: 'equal' }
])

watch(
  currentCounterList,
  (newVal) => {
    if (newVal.length == 0 || newVal[0] === '') {
      counterStore.counter = ''
    }
  },
  { deep: true }
)

const mySwal = (inputType = 'text', swalOpt = { title: '' }) => {
  return Swal.fire({
    ...swalOpt,
    position: 'top',
    showCancelButton: true,
    closeOnConfirm: false,
    confirmButtonText: '確定',
    cancelButtonText: '取消',
    reverseButtons: true,
    animation: 'slide-from-top',
    customClass: {
      confirmButton: 'custom-swal2-confirm'
    },
    html: `<div class="w-full">
      <input type="${inputType}" id="swal-input" class="p-2 border border-slate-400 rounded w-[80%]" />
      <div id="swal-other" class="w-full"></div>
    </div>`
  })
}

const ledgerNoteCommonItem = () => {
  const commonOption = ['便當', '全聯', '午餐', '晚餐']
  let html = ''
  commonOption.forEach((item) => {
    html += `<button class="swal-common-btn">${item}</button>`
  })
  return html
}

const changeNoteCommonItem = (className) => {
  document.querySelectorAll(className).forEach((item) => {
    item.addEventListener('click', (event) => {
      ledgerStore.ledgerItem.note = document.getElementById('swal-input').value = event.target.innerText
    })
  })
}

const popupNote = () => {
  mySwal('text', { title: '筆記' }).then((value) => {
    if (value.isConfirmed) {
      ledgerStore.ledgerItem.note = document.getElementById('swal-input').value
    }
  })

  const input = document.getElementById('swal-input')
  document.getElementById('swal-other').innerHTML = `<div class="flex flex-wrap justify-center mt-4">
      ${ledgerNoteCommonItem()}
    </div>`
  input.focus()
  input.value = ledgerStore.ledgerItem.note
  changeNoteCommonItem('#swal-other button')
}
const popupDate = () => {
  mySwal('date', { title: '日期' }).then((value) => {
    if (value.isConfirmed) {
      ledgerStore.ledgerItem.date = document.getElementById('swal-input').value
    }
  })
  document.getElementById('swal-input').value = ledgerStore.ledgerItem.date
}

const submitItem = () => {
  if (counterStore.currentCounterList.length === 1) {
    counterStore.counter = counterStore.currentCounterList[0]
  }
  const item = {
    amount: counterStore.counter,
    note: ledgerStore.ledgerItem.note,
    date: ledgerStore.ledgerItem.date
  }
  ledgerStore.pushItem(item)
  counterStore.counter = ''
  counterStore.currentCounterList = []
  ledgerStore.ledgerItem.note = ''
  ledgerStore.ledgerItem.date = new Date().toISOString().slice(0, 10)
}
</script>

<template>
  <div class="grid h-[80px] w-full grid-cols-5">
    <button @click="popupNote()" class="active-transition show-dialog-base-btn show-dialog-btn-note col-span-3">
      筆記
    </button>
    <button @click="popupDate()" class="active-transition show-dialog-base-btn show-dialog-btn-date col-span-2">
      日期
    </button>
  </div>
  <div class="grid w-full grid-cols-5 text-2xl">
    <div class="number-bg col-span-3 grid w-full grid-cols-3">
      <div
        v-for="index in numberArr"
        class="number-keyboard-button"
        :key="index"
        @click="counterStore.addCounterString(index)"
      >
        {{ index }}
      </div>
      <div
        v-for="zero in ['', 0, '']"
        :key="zero"
        :class="zero !== '' ? 'number-keyboard-button' : 'number-keyboard-button-no-text'"
        @click="counterStore.addCounterString(zero)"
      >
        {{ zero }}
      </div>
    </div>
    <div class="symbol-bg col-span-1 grid">
      <div
        v-for="symbolKey in counterStore.symbolHelper.keyList"
        :key="symbolKey"
        class="func-keyboard-button"
        @click="counterStore.addCounterString(symbolKey)"
      >
        {{ symbolKey }}
      </div>
    </div>
    <div class="symbol-bg col-span-1 grid">
      <div
        v-for="func in funcList"
        :key="func.text"
        :class="func.text != '' ? 'func-keyboard-button' : 'func-keyboard-button-no-text'"
        @click="counterStore.editNumber(func.method)"
      >
        {{ func.text }}
      </div>
    </div>
  </div>
  <button
    @click="submitItem()"
    class="active-transition keyboard-submit-btn w-full rounded-t-none px-2 py-[2.5rem] text-xl font-bold"
  >
    送出
  </button>
</template>

<style scoped lang="scss"></style>
