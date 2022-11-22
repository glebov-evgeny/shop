<template>
  <section class="switchcards">
    <div class="container switchcards__container">
      <h2 class="switchcards__title title" v-html="$t('title')"></h2>
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
  },
  mounted() {
    this.fetchCards();
  },
};
</script>

<i18n lang="json" src="./s_switchcards.json" />
