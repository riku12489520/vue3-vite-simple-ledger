import { defineStore } from 'pinia'

const defautLedgerItem = {
  amount: '',
  note: '',
  date: new Date().toISOString().slice(0, 10)
}
export const useLedgerStore = defineStore({
  id: 'ledger',
  state: () => ({
    ledgerItem: defautLedgerItem,
    ledgerList: []
  }),
  actions: {
    getList() {
      let localStorageString = ''
      if (localStorage.length === 0 || ['', '[]'].includes(localStorage.getItem('ledgerList'))) {
        localStorage.setItem('ledgerList', '[]')
        this.ledgerList = []
      } else {
        localStorageString = localStorage.getItem('ledgerList')
        this.ledgerList = JSON.parse(localStorageString)
      }
    },
    pushItem(item) {
      if ([null, '', undefined].includes(item.amount)) return
      this.getList()
      this.ledgerList.push(item)
      localStorage.setItem('ledgerList', JSON.stringify(this.ledgerList))
      this.ledgerItem = defautLedgerItem
    },
    delItem(index) {
      this.getList()
      this.ledgerList.splice(index, 1)
      localStorage.setItem('ledgerList', JSON.stringify(this.ledgerList))
    },
    clearList() {
      localStorage.removeItem('ledgerList')
      this.ledgerList = []
    }
  }
})
