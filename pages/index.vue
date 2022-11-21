<template>
  <div class="wrapper">
    <s-header @popupIsOpen="popupIsOpen" :popupIsClosed="popuIsShow" />
    <main class="main">
      <s-intro />
      <s-switchcards />
      <s-popup :show="popuIsShow" @popupIsClosed="popupIsClosed">
        <m-form-registration v-if="registrationOrLoginForm" className="_compact" @changeFormPopup="changeFormPopup" />
        <m-form-login v-else className="_compact" @changeFormPopup="changeFormPopup" />
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

export default {
  components: {
    MFormRegistration,
    MFormLogin,
  },
  data() {
    return {
      popuIsShow: false,
      registrationOrLoginForm: true,
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
    popupIsClosed() {
      this.popuIsShow = false;
    },
  },
};
</script>
