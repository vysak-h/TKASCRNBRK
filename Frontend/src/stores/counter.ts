import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTimerStore = defineStore('timer', () => {


  type TimerState =
        | 'idle'
        | 'screenTime'
        | 'breakActive'
        | 'breakCompletedWaiting'
        | 'paused'

  const totalSecondsActive = ref(0)
  const totalSecondsBreak = ref(0)

  // const totalSecScheduled = 1200;
  const totalSecScheduled = 120;
  const totalBreakTimeSec = 20;

  let timer: ReturnType<typeof setInterval> | null = null

  const currentState = ref<TimerState>('idle');

  const setTimerState = (state: TimerState) => {
      currentState.value = state;
  }

  const formattedTimer = computed(() => {
    const minutes = Math.floor(totalSecondsActive.value / 60)
    const seconds = totalSecondsActive.value % 60

    return `${String(minutes).padStart(2, '0')}: ${String(seconds).padStart(2, '0')}`
  })


  function startTimer() {
    if (timer) return;

    timer = setInterval(() => {
      console.log('timer', totalSecondsActive.value)
      if(currentState.value == 'screenTime' || currentState.value == 'idle')
        totalSecondsActive.value++
      else
        totalSecondsBreak.value++
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
    totalSecondsActive.value = 0;
    totalSecondsBreak.value = 0;
  }

  const timerPercentage = computed(() => {
    return Math.min(( totalSecondsActive.value / totalSecScheduled ) * 100, 100);
  })

  return { totalSecondsActive, timerPercentage,setTimerState,
    currentState, stopTimer, pauseTimer, formattedTimer, startTimer }
})
