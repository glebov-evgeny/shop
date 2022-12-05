<template>
  <div class="m-code">
    <div class="card_test-code">
      <p>{{ getCodes.code }}</p>
      <br /><br />
      <!-- <p>{{ item.createAt.toDate() }}</p> -->
    </div>
  </div>
</template>

<script>
import './m_form_code.scss';

export default {
  name: 'm-form-code',
  props: {
    getCodes: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  methods: {
    showItem() {
      // console.log('ddd');
      // this.$set(this.getCodes, indexOfItem, newValue);
    },
  },
  computed: {},
  mounted() {
    // this.showItem();
  },
};
</script>
