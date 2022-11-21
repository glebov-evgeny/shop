<template>
  <footer class="footer">
    <div class="container footer__container">
      <p class="footer__date">&#169; {{ new Date().getFullYear() }}. {{ $t('dateinfo') }}</p>
      <div class="footer__lang">
        <nuxt-link :to="switchLocalePath('ru')" class="footer__lang-icon _active">Ru</nuxt-link>
        <span class="footer__lang-icon _line">/</span>
        <nuxt-link :to="switchLocalePath('en')" class="footer__lang-icon">En</nuxt-link>
      </div>
    </div>
  </footer>
</template>

<script>
import './s_footer.scss';

export default {
  name: 's-footer',

  data() {
    return {};
  },

  computed: {},

  watch: {},

  methods: {},

  beforeDestroy() {},

  mounted() {},
};
</script>

<i18n lang="json" src="./s_footer.json" />
