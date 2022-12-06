<template>
  <div class="m-payments">
    <p class="m-payments__title">перейти к оплате</p>
    <button class="m-payments-btn" @click="successPayments(getCodes.id)">типа оплатил</button>
  </div>
</template>

<script>
import './m_form_pay.scss';

export default {
  name: 'm-form-pay',
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
    successPayments(cardId) {
      this.$emit('successPayments', cardId);
    },
  },
  computed: {},
  mounted() {},
};
</script>
