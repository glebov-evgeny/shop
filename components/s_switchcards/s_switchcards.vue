<template>
  <section class="switchcards">
    <div class="container switchcards__container">
      <h2 class="switchcards__title title" v-html="$t('title')"></h2>
    </div>
  </section>
</template>

<script>
import './s_switchcards.scss';

export default {
  name: 's-switchcards',
  data() {
    return {};
  },
  methods: {},
};
</script>

<i18n lang="json" src="./s_switchcards.json" />
