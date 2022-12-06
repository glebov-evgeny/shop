<template>
  <div class="m-payments">
    <button class="m-payments-btn" @click="successPayments">типа оплатил</button>
  </div>
</template>

<script>
import './m_form_pay.scss';

export default {
  name: 'm-form-pay',
  props: {},
  data() {
    return {};
  },
  methods: {
    successPayments() {
      this.$emit('successPayments');
    },
  },
  computed: {},
  mounted() {},
};
</script>
