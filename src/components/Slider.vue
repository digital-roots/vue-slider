<script setup lang="ts">
import {
  computed,
  ref,
  watch,
  type StyleValue,
} from 'vue';

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

const from = ref(props.min);
const to = ref(props.max);

const showFromBubble = ref(false);
const showToBubble = ref(false);

const sliderBackgroundStyle = computed<StyleValue>(() => {
  const rangeDistance = props.max - props.min;
  const fromPosition = from.value - props.min;
  const toPosition = to.value - props.min;

  const background = `linear-gradient(
    to right,
    ${props.sliderColor} 0%,
    ${props.sliderColor} ${(fromPosition / rangeDistance) * 100}%,
    ${props.rangeColor} ${(fromPosition / rangeDistance) * 100}%,
    ${props.rangeColor} ${(toPosition / rangeDistance) * 100}%, 
    ${props.sliderColor} ${(toPosition / rangeDistance) * 100}%, 
    ${props.sliderColor} 100%
  )`;

  return { background };
});

const fromSliderBubbleStyle = computed<StyleValue>(() => {
  const rangeDistance = props.max - props.min;
  const fromPosition = from.value - props.min;

  const backgroundColor = props.rangeColor;
  const left = `${(fromPosition / rangeDistance) * 100}%`;

  const display = showFromBubble.value ? 'block' : 'none';

  return {
    backgroundColor,
    color: backgroundColor,
    display,
    left,
  };
});

const toSliderBubbleStyle = computed<StyleValue>(() => {
  const rangeDistance = props.max - props.min;
  const toPosition = to.value - props.min;

  const backgroundColor = props.rangeColor;
  const left = `${(toPosition / rangeDistance) * 100}%`;

  const display = showToBubble.value ? 'block' : 'none';

  return {
    backgroundColor,
    color: backgroundColor,
    display,
    left,
  };
});

watch(
  () => props.min + props.max,
  () => {
    let fromOrToModified = false;

    if (props.min > from.value) {
      from.value = props.min;
      fromOrToModified = true;
    }

    if (props.max < to.value) {
      to.value = props.max;
      fromOrToModified = true;
    }

    if (props.max < props.min || props.max < from.value) {
      to.value = props.max;
      from.value = props.max;
      fromOrToModified = true;
    }

    if (fromOrToModified) {
      emitValue();
    }
  },
);

const onFromSliderInput = () => {
  setShowFromBubble(true);

  if (from.value > to.value) {
    to.value = from.value;
  }

  if (!props.lazy) {
    emitValue();
  }
};

const onToSliderInput = () => {
  setShowToBubble(true);

  if (to.value < from.value) {
    from.value = to.value;
  }

  if (!props.lazy) {
    emitValue();
  }
};

const setShowFromBubble = (value: boolean) => {
  showFromBubble.value = value;
};

const setShowToBubble = (value: boolean) => {
  showToBubble.value = value;
};

const onSliderChange = () => {
  if (props.lazy) {
    emitValue();
  }
};

const emitValue = () => {
  emit('change', { min: from.value, max: to.value });
};
</script>

<template>
  <div class="slider-container">
    <div class="bubble-control">
      <div
        class="bubble"
        :style="fromSliderBubbleStyle"
      >
        <div class="text">
          {{ from }}
        </div>
      </div>
      <div
        class="bubble"
        :style="toSliderBubbleStyle"
      >
        <div class="text">
          {{ to }}
        </div>
      </div>
    </div>
    <div
      class="slider-control"
      :style="{
        color: props.rangeColor,
      }"
    >
      <input
        id="from-slider"
        v-model.number="from"
        type="range"
        :min="min"
        :max="max"
        @input="onFromSliderInput"
        @change="onSliderChange"
        @mouseenter="setShowFromBubble(true)"
        @blur="setShowFromBubble(false)"
      />
      <input
        id="to-slider"
        v-model.number="to"
        type="range"
        :min="min"
        :max="max"
        :style="sliderBackgroundStyle"
        @input="onToSliderInput"
        @change="onSliderChange"
        @mouseenter="setShowToBubble(true)"
        @blur="setShowToBubble(false)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.slider-container {
  display: flex;
  flex-direction: column;
  margin: 0.5rem auto;
  width: 100%;

  .slider-control {
    min-height: 1.5rem;
    position: relative;

    input[type="range"] {
      appearance: none;
      background-color: transparent;
      border-radius: 5px;
      color: currentcolor;
      height: 5px;
      pointer-events: none;
      position: absolute;
      width: 100%;

      &::-webkit-slider-thumb {
        appearance: none;
        background-color: currentcolor;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        height: 0.9rem;
        pointer-events: all;
        width: 0.9rem;
      }

      &::-moz-range-thumb {
        appearance: none;
        background-color: currentcolor;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        height: 0.9rem;
        pointer-events: all;
        width: 0.9rem;
      }
    }

    #from-slider {
      background-color: transparent;
      z-index: 1;
    }
  }

  .bubble-control {
    margin-left: 6px;
    margin-right: 6px;
    min-height: .5rem;
    position: relative;

    .bubble {
      border-radius: 4px;
      content: '2';
      margin-top: -1.8rem;
      min-height: 1rem;
      min-width: 1rem;
      padding: 4px 12px;
      position: absolute;
      text-align: center;
      transform: translateX(-50%);

      &::after {
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid;
        border-top-color: inherit;
        content: '';
        height: 0;
        margin-top: 2px;
        position: absolute;
        transform: translateX(-50%);
        width: 0;
      }

      .text {
        color: white;
        line-height: 1rem;
      }
    }
  }
}
</style>
