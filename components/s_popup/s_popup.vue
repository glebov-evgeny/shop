<template>
  <div class="s_popup" @click.stop="popupIsClosed">
    <div @click.stop class="s_popup__content">
      <MFormRegistration v-if="currenForm === 'registration'" @changeFormRegLog="changeFormRegLog" />
      <MFormLogin v-if="currenForm === 'login'" @changeFormRegLog="changeFormRegLog" />
      <MFormPay v-if="currenForm === 'formpay'" />
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import MFormRegistration from '@/components/_ui/m_form_registration/m_form_registration.vue';
// eslint-disable-next-line import/extensions
import MFormLogin from '@/components/_ui/m_form_login/m_form_login.vue';
// eslint-disable-next-line import/extensions
import MFormPay from '@/components/_ui/m_form_pay/m_form_pay.vue';

import './s_popup.scss';

export default {
  name: 's_popup',
  props: {
    currenForm: {
      type: String,
      default: 'registration',
    },
  },
  components: {
    MFormRegistration,
    MFormLogin,
    MFormPay,
  },
  data() {
    return {};
  },
  methods: {
    popupIsClosed() {
      this.$emit('popupIsClosed');
    },
    changeFormRegLog() {
      this.$emit('changeFormRegLog');
    },
  },
};
</script>
