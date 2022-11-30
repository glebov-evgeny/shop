<template>
  <section class="switchcards">
    <div class="container switchcards__container">
      <h2 class="switchcards__title title" v-html="$t('title')"></h2>
      <div class="switchcards__region-box">
        <p class="switchcards__region-title">Выбор региона:</p>
        <MCardSelect
          :toggleList="toggleList"
          :regionsList="regionsList"
          :regionsCurrent="regionsCurrent"
          @toggleListHandler="toggleListHandler"
          @toggleOption="toggleOption"
        />
      </div>
      <div class="switchcards__region-block">
        <m-card v-for="card in cards" :key="card.name" :name="card.name" @cardClickHandler="cardClickHandler" />
      </div>
      <div class="card_test">
        <button class="card_test-button" v-if="this.$store.state.token" @click="paymentsLogic">Если залогиненен</button>
        <button class="card_test-button" v-else @click.stop="popupIsOpen">Если не залогинен</button>
      </div>
    </div>
  </section>
</template>

<script>
import './s_switchcards.scss';
import {
  getFirestore, collection, onSnapshot, query,
} from 'firebase/firestore';

import MCard from '@/components/_ui/m_card/m_card';
import MCardSelect from '@/components/_ui/m_select/m_select';

export default {
  name: 's-switchcards',
  components: {
    MCard,
    MCardSelect,
  },
  data() {
    return {
      cards: [],
      regionsList: [
        {
          code: 'usa',
          currentClass: '_current',
        },
        {
          code: 'pol',
          currentClass: '',
        },
        {
          code: 'bra',
          currentClass: '',
        },
      ],
      regionsCurrent: 'usa',
      toggleList: false,
    };
  },
  methods: {
    async fetchCards() {
      const db = getFirestore();
      const getData = query(collection(db, `cards/${this.regionsCurrent}/list`));
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
      // const allItems = document.querySelectorAll('.switchcards__region-option');
      // allItems.forEach((element) => {
      //   element.classList.remove('_current');
      // });
      // event.target.classList.add('_current');
      this.regionsCurrent = event.target.getAttribute('data-option');
      this.toggleList = false;
      this.fetchCards();
    },
    cardClickHandler(item) {
      console.log(item);
    },
    paymentsLogic() {
      this.$emit('paymentsBtnClick');
    },
    popupIsOpen() {
      this.$emit('popupIsOpen');
    },
  },
  mounted() {
    this.fetchCards();
  },
};
</script>

<i18n lang="json" src="./s_switchcards.json" />
