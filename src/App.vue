<script setup lang="ts">
import slider from '@/components/Slider.vue';
import { ref } from 'vue';

interface SliderValue {
  min: number;
  max: number;
}

const min = ref(0);
const max = ref(100);

const currentMin = ref(0);
const currentMax = ref(100);

const onChangeSlider = (sliderValue: SliderValue) => {
  currentMin.value = sliderValue.min;
  currentMax.value = sliderValue.max;
};
</script>

<template>
  <div id="app">
    <main>
      <h1>Vue Slider</h1>

      <h2>Demo</h2>

      <slider
        :min="min"
        :max="max"
        @change="onChangeSlider"
      />

      <h3>
        <b>{{ currentMin }} - {{ currentMax }}</b>
      </h3>

      <div class="options">
        <label for="min">Min Value</label>
        <input
          id="min"
          v-model="min"
          type="number"
          name="Min Value"
        />

        <label for="max">Max Value</label>
        <input
          id="max"
          v-model="max"
          type="number"
          name="Max Value"
        />
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
main {
  align-items: center;
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
  line-height: 1.5;

  .options {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 1rem;
    width: 100%;
  }
}
</style>
