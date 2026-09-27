import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useBreakSessionsStore } from './BreakSession'

export const useTimerStore = defineStore('timer', () => {


const breakStore = useBreakSessionsStore()

  type TimerState =
        | 'idle'
        | 'screenTime'
        | 'breakActive'
        | 'breakCompletedWaiting'
        | 'paused'

  const totalSecondsActive = ref(0)
  const totalSecondsBreak = ref(0)

  // const totalSecScheduled = 1200;
  const totalSecScheduled = 50;
  const totalBreakTimeSec = 20;

  let timer: ReturnType<typeof setInterval> | null = null

  const currentState = ref<TimerState>('idle');

  const setTimerState = (state: TimerState) => {
      currentState.value = state;
  }

  const isScreenTime = computed(
    () =>  currentState.value == 'screenTime' || currentState.value == 'idle'
  )

  const startBreakTimer = () => {
    if(currentState.value != 'breakActive'){
      currentState.value = 'breakActive';
      breakStore.addScreenTime(totalSecondsActive.value)
      totalSecondsActive.value = 0;
      stopTimer();
      startTimer();
    }
  }

  const formattedTimer = computed(() => {
    let min = 0;

    if(isScreenTime.value)
      min = totalSecondsActive.value;
    else
      min = totalSecondsBreak.value;

    const minutes = Math.floor(min / 60)
    const seconds = min % 60

    return `${String(minutes).padStart(2, '0')}: ${String(seconds).padStart(2, '0')}`
  })


  function startTimer() {
    if (timer) return;

    timer = setInterval(() => {
      console.log('timer', totalSecondsActive.value)
      if(isScreenTime.value)
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
    if(isScreenTime.value)
      return Math.min(( totalSecondsActive.value / totalSecScheduled ) * 100, 100);
    return Math.min(( totalSecondsBreak.value / totalBreakTimeSec ) * 100, 100);
  })


  return { totalSecondsActive, timerPercentage,totalSecondsBreak,
    setTimerState,isScreenTime,
    currentState, stopTimer, pauseTimer, formattedTimer, startTimer , startBreakTimer}
})
