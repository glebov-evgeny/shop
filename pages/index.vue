<template>
  <div class="wrapper">
    <s-header @popupIsOpen="popupIsOpen" :popupIsClosed="popuIsShow" />
    <main class="main">
      <s-intro />
      <s-switchcards @popupIsOpen="popupIsOpen" @cardClickHandler="cardClickHandler" />
      <!-- ненужное-->
      <!-- <div v-if="getCodes">
        <div class="card_test-code" v-for="item in getCodes" :key="item.code">
          <p>{{ item.code }}</p>
          <br /><br />
          <p>{{ item.createAt.toDate() }}</p>
        </div>
      </div> -->
      <!-- ненужное-->
      <s-faq :questions="questions" />
      <!-- <s-dump /> -->
      <s-popup :show="popuIsShow" @popupIsClosed="popupIsClosed">
        <m-form-registration v-if="registrationOrLoginForm" @changeFormPopup="changeFormPopup" />
        <m-form-login v-if="!registrationOrLoginForm" @changeFormPopup="changeFormPopup" />
      </s-popup>
      <s-popup :show="popuIsShowContent" @popupIsClosed="popupIsClosed">
        <m-form-question v-if="isQuestionForm" />
        <m-form-payments v-if="isPaymentForm" />
        <m-form-code v-if="isSuccessCode" :getCodes="getCodes" />
      </s-popup>
    </main>
    <s-footer />
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import MFormRegistration from '@/components/_ui/m_form_registration/m_form_registration.vue';
// eslint-disable-next-line import/extensions
import MFormLogin from '@/components/_ui/m_form_login/m_form_login.vue';
// eslint-disable-next-line import/extensions
import MFormQuestion from '@/components/_ui/m_form_question/m_form_question.vue';
// eslint-disable-next-line import/extensions
import MFormPayments from '@/components/_ui/m_form_payments/m_form_payments.vue';
// eslint-disable-next-line import/extensions
import MFormCode from '@/components/_ui/m_form_code/m_form_code.vue';

// eslint-disable-next-line import/extensions
import getSuccessCode from '@/api/getSuccessCode';

// import {
//   getFirestore, collection, onSnapshot, query,
// } from 'firebase/firestore';

export default {
  components: {
    MFormRegistration,
    MFormLogin,
    MFormQuestion,
    MFormPayments,
    MFormCode,
  },
  data() {
    return {
      popuIsShow: false,
      popuIsShowContent: false,
      registrationOrLoginForm: false,
      isPaymentForm: false,
      isQuestionForm: false,
      isSuccessCode: false,
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
      getCodes: '',
    };
  },
  mounted() {
    this.isUserLogged();
    // eslint-disable-next-line no-undef
    emailjs.init('lSiwUD9_iX1bEyngQ');
  },

  watch: {
    popuIsShow() {
      this.hideYScroll();
    },
  },
  methods: {
    hideYScroll() {
      const htmlWrapper = document.querySelector('html');
      if (this.popuIsShow) {
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
      this.popuIsShow = true;
    },
    changeFormPopup() {
      this.registrationOrLoginForm = !this.registrationOrLoginForm;
    },
    async cardClickHandler(item) {
      const response = await getSuccessCode(item);
      // this.getCodes = await getSuccessCode(item);
      // this.showCurrentCode();
      this.logicFirst(response);
    },
    logicFirst(response) {
      console.log(response);
    },
    showCurrentCode() {
      this.popuIsShowContent = true;
      this.isSuccessCode = true;
    },
    popupIsClosed() {
      this.popuIsShow = false;
      this.popuIsShowContent = false;
    },
  },
  computed: {},
};
</script>
