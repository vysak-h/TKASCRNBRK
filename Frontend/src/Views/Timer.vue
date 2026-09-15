<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTimerStore } from '@/stores/counter'
import { useBreakSessionsStore } from '@/stores/BreakSession'

const timerStore = useTimerStore()
const breakStore = useBreakSessionsStore()

const isTimerClicked = ref(false)

const triggerTimer = () => {
  isTimerClicked.value = true
  timerStore.startTimer()
  timerStore.setTimerState('screenTime');
}

const triggerBreak = () => {
  // breakStore.startBreakTimer(timerStore.totalSeconds);
  // timerStore.stopTimer();
  timerStore.setTimerState('breakActive');
  breakStore.startBreakTimer(timerStore.totalSecondsActive);
}

const timerState = computed(() => {
  return timerStore.currentState;
})

</script>

<template>
    <div style="color: brown;">Total Screen time: {{ breakStore.totalScreeTimeMin }}</div>
    <div style="color: brown;">Timer state: {{ timerStore.currentState }}</div>
  <div class="appTimer">
    <div>
      <button
      v-if="timerState == 'screenTime' || timerState == 'idle'"
      class="timer Session"
      @click="triggerTimer"
      :class="{ isClicked: isTimerClicked }"
      @animationend="isTimerClicked = false">
      {{ timerStore.formattedTimer }}</button>
      <button
      v-if="timerState == 'breakActive'"
      class="timer Break"
      @click="triggerTimer"
      :class="{ isClicked: isTimerClicked }"
      @animationend="isTimerClicked = false">
      {{ timerStore.formattedTimer }}</button>
      <div class="timerButton">
      <button @click="timerStore.pauseTimer">Play/Pause</button>
      <button @click="timerStore.stopTimer">stop</button>
      </div>
    </div>
    <div class="msg"
    @click="triggerBreak"
    :style="{ '--timerProgress': timerStore.timerPercentage + '%' }">
    <span>Take a break</span>
  </div>
  </div>
</template>

<style scoped>
@import url('../assets/timer.css');
</style>
