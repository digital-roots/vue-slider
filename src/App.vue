<script setup lang="ts">
import slider from '@/components/Slider.vue';
import { ref } from 'vue';

interface SliderValue {
  min: number;
  max: number;
}

const min = ref(0);
const max = ref(100);
const lazy = ref<boolean>(false);
const sliderColor = ref<string>('#C6C6C6');
const rangeColor = ref<string>('#25daa5');

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

      <div class="component-demo">
        <slider
          :min="min"
          :max="max"
          :lazy="lazy"
          :slider-color="sliderColor"
          :range-color="rangeColor"
          @change="onChangeSlider"
        />
      </div>

      <h3>
        <b>{{ currentMin }} - {{ currentMax }}</b>
      </h3>

      <div class="options">
        <label for="min">Min Value</label>
        <input
          id="min"
          v-model.number="min"
          type="number"
        />

        <label for="max">Max Value</label>
        <input
          id="max"
          v-model.number="max"
          type="number"
        />
      </div>

      <div class="options">
        <label for="lazy">Lazy</label>
        <input
          id="lazy"
          v-model="lazy"
          type="checkbox"
        />

        <label for="slider-color">Slider Color</label>
        <input
          id="slider-color"
          v-model="sliderColor"
          type="color"
        />

        <label for="range-color">Range Color</label>
        <input
          id="range-color"
          v-model="rangeColor"
          type="color"
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

  .component-demo {
    width: 80%;
  }

  .options {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 1rem;
    width: 100%;
  }
}
</style>
