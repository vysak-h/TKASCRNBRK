import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useBreakSessionsStore = defineStore('breaks', () => {

  const totalScreenTime = ref(0);
  const totalScreeTimeMin = ref('');

   const startBreakTimer = (totalSeconds: number) => {
    computeBreakSession(totalSeconds)
   }

  const computeBreakSession = (totalSeconds: number) => {

    totalScreenTime.value += totalSeconds;
    const minutes = Math.floor(totalScreenTime.value / 60)
    const seconds = totalScreenTime.value % 60

    totalScreeTimeMin.value =  `${String(minutes).padStart(2, '0')}: ${String(seconds).padStart(2, '0')}`
  }

  return {startBreakTimer, totalScreeTimeMin }

})
