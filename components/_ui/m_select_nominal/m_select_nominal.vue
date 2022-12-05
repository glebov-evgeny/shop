<template>
  <div class="select">
    <div class="select__toggle" @click="toggleListHandler">
      <p class="select__current" :data-current="nominalCurrent">{{ nominalCurrent }}</p>
    </div>
    <div class="select__list _nominal" :class="toggleListNominal ? '_active' : ''">
      <p
        v-for="nominal in nominalList"
        class="select__list-option"
        :key="nominal.code"
        @click="toggleOptionNominal(nominal.code)"
      >
        {{ nominal.code }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MCardSelectNominal',
  props: {
    nominalList: {
      type: Array,
    },
    nominalCurrent: {
      type: Number,
    },
    toggleListNominal: {
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
    toggleOptionNominal(nominal) {
      this.$emit('toggleOptionNominal', nominal);
    },
  },
};
</script>
