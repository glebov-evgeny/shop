<template>
  <section class="account_intro">
    <div class="container account_intro__container">
      <h1 class="account_intro__title" v-html="$t('title')"></h1>
    </div>
  </section>
</template>

<script>
import './s_account_intro.scss';

export default {
  name: 's-account-intro',
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<i18n lang="json" src="./s_account_intro.json" />
