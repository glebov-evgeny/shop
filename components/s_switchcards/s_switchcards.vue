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
  getFirestore, collection, getDocs, onSnapshot, query,
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
      // const citiesRef = collection(db, 'cards', '');
      // console.log(citiesRef);
      console.log(getDocs);
      // const querySnapshot = await getDocs(collection(db, 'cards'));
      const getData = query(collection(db, 'cards'));
      onSnapshot(getData, (querySnapshot) => {
        const arr = [];
        querySnapshot.forEach((doc) => {
          arr.push(doc.data());
        });

        this.cards = arr;
      });
      // querySnapshot.forEach((doc) => {
      //   // this.cards.push(doc.data());
      //   console.log(`${doc.data()}`);
      //   // this.cards = `${doc.id} => ${doc.data()}`;
      // });

      // eslint-disable-next-line no-undef
      // return axios.get('https://shop-972a3.firebaseio.com/users.json');
      //   const db = getFirestore();

      //   console.log(db);
      // //   const db = getFirestore();
      //   console.log(db);
      // const productsSnap = await db.collection('products').get();
      // const productsData = productsSnap.docs.map((doc) => ({
      //   uuid: doc.id,
      //   ...doc.data(),
      // }));
      // return productsData;
      // const querySnapshot = await getDocs(collection(db, 'cards'));
      // console.log(querySnapshot);
      // querySnapshot.forEach((doc) => {
      //   console.log(`${doc.id} => ${doc.data()}`);
      // });
    },
  },
  mounted() {
    this.fetchCards();
  },
};
</script>

<i18n lang="json" src="./s_switchcards.json" />
