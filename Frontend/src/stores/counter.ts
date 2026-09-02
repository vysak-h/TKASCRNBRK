import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTimerStore = defineStore('timer', () => {
  const totalSeconds = ref(0)
  let timer: ReturnType<typeof setInterval> | null = null

  const formattedTimer = computed(() => {
    const minutes = Math.floor(totalSeconds.value / 60)
    const seconds = totalSeconds.value % 60

    return `${String(minutes).padStart(2, '0')}: ${String(seconds).padStart(2, '0')}`
  })

  const stopTimer = ref(false)

  function startTimer() {
    if (timer) return
    timer = setInterval(() => {
      console.log('timer', totalSeconds.value)
      totalSeconds.value++
    }, 1000)
  }

  return { totalSeconds, stopTimer, formattedTimer, startTimer }
})
