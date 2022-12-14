<template>
  <div class="m-code">
    <div class="m-code__block">
      <p class="m-code__title">Ваш код:</p>
      <div class="m-code__box">{{ currentCode.code }}</div>
      <p class="m-code__info">
        *Данный код также отправлен на указанную при регистрации почту, и доступен в личном кабинете.
      </p>
    </div>
  </div>
</template>

<script>
import './m_form_code.scss';

export default {
  name: 'm-form-code',
  props: {
    currentCode: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
