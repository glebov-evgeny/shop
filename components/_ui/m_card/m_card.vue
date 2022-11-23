<template>
  <div class="card">
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
  methods: {},
};
</script>
