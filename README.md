# vue-slider

2 value range slider component and Vue 2.7.x compatible.

![Captura desde 2024-04-15 13-22-16](https://github.com/digital-roots/vue-slider/assets/142359595/86e15b5a-a167-424f-bf1e-0754518867c7)

## Example

```vue
<script>
  import { VueSlider } from '@digital-roots/vue-slider';
  import '@digital-roots/vue-slider/dist/lib/style.css';

  export default {
    components: { VueSlider },
    data() {
      return {
        min: 0,
        max: 20,
        sliderColor: '#deddda',
        rangeColor: '#c061cb',
        rangeValue: [0, 10],
      };
    },
    methods: {
      handleChangeOnSlider(sliderValue) {
        this.rangeValue = [ sliderValue.min, sliderValue.max ];
      },
    },
  };
</script>

<template>
  <vue-slider
    :min="min"
    :max="max"
    :lazy="true"
    :slider-color="sliderColor"
    :range-color="rangeColor"
    @change="handleChangeOnSlider"
  />
</template>
```

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Build the library to use as a "npm module"

```sh
npm run build:lib
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```


### Lint with [Stylelint](https://stylelint.io/)

```sh
npm run stylelint

npm run stylelint-fix
```
