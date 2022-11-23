<template>
  <section class="switchcards">
    <div class="container switchcards__container">
      <h2 class="switchcards__title title" v-html="$t('title')"></h2>
      <div class="switchcards__region-box">
        <p class="switchcards__region-title">Выбор региона: {{ regionsCurrent }}</p>
        <div class="switchcards__region-toggle" @click="toggleListHandler">
          <p class="switchcards__region-current" :data-current="regionsCurrent">{{ regionsCurrent }}</p>
          <div class="switchcards__region-list" :class="[toggleList ? '_active' : '']" @click.stop="toggleOption">
            <p class="switchcards__region-option _current" data-option="usa">usa</p>
            <p class="switchcards__region-option" data-option="pol">pol</p>
            <p class="switchcards__region-option" data-option="bra">bra</p>
          </div>
        </div>
      </div>
      <div>{{ cards }}</div>
    </div>
  </section>
</template>

<script>
import './s_switchcards.scss';
import {
  getFirestore, collection, onSnapshot, query,
} from 'firebase/firestore';

export default {
  name: 's-switchcards',
  data() {
    return {
      cards: [],
      regionsList: ['usa', 'pol'],
      regionsCurrent: 'usa',
      toggleList: false,
    };
  },
  methods: {
    async fetchCards() {
      const db = getFirestore();
      const getData = query(collection(db, 'cards/usa/list'));
      onSnapshot(getData, (querySnapshot) => {
        const arr = [];
        querySnapshot.forEach((doc) => {
          arr.push(doc.data());
        });
        this.cards = arr;
      });
    },
    toggleListHandler() {
      this.toggleList = !this.toggleList;
    },
    toggleOption(event) {
      this.regionsCurrent = event.target.getAttribute('data-option');
      this.toggleList = false;
    },
  },
  mounted() {
    // this.fetchCards();
  },
};
</script>

<i18n lang="json" src="./s_switchcards.json" />
