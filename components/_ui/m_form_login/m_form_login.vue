<template>
  <form class="form" :class="currentClass" @submit="validateForm">
    <div class="form__wrapper" v-if="formWasSend">
      <div class="form__info">
        <h3 class="form__title">{{ $t('title') }}</h3>
        <p class="form__description" v-html="$t('description')"></p>
      </div>
      <div class="form__content">
        <label class="form__label">
          <input
            v-model.trim="email"
            type="email"
            class="form__input"
            :class="emailError ? 'error' : ''"
            :placeholder="$t('email')"
          />
        </label>
        <label class="form__label">
          <input
            v-model.trim="password"
            type="password"
            class="form__input"
            :class="passwordError ? 'error' : ''"
            :placeholder="$t('password')"
          />
        </label>
        <p class="form__error" v-if="errorMessageShow">{{ errorMessageText }}</p>
        <button class="form__button" type="submit">{{ $t('send') }}</button>
        <button class="form__change" type="button" @click.stop="changeFormLoginOrRegistration">
          - {{ $t('toggleOption') }} -
        </button>
        <div class="form__social">
          <div class="form__social-icon" @click.stop="signInGoogle">
            <img src="@/assets/images/common/google.png" class="form__social-image" alt="icon" />
          </div>
        </div>
      </div>
    </div>
    <div class="form__wrapper" v-else>
      <div class="form__info _center">
        <h3 class="form__title">Пасиба!</h3>
        <p class="form__description">всё ок</p>
      </div>
    </div>
  </form>
</template>

<script>
import '../m_form/m_form';
import redirectUser from '~/api/redirectUser';

export default {
  name: 'm-form-login',
  props: {
    className: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      email: null,
      password: null,
      emailError: false,
      passwordError: false,
      formWasSend: true,
      errorMessageText:
        'Тест сообщения об ошибке с многословным пояснением и подробным описанием проблемы, для визуализации переполнения контейнера излишней информацией.',
      errorMessageShow: false,
      currentClass: this.className,
    };
  },
  methods: {
    validateForm(e) {
      if (this.email == null) {
        this.emailError = true;
      } else {
        this.validEmail(this.email);
      }
      if (this.password == null) {
        this.passwordError = true;
      } else {
        this.validPassword(this.password);
      }
      if (this.passwordError === false && this.emailError === false) {
        this.loginUser();
      }
      e.preventDefault();
    },
    validEmail(email) {
      const result = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (result.test(email)) {
        this.emailError = false;
      } else {
        this.emailError = true;
      }
    },
    // eslint-disable-next-line no-unused-vars
    validPassword(password) {
      if (this.password.length > 6) {
        this.passwordError = false;
      } else {
        this.passwordError = true;
      }
    },
    async loginUser() {
      try {
        const user = await this.$fire.auth.signInWithEmailAndPassword(this.email, this.password);
        // добавляю информацию о том, что пользователь залогинен в store и cookies
        this.$store.commit('setToken', user.user.uid);
        // localStorage.setItem('user', user.user.uid);
        const cookieDataUser = { email: user.user.email, id: user.user.uid };
        this.$cookies.set('user', cookieDataUser, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 7 дней
        });
        // this.$cookies.set('user', user.user.uid);
        // убираю сообщение об ошибках с бэка
        this.errorMessageText = '';
        this.errorMessageShow = false;
        // скрываю форму и показываю "thank-success"
        this.formWasSend = false;
        // редирект на страницу
        // this.$router.push('/account');
        await redirectUser(this.$router, this.$cookies);
      } catch (error) {
        if (error.message === 'Firebase: Error (auth/wrong-password).') {
          this.somethingWrong('Неправильный логин/пароль.');
          // eslint-disable-next-line max-len
        } else if (
          error.message === 'Firebase: Error (auth/user-not-found).'
          || error.message
            === 'Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).'
        ) {
          this.somethingWrong('Пользователь не найден.');
        } else {
          console.error(`Ошибка: ${error.message}`);
        }
      }
    },
    somethingWrong(errorText) {
      this.emailError = true;
      this.passwordError = true;
      this.errorMessageText = errorText;
      this.errorMessageShow = true;
    },
    async signInGoogle() {
      const provider = new this.$fireModule.auth.GoogleAuthProvider();
      const user = await this.$fire.auth.signInWithPopup(provider);
      // добавляю информацию о том, что пользователь залогинен в store и cookies
      this.$store.commit('setToken', user.user.uid);
      // localStorage.setItem('user', user.user.uid);
      // this.$cookies.set('user', user.user.uid);
      const cookieDataUser = { email: user.user.email, id: user.user.uid };
      this.$cookies.set('user', cookieDataUser, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 дней
      });
      // убираю сообщение об ошибках с бэка
      this.errorMessageText = '';
      this.errorMessageShow = false;
      // скрываю форму и показываю "thank-success"
      this.formWasSend = false;
      // редирект на страницу
      await redirectUser(this.$router, this.$cookies);
    },
    changeFormLoginOrRegistration() {
      this.$emit('changeFormRegLog');
    },
  },
};
</script>

<i18n lang="json" src="./m_form_login.json" />
