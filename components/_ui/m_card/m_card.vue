<template>
  <div class="card" @click="onCardClick">
    <p>{{ name }}</p>
    <br />
    <p>{{ name }}</p>
    <p>{{ name }}</p>
    <p>{{ name }}</p>
  </div>
</template>

<script>
import './m_card.scss';

export default {
  name: 'MCard',
  props: {
    name: {
      type: String,
    },
  },
  data() {
    return {};
  },
  methods: {
    onCardClick() {
      this.$emit('cardClickHandler', this.name);
    },
  },
};
</script>
