<script setup lang="ts">
import { ref } from 'vue'
import { useTimerStore } from '@/stores/counter'

const store = useTimerStore()

const isTimerClicked = ref(false)

const triggerTimer = () => {
  isTimerClicked.value = true
  store.startTimer()
}
</script>

<template>
  <div class="appTimer">
    <div>
      <button
      class="timer"
      @click="triggerTimer"
      :class="{ isClicked: isTimerClicked }"
      @animationend="isTimerClicked = false">
      {{ store.formattedTimer }}</button>
    </div>
    <div class="msg"
    :style="{ '--timerProgress': store.timerPercentage + '%' }">
    <span>Take a break</span>
  </div>
  </div>
</template>

<style scoped>
@import url('../assets/timer.css');
</style>
