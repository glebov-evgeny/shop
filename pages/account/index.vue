<template>
  <div class="wrapper">
    <s-header @popupIsOpen="popupIsOpen" :popupIsClosed="popupIsShow" />
    <main class="main">
      <s-account-intro />
      <s-account-history />
      <s-dump />
      <s-popup
        v-if="popupIsShow"
        :currenForm="currenForm"
        @popupIsClosed="popupIsClosed"
        @changeFormRegLog="changeFormRegLog"
      />
    </main>
    <s-footer />
  </div>
</template>

<script>
export default {
  name: 'pageaccount',
  components: {},
  middleware: 'auth',
  data() {
    return {
      popupIsShow: false,
      registrationOrLoginForm: true,
    };
  },
  mounted() {
    this.isUserLogged();
    this.hideYScroll();
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
    popupIsClosed() {
      this.popupIsShow = false;
    },
    changeFormRegLog() {
      if (this.currenForm === 'registration') {
        this.currenForm = 'login';
      } else {
        this.currenForm = 'registration';
      }
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
