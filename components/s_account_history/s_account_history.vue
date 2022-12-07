<template>
  <section class="account_history">
    <div class="container account_history__container">
      <h2 class="account_history__title" v-html="$t('title')"></h2>
      <div class="account_history__wrapper">
        <div class="account_history__block" v-if="historyData">
          <div class="account_history__item" v-for="item in historyData" :key="item.id">
            <p class="account_history__title">Код:</p>
            <p class="account_history__text">{{ item.code }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import './s_account_history.scss';
import {
  getFirestore, collection, onSnapshot, query,
} from 'firebase/firestore';

export default {
  name: 's-account-history',
  data() {
    return {
      historyData: [],
    };
  },
  methods: {
    getUserInfo() {
      const db = getFirestore();
      const currentUser = this.$cookies.get('user').split(':')[2].split('"')[1];
      /* По клику на карточку с регионом и номиналом делаю запрос к БД, получаю только те карты, которые isActivated:false */
      const getData = query(collection(db, `user_${currentUser}`));
      onSnapshot(getData, (querySnapshot) => {
        const response = [];
        querySnapshot.forEach((docitem) => {
          response.push(docitem.data());
        });
        /* Если данные есть, устанавливаю 1 из списка в getCodes (для попапа после оплаты), если нет - ошибка. */
        if (response.length) {
          // eslint-disable-next-line prefer-destructuring
          this.historyData = response.sort((a, b) => a.createAt - b.createAt);
          /* обработка ошибки */
        } else {
          console.log('no data');
        }
      });
    },
  },
  mounted() {
    this.getUserInfo();
  },
};
</script>

<i18n lang="json" src="./s_account_history.json" />
