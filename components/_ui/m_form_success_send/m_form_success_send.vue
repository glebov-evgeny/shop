<template>
  <div class="m_form_success_send">
    <div class="m_form_success_send__block">
      <p class="m-code__title">спасибо</p>
    </div>
  </div>
</template>

<script>
import './m_form_success_send.scss';

export default {
  name: 'm-form-success-send',
  methods: {
    closeYourself() {
      setTimeout(() => {
        document.querySelector('.s_popup').click();
      }, 3000);
    },
  },
  mounted() {
    this.closeYourself();
  },
};
</script>
