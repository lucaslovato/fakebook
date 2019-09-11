import BasicDialog from './../../componentes/basicDialog/BasicDialog.vue';
import FacebookDialog from './dialogSocialNetwork/FacebookDialog/FacebookDialog.vue';
import GoogleDialog from './dialogSocialNetwork/Googledialog/GoogleDialog.vue';
import TwitterDialog from './dialogSocialNetwork/TwitterDialog/TwitterDialog.vue';
import {required, email, numeric, maxLength, minLength} from 'vuelidate/lib/validators';
import services from "../../services/openService";

export default {
  name: "Register",
  data() {
    return {
      state: this.$store.state.user,
      step2: {
        name: null,
        surname: null,
        birthdate: null,
        sex: null,
        sexOptions: [
          {text: 'Masculino', value: 1},
          {text: 'Feminino', value: 2},
          {text: 'Prefiro não informar', value: 0},
        ],
        email: null,
        password: null,
        showPassword: false,
      },
      menu: false,
      step3: {
        civilState: null,
        civilStateOpt: [
          {text: 'Casado(a)', value: 1},
          {text: 'Divorciado(a)', value: 2},
          {text: 'Solteiro(a)', value: 3},
          {text: 'Viúvo(a)', value: 4},
          {text: 'Prefiro não informar', value: 0}
        ],
        cpf: null,
        rg: null,
        cellphone: null,
      },
      password: null,
      complement: null,
      neighborhood: null,
      country: null,
      sms: null,
      dialog: false,
      dialog2: false,

      dialog3: false,
      googleWindow: null,
      facebookWindow: null,
      twitterWindow: null,
      step4: {
        cep: null,
        complement: null,
        address: null,
        number: null,
        city: null,
        neighborhood: null,
        state: null,
      },
      register: {
        name: 0,
        surname: 0,
        sex: 0,
        birthdate: 0,
        email: 0,
        manualBack: 0,
      },
      document: {
        civilState: 0,
        cpf: 2,
        rg: 0,
        cellphone: 2,
        sms: 0,
      },
      locale: {
        addressPerm: 2,
        neighborhood: 0,
        complement: 0,
        cep: 0,
        address: 0,
        number: 0,
        city: 0,
        state: 0,
      },
      privatePerm: {
        multimedia: 1,
        identity: 1,
        calendar: 1,
        contacts: 1,
      }
    }
  },

  validations: {
    step2: {
      name: {required},
      surname: {required},
      password: {required}
    },
    step3: {
      cpf: {required, numeric, maxLength: maxLength(11), minLength: minLength(11)},
      cellphone: {required, numeric}
    },
    step4: {
      cep: {required},
      address: {required},
      number: {required},
      neighborhood: {required},
      city: {required},
      state: {required},
    }
  },
  components: {
    'BasicDialog': BasicDialog,
    'FacebookDialog': FacebookDialog,
    'GoogleDialog': GoogleDialog,
    'TwitterDialog': TwitterDialog
  },
  watch: {
    menu(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'));
      console.log('val:', val);
      console.log('this.$refs:', this.$refs);
    },
  },

  computed: {
    birthdate1() {
      return this.formatDateBR(this.step2.birthdate);
    }
  },

  methods: {
    //FUNÇÕES QUE ABREM OS DIALOGS DAS REDES SOCIAIS
    openGoogle() {
      this.$store.dispatch('updateGoogleDialog', true);
    },
    openFacebook() {
      this.$store.dispatch('updateFacebookDialog', true);
    },
    openTwitter() {
      this.$store.dispatch('updateTwitterDialog', true);
    },

    //FUNÇÔES RELATIVAS ÀS STEPS
    getActualStep() {
      return this.$store.getters.getActualStep;
    },
    setActualStep(value) {
      if (value === 1) {
        console.log('VOCÊ VOLTOU', this.register);
        this.register.manualBack = 1;
        this.step2SendBack();
      } else {
        this.$store.dispatch('updateActualStep', value);
      }
    },
    updateSocialPerm: async function () {
      try {
        let ret = await services.postRequest('/socialPermUpdate',
          {
            code: this.$store.state.user.userCode.code,
            socialPerm: this.$store.state.user.register.socialPerm,
          },
          this.$store.state.user.userCode.id, this.$store.state.user.userInfo);
        console.log('RET: ', ret);
        this.$store.dispatch('updateActualStep', 2);
        //  Caso ocorra um erro durante a execução
      } catch (error) {
        console.log('ERRO: ', error);
      }
    },
    //FUNÇÔES RELATIVAS AOS CAMPOS
    error(number) {
      const errors = [];
      switch (number) {
        case 0:
          if (!this.$v.step2.name.$dirty) return errors;
          !this.$v.step2.name.required && errors.push('Insira seu Nome');
          break;
        case 1:
          if (!this.$v.step2.surname.$dirty) return errors;
          !this.$v.step2.surname.required && errors.push('Insira seu Sobrenome');
          break;
        case 2:
          if (!this.$v.step2.birthdate.$dirty) return errors;
          !this.$v.step2.birthdate.required && errors.push('Insira sua Data de Nascimento');
          break;
        case 4:
          if (!this.$v.step2.password.$dirty) return errors;
          !this.$v.step2.password.required && errors.push('Insira sua senha');
          break;
        case 5:
          if (!this.$v.step3.cpf.$dirty) return errors;
          !this.$v.step3.cpf.numeric && errors.push('Apenas números');
          !this.$v.step3.cpf.maxLength && errors.push('Insira um CPF válido');
          !this.$v.step3.cpf.minLength && errors.push('Insira um CPF válido');
          !this.$v.step3.cpf.required && errors.push('Insira um CPF');
          break;
        case 6:
          if (!this.$v.step3.cellphone.$dirty) return errors;
          !this.$v.step3.cellphone.numeric && errors.push('Apenas números');
          !this.$v.step3.cellphone.required && errors.push('Insira um Telefone');
          break;
        case 7:
          if (!this.$v.step4.cep.$dirty) return errors;
          !this.$v.step4.cep.required && errors.push('Insira seu CEP');
          break;
        case 8:
          if (!this.$v.step4.address.$dirty) return errors;
          !this.$v.step4.address.required && errors.push('Insira sua Rua');
          break;
        case 9:
          if (!this.$v.step4.number.$dirty) return errors;
          !this.$v.step4.number.required && errors.push('Insira seu Número');
          break;
        case 10:
          if (!this.$v.step4.neighborhood.$dirty) return errors;
          !this.$v.step4.neighborhood.required && errors.push('Insira seu Bairro');
          break;
        case 11:
          if (!this.$v.step4.city.$dirty) return errors;
          !this.$v.step4.city.required && errors.push('Insira sua Cidade');
          break;
        case 12:
          if (!this.$v.step4.state.$dirty) return errors;
          !this.$v.step4.state.required && errors.push('Insira seu Estado');
          break;
      }
      // !this.$v.code.required && errors.push('Insira um código');
      return errors;
    },
    formatDateBR(date) {
      console.log(date);
      if (!date) return null;

      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`
    },
    prepareToSendRegister() {
      if (!!this.step2.name) {
        this.register.name = 1;
      }
      if (!!this.step2.surname) {
        this.register.surname = 1;
      }
      if (!!this.step2.sex) {
        if (this.step2.sex > 0) {
          this.register.sex = 1;
        } else {
          this.register.sex = 0;
        }
      }
      if (!!this.step2.birthdate) {
        this.register.birthdate = 1;
      }
      if (!!this.step2.email) {
        this.register.email = 1;
      }
    },
    prepareToSendDocs(sms) {
      if (!!this.step3.civilState) {
        this.document.civilState = 1;
      }
      if (!!this.step3.civilState) {
        if (this.step3.civilState !== 0) {
          this.document.civilState = 1;
        } else {
          this.document.civilState = 0;
        }
      }
      console.log('RG', this.step3.rg);
      if (!!this.step3.rg) {
        this.document.rg = 1;
      }
      this.document.cpf = 1;
      this.document.cellphone = 1;
      this.document.sms = sms;
      this.step3Send();
    },
    prepareToSendLocale() {
      if (!!this.step4.complement) {
        this.locale.complement = 1;
      }
      this.locale.cep = 1;
      this.locale.address = 1;
      this.locale.number = 1;
      this.locale.neighborhood = 1;
      this.locale.city = 1;
      this.locale.state = 1;
      this.dialog3 = true;
      this.step4Send();
    },
    allowLocale() {
      this.step4 = {
        cep: '88035-001',
        address: 'Av. Madre Benvenuta',
        number: '2007',
        city: 'Florianópolis',
        neighborhood: 'Itacorubi',
        state: 'Santa Catarina',
      };
      let obj = {
        addressPerm: 1,
        cep: 1,
        complement: 0,
        address: 1,
        number: 1,
        city: 1,
        neighborhood: 1,
        state: 1,
      };
      this.locale = Object.assign(this.locale, obj);
      this.dialog2 = false;
    },

    cancelLocale() {
      this.locale.addressPerm = 0;
      this.dialog2 = false;
    },

    save(date) {
      console.log(date);
      this.$refs.dialog.save(date)
    },

    //FUNÇÕES QUE ENVIAM DADOS PARA O SERVIDOR
    step2SendBack: async function () {
      console.log('MANDANDO A STEP2');
      this.prepareToSendRegister();
      try {
        let ret = await services.postRequest('/send_ans', {
          code: this.state.userCode.code,
          option: '3',
          update: {
            register: this.register,
          }
        }, this.state.userCode.id, this.state.userInfo);
        if (ret.data.success) {
          console.log('RET:', ret.data, this.register);
          this.$store.dispatch('updateActualStep', 1);
        } else {
          console.log('RET:', ret);
        }
      } catch (error) {
        console.log('erro aqui', error);
      }
    },
    step2Send: async function () {
      console.log('MANDANDO A STEP2');
      this.prepareToSendRegister();
      try {
        let ret = await services.postRequest('/send_ans', {
          code: this.state.userCode.code,
          option: '3',
          update: {
            register: this.register,
          }
        }, this.state.userCode.id, this.state.userInfo);
        if (ret.data.success) {
          console.log('RET:', ret.data, this.register);
          this.setActualStep(3);
        } else {
          console.log('RET:', ret);
        }
      } catch (error) {
        console.log('erro aqui', error);
      }
    },
    step3Send: async function () {
      try {
        let ret = await services.postRequest('/send_ans', {
          code: this.state.userCode.code,
          option: '6',
          update: {
            document: this.document,
          }
        }, this.state.userCode.id, this.state.userInfo);
        if (ret.data.success) {
          console.log('RET Sucesso:', ret.data);
          this.dialog = false;
          this.setActualStep(4);
        } else {
          console.log('RET Não Sucesso:', ret);
        }
      } catch (error) {
        console.log('erro aqui', error);
      }
    },
    step4Send: async function () {
      try {
        let ret = await services.postRequest('/send_ans', {
          code: this.state.userCode.code,
          option: '7',
          update: {
            address: this.locale,
          }
        }, this.state.userCode.id, this.state.userInfo);
        if (ret.data.success) {
          console.log('RET Sucesso:', ret.data);
        } else {
          console.log('RET Não Sucesso:', ret);
        }
      } catch (error) {
        console.log('erro aqui', error);
      }
    },
    sendPvtPerm: async function () {
      try {
        let ret = await services.postRequest('/send_ans', {
          code: this.state.userCode.code,
          option: '2',
          update: {
            privatePerm: this.privatePerm
          }
        }, this.state.userCode.id, this.state.userInfo);
        if (ret.data.success) {
          console.log(ret.data.success);
          this.$router.replace('payment');
        }
      } catch (error) {
        console.log('erro aqui', error);
      }
    },

  }
}