<template>
  <section class="switchcards" id="switchcards">
    <div class="container switchcards__container">
      <h2 class="switchcards__title title__section" v-html="$t('title')"></h2>
      <div class="switchcards__top">
        <p class="switchcards__description" v-html="$t('region_choise')"></p>
        <div class="switchcards__top-wrapper">
          <MCardSelect
            :toggleList="toggleList"
            :regionsList="regionsList"
            :regionsCurrent="regionsCurrent"
            :regionsCurrentText="regionsCurrentText"
            @toggleListHandler="toggleListHandler"
            @toggleOption="toggleOption"
          />
        </div>
      </div>
      <div class="switchcards__bottom">
        <m-card
          v-for="card in cards"
          :key="card.nominal"
          :card="card"
          :regionsCurrentText="regionsCurrentText"
          :curretValue="curretValue"
          @cardClickHandler="cardClickHandler"
        />
      </div>
      <!-- <div class="card_test">
        <button class="card_test-button" v-if="this.$store.state.token" @click="paymentsLogic">Если залогиненен</button>
        <button class="card_test-button" v-else @click.stop="popupIsOpen">Если не залогинен</button>
      </div> -->
    </div>
    <div class="switchcards__diagonal"></div>
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
          text: 'US (United States)',
        },
        {
          code: 'pol',
          text: 'PL (Poland)',
        },
      ],
      regionsCurrent: 'usa',
      regionsCurrentText: 'US (United States)',
      toggleList: false,
    };
  },
  methods: {
    async fetchCards() {
      const db = getFirestore();
      const getData = query(collection(db, `${this.regionsCurrent}`));
      onSnapshot(getData, (querySnapshot) => {
        const arr = [];
        querySnapshot.forEach((doc) => {
          arr.push(doc.data());
        });
        arr.sort((a, b) => a.nominal - b.nominal);
        this.cards = arr;
      });
    },
    toggleListHandler() {
      this.toggleList = !this.toggleList;
    },
    toggleOption(codeRegion) {
      const currentObject = this.regionsList.find(({ code }) => code === codeRegion);
      this.regionsCurrent = currentObject.code;
      this.regionsCurrentText = currentObject.text;
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
  computed: {
    curretValue() {
      if (this.regionsCurrent === 'pol') {
        return 'zł';
      }
      return '$';
    },
  },
  mounted() {
    this.fetchCards();
  },
};
</script>

<i18n lang="json" src="./s_switchcards.json" />
