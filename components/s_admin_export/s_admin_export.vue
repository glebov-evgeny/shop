<template>
  <section class="admin_export">
    <div class="container admin_export__container">
      <h1 class="admin_export__title">Импорт:</h1>
      <div class="admin_export__block">
        <div class="admin_export__box">
          <div class="admin_export__field">
            <p class="admin_export__field-information">Регион:</p>
            <MCardSelect
              :toggleList="toggleList"
              :regionsList="regionsList"
              :regionsCurrent="regionsCurrent"
              :regionsCurrentText="regionsCurrentText"
              @toggleListHandler="toggleListHandler"
              @toggleOption="toggleOption"
            />
          </div>
          <div class="admin_export__field">
            <p class="admin_export__field-information">Номинал:</p>
            <MCardSelectNominal
              :toggleListNominal="toggleListNominal"
              :nominalList="nominalList"
              :nominalCurrent="nominalCurrent"
              @toggleListHandlerNominal="toggleListHandlerNominal"
              @toggleOptionNominal="toggleOptionNominal"
            />
          </div>
          <div class="admin_export__field">
            <p class="admin_export__field-information">Код:</p>
            <input
              v-model.trim="code"
              type="text"
              class="form__input"
              :class="codeError ? 'error' : ''"
              placeholder="..."
            />
          </div>
          <button class="admin_export__button" @click="validateForm">Добавить</button>
        </div>
      </div>
      <button class="admin_export-test-btn" @click="testImport">import</button>
      <!--<p class="admin_import-test">{{listResult}}</p> -->
    </div>
  </section>
</template>

<script>
import './s_admin_export.scss';
import MCardSelect from '@/components/_ui/m_select/m_select';
import MCardSelectNominal from '~/components/_ui/m_select_nominal/m_select_nominal';
import { serverTimestamp } from 'firebase/firestore';
import addCard from '~/api/addCard';

export default {
  name: 's-admin-export',
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
          text: 'US (United States)',
        },
        {
          code: 'pol',
          text: 'PL (Poland)',
        },
      ],
      regionsCurrent: 'usa',
      regionsCurrentText: 'US (United States)',
      nominalList: [
        {
          code: 10,
        },
        {
          code: 20,
        },
        {
          code: 35,
        },
        {
          code: 50,
        },
      ],
      nominalCurrent: 10,
      toggleList: false,
      toggleListNominal: false,
      listResult: null,
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
    toggleOption(codeRegion) {
      const currentObject = this.regionsList.find(({ code }) => code === codeRegion);
      this.regionsCurrent = currentObject.code;
      this.regionsCurrentText = currentObject.text;
      this.toggleList = false;
    },
    toggleOptionNominal(codeRegion) {
      this.nominalCurrent = Number(codeRegion);
      this.toggleListNominal = false;
    },
    validateForm(e) {
      const randomId = Math.random();
      const currentCardInformation = {
        id: randomId,
        region: this.regionsCurrent,
        nominal: this.nominalCurrent,
        code: this.code,
        createAt: serverTimestamp(),
        isActivated: false,
      };

      if (this.code == null) {
        this.codeError = true;
      } else {
        this.validCode(this.code);
      }
      if (this.codeError === false) {
        this.exportCard(currentCardInformation);
        this.code = null;
        this.$toast.show('Карта добавлена');
      }
      e.preventDefault();
    },
    validCode(code) {
      if (code.length > 6) {
        this.codeError = false;
      } else {
        this.codeError = true;
      }
    },
    testImport() {
      // this.$toast.show('Карта добавлена');
    },
    async exportCard(currentCardInformation) {
      addCard(currentCardInformation);
    },
  },
};
</script>
