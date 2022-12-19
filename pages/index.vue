<template>
  <div class="wrapper">
    <s-header @popupIsOpen="popupIsOpen" :popupIsClosed="popupIsShow" />
    <main class="main">
      <s-intro />
      <s-switchcards @cardClickHandler="cardClickHandler" />
      <s-faq :questions="questions" />
      <!-- <s-dump /> -->
      <s-popup
        v-if="popupIsShow"
        :currenForm="currenForm"
        :getCodes="getCodes"
        :currentCode="currentCode"
        @popupIsClosed="popupIsClosed"
        @changeFormRegLog="changeFormRegLog"
        @successPayments="successPayments"
      />
    </main>
    <s-footer :fixedBtn="fixedBtn" @fixedBtnHandler="fixedBtnHandler" />
  </div>
</template>

<script>
import {
  getFirestore, setDoc, doc, collection, onSnapshot, query, where, deleteDoc,
} from 'firebase/firestore';

export default {
  name: 'pagemain',
  components: {},
  data() {
    return {
      popupIsShow: false,
      currenForm: 'login',
      fixedBtn: true,
      questions: [
        {
          title: 'Что такое подарочная карта Nintendo eShop?',
          // eslint-disable-next-line max-len
          text: 'Карта Nintendo eShop позволяет быстро пополненить счет вашей учетной записи. Продукт представляет собой 16-значный код, который служит для погашения карты. Это идеальный подарок для тех, кто любит играть.',
          isActive: false,
        },
        {
          title: 'Для какого региона предназначены карты, что продаются на сайте?',
          // eslint-disable-next-line max-len
          text: 'Карты предназначены для регионов Польши и США. Информация о регионе указана на карте.',
          isActive: false,
        },
        {
          title: 'Как активировать карту?',
          // eslint-disable-next-line max-len
          text: `<span>На консоли Nintendo Switch:</span><br/>
                1. Запустите Nintendo eShop из меню HOME на консоли.<br/>
                2. Нажмите на Меню в верхнем левом углу нижнего экрана.<br/>
                3. Выберите пункт Добавить средства или Активировать код.<br/>
                4. Введите 16-значный код загрузки на появившемся экране и коснитесь Подтвердить.<br/><br/>
                <span>В веб-браузере через учетную запись Nintendo:</span><br/>
                1. В браузере перейдите на страницу Использовать код и выполните вход в учетную запись Nintendo.<br/>
                2. Введите 16-значный код для пополнения счета и нажмите ОК.<br/>
                3. Нажмите Подтвердить, чтобы завершить.`,
          isActive: true,
        },
        {
          title: 'Как изменить настройку страны в учетной записи Nintendo?',
          // eslint-disable-next-line max-len
          text: `Пользователи сервиса имеют возможность изменить настройку страны в учетной записи Nintendo. Но не забывайте, что это может оказать влияние на доступные вам сервисы. Например, списки заданий и наград могут различаться в зависимости от страны. Или можно потерять золотые очки My Nintendo, так как они используются только в стране с той же валютой, что и в стране, где вы их заработали.<br/><br/>
                Для изменения настройки страны или региона в вашей учетной записи Nintendo обязательно отключите автоматическое продление членского статуса Nintendo Switch Online.<br/><br/>
                Изменить другую информацию о пользователе можно в разделе Настройки вашей учетной записи Nintendo. Сервис My Nintendo использует информацию о пользователе из вашей учетной записи Nintendo.`,
          isActive: false,
        },
      ],
      getCodes: {},
      currentCode: {},
    };
  },
  mounted() {
    this.isUserLogged();
    // eslint-disable-next-line no-undef
    emailjs.init('lSiwUD9_iX1bEyngQ');
  },

  watch: {
    popupIsShow() {
      this.hideYScroll();
    },
  },
  methods: {
    hideYScroll() {
      const htmlWrapper = document.querySelector('html');
      if (this.popupIsShow) {
        htmlWrapper.style.overflow = 'hidden';
      } else {
        htmlWrapper.style.overflow = 'auto';
      }
    },
    isUserLogged() {
      // Проверяю cookies, если user есть - беру значение в store
      if (this.$cookies.get('user')) {
        this.$store.commit('setToken', this.$cookies.get('user'));
      }
    },
    popupIsOpen() {
      this.currenForm = 'login';
      this.popupIsShow = true;
    },
    popupIsClosed() {
      this.popupIsShow = false;
    },
    fixedBtnHandler() {
      this.popupIsShow = true;
      this.currenForm = 'formquestion';
    },
    changeFormRegLog() {
      if (this.currenForm === 'login') {
        this.currenForm = 'registration';
      } else {
        this.currenForm = 'login';
      }
    },
    cardClickHandler(item) {
      /* Покупка возможна только для зарегистрированных пользователей */
      if (this.$cookies.get('user')) {
        const db = getFirestore();
        /* По клику на карточку с регионом и номиналом делаю запрос к БД, получаю только те карты, которые isActivated:false */
        const getData = query(
          collection(db, `${item.region}_cards_${item.nominal}`),
          where('isActivated', '==', false),
        );
        onSnapshot(getData, (querySnapshot) => {
          const response = [];
          querySnapshot.forEach((docitem) => {
            response.push(docitem.data());
          });
          /* Если данные есть, устанавливаю 1 из списка в getCodes (для попапа после оплаты), если нет - ошибка. */
          if (response.length) {
            // eslint-disable-next-line prefer-destructuring
            this.getCodes = response[0];
            /* симулирую платеж */
            this.paymentPopup();
          } else {
            console.log('no code here');
          }
        });
      } else {
        this.popupIsOpen();
      }
    },
    paymentPopup() {
      this.popupIsShow = true;
      this.currenForm = 'formpay';
    },
    /* успешный ответ после оплаты */
    successPayments(cardId) {
      this.updateUserInfo(cardId);
    },
    showCurrentCode() {
      this.popupIsShow = true;
      this.currenForm = 'formcode';
    },
    async updateUserInfo(cardId) {
      /* Определил текущего юзера */
      const currentUser = this.$cookies.get('user').split(':')[2].split('"')[1];

      /* 1. Записал ему купленное. коллекция: user_КУКА, документ: id-карточки, контент: карточка. Они отобразятся в личном кабинете  */
      const db = getFirestore();
      await setDoc(doc(db, `user_${currentUser}`, `${cardId}`), this.getCodes);

      /* 2. Показываю попап с кодом */
      this.currentCode = this.getCodes;
      setTimeout(() => {
        this.showCurrentCode();
      }, 3000);

      /* 3. Удаляю карточку из БД */
      const ref = doc(db, `${this.getCodes.region}_cards_${this.getCodes.nominal}`, `${cardId}`);
      deleteDoc(ref);
    },
  },
  computed: {},
};
</script>
