<template>
  <section class="intro">
    <div class="container intro__container">
      <div class="intro__content">
        <h1 class="intro__title" v-html="$t('title')"></h1>
        <div class="intro__line"></div>
        <p class="intro__description" v-html="$t('description')"></p>
        <p class="intro__fun" v-html="$t('fun')"></p>
      </div>
      <div class="intro__decoration">
        <img src="@/assets/images/intro/circle.svg" class="intro__circle" alt="logo" />
      </div>
    </div>
    <div class="intro__diagonal"></div>
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
