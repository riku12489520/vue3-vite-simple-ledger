import { defineStore } from 'pinia'
import numeral from 'numeral'

// 功能
// 1. 計算完存進 localStorage list

function SymbolMethod(counter, number, func) {
  this.counter = numeral(counter)
  this.module = {
    fuc: func(this.counter, number)
  }
}

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    counter: '',
    currentCounterList: [],
    symbolHelper: {
      Keyword: [
        { text: '÷', method: 'divide' },
        { text: 'x', method: 'multiply' },
        { text: '-', method: 'subtract' },
        { text: '+', method: 'add' }
      ],
      keyList: ['÷', 'x', '-', '+']
    },
    editCountList: [
      { text: 'DEL', method: 'del' },
      { text: '=', method: 'equal' }
    ],
    symbolMethods: {
      '+': (x, y) => {
        return x.add(y)
      },
      '-': (x, y) => {
        return x.subtract(y)
      },
      x: (x, y) => {
        return x.multiply(y)
      },
      '÷': (x, y) => {
        return x.divide(y)
      }
    }
  }),
  actions: {
    addCounterString(str) {
      if (str === '') return
      if (this.currentCounterList.length === 0) {
        if (typeof str == 'string') {
          this.currentCounterList = this.currentCounterList.concat([0, str])
        } else {
          this.currentCounterList.push(str)
        }
        return
      }
      const strListLen = this.currentCounterList.length
      const listlastItem = this.currentCounterList[strListLen - 1] ?? ''
      const lastWord = `${listlastItem}`[`${listlastItem}`.length - 1] ?? ''

      if (typeof str === 'string') {
        if (str === lastWord) return
        if (this.symbolHelper.keyList.includes(lastWord)) {
          this.currentCounterList.pop()
        }
        this.currentCounterList.push(str)
        return
      }

      if (typeof str === 'number') {
        if (listlastItem == 0) {
          this.currentCounterList[strListLen - 1] = str
          return
        }

        if (isNaN(Number(listlastItem))) {
          this.currentCounterList.push(str)
        } else {
          this.currentCounterList[strListLen - 1] = `${listlastItem}${str}`
        }
      }
    },
    editNumber(method) {
      if (method == 'clean') {
        this.counter = ''
        this.currentCounterList = []
      }

      const strListLen = this.currentCounterList.length
      if (method == 'del') {
        if (isNaN(Number(this.currentCounterList[strListLen - 1]))) {
          this.currentCounterList.pop()
        } else if (this.currentCounterList[strListLen - 1] === '') {
          this.currentCounterList.pop()
        } else {
          this.currentCounterList[strListLen - 1] = `${
            this.currentCounterList[strListLen - 1]
          }`.slice(0, -1)
        }
      }
      if (method == 'equal') {
        if (this.currentCounterList.length === 1) {
          this.counter = this.currentCounterList[0]
          return
        }
        if (isNaN(Number(this.currentCounterList[strListLen - 1]))) {
          this.currentCounterList.pop()
        }
        let number = this.currentCounterList[0]
        let total = 0

        this.currentCounterList.forEach((item, index, list) => {
          if (isNaN(item)) {
            const counterObj = new SymbolMethod(number, list[index + 1], this.symbolMethods[item])
            total = counterObj.counter.value()
            number = total
          }
        })

        this.counter = total
      }
    }
  }
})
