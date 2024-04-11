<script setup lang="ts">
import { computed, ref } from 'vue';

interface SliderValue {
  min: number;
  max: number;
}

const props = defineProps({
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  lazy: {
    type: Boolean,
    default: true,
  },
  sliderColor: {
    type: String,
    default: '#C6C6C6',
  },
  rangeColor: {
    type: String,
    default: '#25daa5',
  },
});

const emit = defineEmits<{ (e: 'change', value: SliderValue): void }>();

const from = ref(0);
const to = ref(100);

const sliderBackground = computed<string>(() => {
  const rangeDistance = props.max - props.min;
  const fromPosition = from.value - props.min;
  const toPosition = to.value - props.min;

  return `linear-gradient(
    to right,
    ${props.sliderColor} 0%,
    ${props.sliderColor} ${(fromPosition / rangeDistance) * 100}%,
    ${props.rangeColor} ${(fromPosition / rangeDistance) * 100}%,
    ${props.rangeColor} ${(toPosition / rangeDistance) * 100}%, 
    ${props.sliderColor} ${(toPosition / rangeDistance) * 100}%, 
    ${props.sliderColor} 100%)`;
});

const onFromSliderInputChange = () => {
  if (from.value > to.value) {
    to.value = from.value;
  }

  emitValue();
};

const onToSliderInputChange = () => {
  if (to.value < from.value) {
    from.value = to.value;
  }

  emitValue();
};

const emitValue = () => {
  emit('change', { min: from.value, max: to.value });
};
</script>

<template>
  <div class="slider-container">
    <div class="slider-control">
      <input
        id="from-slider"
        v-model.number="from"
        type="range"
        :min="min"
        :max="max"
        :lazy="lazy"
        @input="onFromSliderInputChange"
      />
      <input
        id="to-slider"
        v-model.number="to"
        type="range"
        :min="min"
        :max="max"
        :style="{
          background: sliderBackground,
        }"
        :lazy="lazy"
        @input="onToSliderInputChange"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.slider-container {
  display: flex;
  flex-direction: column;
  margin: 0.5rem auto;
  width: 80%;

  .slider-control {
    min-height: 50px;
    position: relative;

    input[type="range"] {
      appearance: none;
      background-color: #C6C6C6;
      height: 4px;
      pointer-events: none;
      position: absolute;
      width: 100%;

      &::-webkit-slider-thumb {
        appearance: none;
        background-color: #fff;
        border-radius: 50%;
        box-shadow: 0 0 0 1px #C6C6C6;
        cursor: pointer;
        height: 0.8rem;
        pointer-events: all;
        width: 0.8rem;
      }

      &::-moz-range-thumb {
        appearance: none;
        background-color: #fff;
        border-radius: 50%;
        box-shadow: 0 0 0 1px #C6C6C6;
        cursor: pointer;
        height: 0.8rem;
        pointer-events: all;
        width: 0.8rem;
      }

      &::-webkit-slider-thumb:hover {
        background: #f7f7f7;
      }
    }

    #from-slider {
      height: 0;
      margin-top: 4px;
      z-index: 1;
    }
  }
}
</style>
