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
          <button class="admin_import__button" @click="validateForm">Добавить</button>
        </div>
      </div>
      <button class="admin_import-test-btn" @click="testImport">import</button>
      <!--<p class="admin_import-test">{{listResult}}</p> -->
    </div>
  </section>
</template>

<script>
import './s_admin_import.scss';
import MCardSelect from '@/components/_ui/m_select/m_select';
import MCardSelectNominal from '~/components/_ui/m_select_nominal/m_select_nominal';
import { serverTimestamp } from 'firebase/firestore';
import addCard from '~/api/addCard';

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
        },
        {
          code: 'pol',
        },
        {
          code: 'bra',
        },
      ],
      regionsCurrent: 'usa',
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
      console.log('клик');
      this.toggleListNominal = !this.toggleListNominal;
    },
    toggleOption(event) {
      this.regionsCurrent = event.target.getAttribute('data-option');
      this.toggleList = false;
    },
    toggleOptionNominal(event) {
      console.log('rkbr');
      this.nominalCurrent = Number(event.target.getAttribute('data-option'));
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
      this.$toast.show('Карта добавлена');
    },
    async exportCard(currentCardInformation) {
      addCard(currentCardInformation);
    },
  },
};
</script>
