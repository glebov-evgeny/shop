<template>
  <div class="wrapper">
    <s-header @popupIsOpen="popupIsOpen" :popupIsClosed="popupIsShow" />
    <main class="main">
      <s-account-intro />
      <s-account-history />
      <s-dump />
      <s-popup :show="popupIsShow" @popupIsClosed="popupIsClosed">
        <m-form-registration v-if="registrationOrLoginForm" className="_compact" @changeFormPopup="changeFormPopup" />
        <m-form-login v-if="!registrationOrLoginForm" className="_compact" @changeFormPopup="changeFormPopup" />
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
  middleware: 'auth',
  data() {
    return {
      popupIsShow: false,
      registrationOrLoginForm: true,
    };
  },
  mounted() {
    this.isUserLogged();
  },
  watch: {
    popupIsShow() {
      this.hideYScroll();
    },
  },
  methods: {
    hideYScroll() {
      const htmlWrapper = document.querySelector('html');
      if (this.popupIsShow) {
        htmlWrapper.style.overflow = 'hidden';
      } else {
        htmlWrapper.style.overflow = 'initial';
      }
    },

    popupIsOpen() {
      this.popupIsShow = true;
    },
    changeFormPopup() {
      this.registrationOrLoginForm = !this.registrationOrLoginForm;
    },
    popupIsClosed() {
      this.popupIsShow = false;
    },
    isUserLogged() {
      // Проверяю cookies, если user есть - беру значение в store
      if (this.$cookies.get('user')) {
        this.$store.commit('setToken', this.$cookies.get('user'));
      }
    },
  },
};
</script>
