<template>
  <section class="faq" id="faq">
    <div class="container faq__container">
      <h2 class="faq__title title__section" v-html="$t('title')"></h2>
      <div class="faq__block">
        <div
          class="faq__question"
          v-for="(question, id) in questionsList"
          :key="id"
          :class="{ open: question.isActive }"
        >
          <div class="faq__question-top" @click="handleClick(id)">
            <div class="faq__question-title">{{ question.title }}</div>
            <div class="faq__question-arrow"></div>
          </div>
          <div class="faq__question-text" v-html="question.text"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import './s_faq.scss';

export default {
  name: 's-faq',
  props: {
    questions: {
      type: Array,
    },
  },
  data() {
    return {
      questionsList: [],
    };
  },
  mounted() {
    this.questionsList = this.questions;
    // this.handleClick(0);
  },
  methods: {
    handleClick(id) {
      this.questionsList.forEach((item, i) => {
        const elem = item;
        if (i !== id) {
          elem.isActive = false;
        }
      });
      this.questionsList[id].isActive = !this.questionsList[id].isActive;
    },
  },
};
</script>

<i18n lang="json" src="./s_faq.json" />
