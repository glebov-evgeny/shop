<template>
  <section class="intro">
    <div class="container intro__container">
      <h1 class="intro__title" v-html="$t('title')"></h1>
    </div>
  </section>
</template>

<script>
import './s_intro.scss';

export default {
  name: 's-intro',
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<i18n lang="json" src="./s_intro.json" />
