<template>
  <section class="admin_import">
    <div class="container admin_import__container">
      <h1 class="admin_import__title">Импорт:</h1>
      <div class="admin_import__block">
        <div class="admin_import__box">
          <div class="admin_import__field">
            <p class="admin_import__field-information">Регион:</p>
            <MCardSelect
              :toggleList="toggleList"
              :regionsList="regionsList"
              :regionsCurrent="regionsCurrent"
              @toggleListHandler="toggleListHandler"
              @toggleOption="toggleOption"
            />
          </div>
          <div class="admin_import__field">
            <p class="admin_import__field-information">Номинал:</p>
            <MCardSelectNominal
              :toggleList="toggleListNominal"
              :regionsList="nominalList"
              :regionsCurrent="nominalCurrent"
              @toggleListHandlerNominal="toggleListHandlerNominal"
              @toggleOptionNominal="toggleOptionNominal"
            />
          </div>
          <div class="admin_import__field">
            <p class="admin_import__field-information">Код:</p>
            <input
              v-model.trim="code"
              type="text"
              class="form__input"
              :class="codeError ? 'error' : ''"
              placeholder="..."
            />
          </div>
          <button class="admin_import__button" @click="importCard">Добавить</button>
        </div>
      </div>
      <p class="admin_import-test">dczrfz byajhvfwbz</p>
    </div>
  </section>
</template>

<script>
import './s_admin_import.scss';
import MCardSelect from '@/components/_ui/m_select/m_select';
import MCardSelectNominal from '~/components/_ui/m_select_nominal/m_select_nominal';

export default {
  name: 's-admin-import',
  components: {
    MCardSelect,
    MCardSelectNominal,
  },
  data() {
    return {
      code: null,
      codeError: false,
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
      nominalList: [
        {
          code: 10,
          currentClass: '_current',
        },
        {
          code: 20,
          currentClass: '',
        },
        {
          code: 35,
          currentClass: '',
        },
        {
          code: 50,
          currentClass: '',
        },
      ],
      nominalCurrent: 10,
      toggleList: false,
      toggleListNominal: false,
    };
  },
  mounted() {},
  methods: {
    toggleListHandler() {
      this.toggleList = !this.toggleList;
    },
    toggleListHandlerNominal() {
      this.toggleListNominal = !this.toggleListNominal;
    },
    toggleOption(event) {
      const allItems = event.target.parentNode.querySelectorAll('.select__list-option');
      allItems.forEach((element) => {
        element.classList.remove('_current');
      });
      event.target.classList.add('_current');
      this.regionsCurrent = event.target.getAttribute('data-option');
      this.toggleList = false;
      // this.fetchCards();
    },
    toggleOptionNominal(event) {
      const allItems = event.target.parentNode.querySelectorAll('.select__list-option');
      allItems.forEach((element) => {
        element.classList.remove('_current');
      });
      event.target.classList.add('_current');
      this.nominalCurrent = Number(event.target.getAttribute('data-option'));
      this.toggleListNominal = false;
    },
    importCard() {
      const currentData = {
        region: this.regionsCurrent,
        nominal: this.nominalCurrent,
        code: this.code,
      };
      console.log(currentData);
    },
  },
};
</script>
