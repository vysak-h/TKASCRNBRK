<script setup lang="ts">
import { ref } from 'vue'
import { useTimerStore } from '@/stores/counter'

const store = useTimerStore()

const isTimerClicked = ref(false)

const TriggerTimer = () => {
  isTimerClicked.value = true
  store.startTimer()
}
</script>

<template>
  <div class="appTimer">
    <div
      class="timer"
      @click="TriggerTimer"
      :class="{ isClicked: isTimerClicked }"
      @animationend="isTimerClicked = false"
    >
      {{ store.formattedTimer }}
    </div>
    <div class="msg">Take a break</div>
  </div>
</template>

<style scoped>
@import url('../assets/timer.css');
</style>
