<template>
  <div class="m-code">
    <div class="card_test-code">
      <p>...</p>
      <p>{{ getCodes.code }}</p>
      <!-- <p>{{ item.code }}</p> -->
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
    // getCodes: {
    //   type: Array,
    //   default: () => [],
    // },
    getCodes: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  methods: {
    // showItem() {
    // this.$set(this.getCodes, indexOfItem, newValue);
    // },
  },
  computed: {
    // showItemItem() {
    //   const currentItem = { clear: '1' };
    //   return currentItem;
    // },
  },
  mounted() {
    // showItemItem();
  },
};
</script>
