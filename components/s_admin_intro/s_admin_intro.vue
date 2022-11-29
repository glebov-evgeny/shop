<template>
  <section class="admin_intro">
    <div class="container admin_intro__container">
      <h1 class="admin_intro__title" v-html="$t('title')"></h1>
    </div>
  </section>
</template>

<script>
import './s_admin_intro.scss';

export default {
  name: 's-admin-intro',
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<i18n lang="json" src="./s_admin_intro.json" />
