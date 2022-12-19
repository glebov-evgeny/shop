<template>
  <footer class="footer" :class="fixedBtn ? '_fixed' : ''">
    <div class="container footer__container">
      <p class="footer__date">&#169; {{ new Date().getFullYear() }}. {{ $t('dateinfo') }}</p>
      <div class="footer__lang">
        <nuxt-link :to="switchLocalePath('ru')" class="footer__lang-icon _active">Ru</nuxt-link>
        <span class="footer__lang-icon _line">/</span>
        <nuxt-link :to="switchLocalePath('en')" class="footer__lang-icon">En</nuxt-link>
      </div>
    </div>
    <div class="footer__bottom">
      <button v-if="fixedBtn" class="footer__bottom-btn" @click.stop="fixedBtnHandler">{{ $t('fixed_btn') }}</button>
    </div>
  </footer>
</template>

<script>
import './s_footer.scss';

export default {
  name: 's-footer',
  props: {
    fixedBtn: {
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  methods: {
    fixedBtnHandler() {
      this.$emit('fixedBtnHandler');
    },
  },
};
</script>

<i18n lang="json" src="./s_footer.json" />
