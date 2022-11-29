<template>
  <div class="wrapper">
    <s-header @popupIsOpen="popupIsOpen" :popupIsClosed="popuIsShow" />
    <main class="main">
      <s-intro />
      <s-dump />
      <s-switchcards @popupIsOpen="popupIsOpen" @paymentsBtnClick="paymentsBtnClick" />
      <s-popup :show="popuIsShow" @popupIsClosed="popupIsClosed">
        <m-form-registration v-if="registrationOrLoginForm" className="_compact" @changeFormPopup="changeFormPopup" />
        <m-form-login v-if="!registrationOrLoginForm" className="_compact" @changeFormPopup="changeFormPopup" />
      </s-popup>
      <s-popup :show="popuIsShowContent" @popupIsClosed="popupIsClosed">
        <m-form-question v-if="isQuestionForm" className="_compact" />
        <m-form-payments v-if="isPaymentForm" className="_compact" />
      </s-popup>
    </main>
    <s-footer />
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import MFormRegistration from '@/components/_ui/m_form_registration/m_form_registration.vue';
// eslint-disable-next-line import/extensions
import MFormLogin from '@/components/_ui/m_form_login/m_form_login.vue';
// eslint-disable-next-line import/extensions
import MFormQuestion from '@/components/_ui/m_form_question/m_form_question.vue';
// eslint-disable-next-line import/extensions
import MFormPayments from '@/components/_ui/m_form_payments/m_form_payments.vue';
import getPayment from '@/api/getPayment';

export default {
  components: {
    MFormRegistration,
    MFormLogin,
    MFormQuestion,
    MFormPayments,
  },
  data() {
    return {
      popuIsShow: false,
      popuIsShowContent: false,
      registrationOrLoginForm: true,
      isPaymentForm: false,
      isQuestionForm: false,
    };
  },
  mounted() {
    this.isUserLogged();
    // eslint-disable-next-line no-undef
    emailjs.init('lSiwUD9_iX1bEyngQ');
  },
  watch: {
    popuIsShow() {
      this.hideYScroll();
    },
  },
  methods: {
    hideYScroll() {
      const htmlWrapper = document.querySelector('html');
      if (this.popuIsShow) {
        htmlWrapper.style.overflow = 'hidden';
      } else {
        htmlWrapper.style.overflow = 'auto';
      }
    },

    isUserLogged() {
      // Проверяю cookies, если user есть - беру значение в store
      if (this.$cookies.get('user')) {
        this.$store.commit('setToken', this.$cookies.get('user'));
      }
    },
    popupIsOpen() {
      this.popuIsShow = true;
    },
    changeFormPopup() {
      this.registrationOrLoginForm = !this.registrationOrLoginForm;
    },
    paymentsBtnClick() {
      // this.popuIsShowContent = true;
      // this.isPaymentForm = true;
      getPayment();
    },
    popupIsClosed() {
      this.popuIsShow = false;
      this.popuIsShowContent = false;
    },
  },
};
</script>
