import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTimerStore = defineStore('timer', () => {
  const totalSeconds = ref(0)

  const totalSecScheduled = 1200;

  let timer: ReturnType<typeof setInterval> | null = null

  const formattedTimer = computed(() => {
    const minutes = Math.floor(totalSeconds.value / 60)
    const seconds = totalSeconds.value % 60

    return `${String(minutes).padStart(2, '0')}: ${String(seconds).padStart(2, '0')}`
  })


  function startTimer() {
    if (timer) return;

    timer = setInterval(() => {
      console.log('timer', totalSeconds.value)
      totalSeconds.value++
    }, 1000)

  }

  const pauseTimer = () => {

    if(timer !== null){
      clearInterval(timer);
      timer = null;
    }
    else if(timer == null)
    {
      startTimer();
    }
  }

  const stopTimer = () =>{

    if(timer !== null )
    {
      clearInterval(timer);
      timer = null;
    }
    totalSeconds.value = 0;
  }

  const timerPercentage = computed(() => {
    return Math.min(( totalSeconds.value / totalSecScheduled ) * 100, 100);
  })

  return { totalSeconds, timerPercentage,stopTimer, pauseTimer, formattedTimer, startTimer }
})
