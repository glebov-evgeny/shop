<template>
  <div class="select">
    <div class="select__toggle" @click="toggleListHandler">
      <p class="select__current" :data-current="regionsCurrent">{{ regionsCurrent }}</p>
    </div>
    <div class="select__list" :class="[toggleList ? '_active' : '']" @click="toggleOption">
      <p
        v-for="regions in regionsList"
        class="select__list-option"
        :class="regions.currentClass"
        :data-option="regions.code"
        :key="regions.code"
      >
        {{ regions.code }}
      </p>
    </div>
  </div>
</template>

<script>
import './m_select.scss';

export default {
  name: 'MCardSelect',
  props: {
    regionsList: {
      type: Array,
    },
    regionsCurrent: {
      type: String,
    },
    toggleList: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    toggleListHandler(event) {
      this.$emit('toggleListHandler', event);
    },
    toggleOption(event) {
      this.$emit('toggleOption', event);
    },
  },
};
</script>
