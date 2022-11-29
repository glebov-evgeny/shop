<template>
  <div class="select">
    <div class="select__toggle" @click="toggleListHandler">
      <p class="select__current" :data-current="regionsCurrent">{{ regionsCurrent }}</p>
    </div>
    <div class="select__list _nominal" :class="[toggleList ? '_active' : '']" @click="toggleOption">
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
export default {
  name: 'MCardSelectNominal',
  props: {
    regionsList: {
      type: Array,
    },
    regionsCurrent: {
      type: Number,
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
      this.$emit('toggleListHandlerNominal', event);
    },
    toggleOption(event) {
      this.$emit('toggleOptionNominal', event);
    },
  },
};
</script>
