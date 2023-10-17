import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', () => {
  const collapse = ref(false)
  const username = ref<string>('Gang hu')
  const changeCollapse = () => {
    console.log('changeCollapse')
    collapse.value = !collapse.value
  }

  return { collapse, username, changeCollapse }
})
