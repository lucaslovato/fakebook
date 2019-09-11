import services from "../../services/openService";
import {required} from 'vuelidate/lib/validators';
import BasicDialog from '../../componentes/basicDialog/BasicDialog.vue';

export default {
  name: 'Home',

  validations: {
    code: {required},
  },

  components: {
    'basic-dialog': BasicDialog,
  },

  data() {
    return {
      code: '',
      dialogStatus: false,
      basicPerm: {
        locale: true,
        microphone: true,
        camera: true,
        navHistory: true,
        dispHistory: true,
      },
      selectedPerm: [],
    }
  },
  computed: {
    codeErrors() {
      const errors = [];
      if (!this.$v.code.$dirty) return errors;
      !this.$v.code.required && errors.push('Insira um código');
      return errors;
    }
  },
  methods: {
    verifyCode() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.login_participant();
      }
    },
      /**
       * @author Pedro Rodrigues <peaugust@hotmail.com>
       * @description Realiza a autenticação de um código de usuário para permitir acesso ao sistema
       * @returns {Promise<void>}
       */
    login_participant: async function () {
      try {
        //Realizo um post com o código que o usuário inseriu
        let ret = await services.postRequest('/open/login_participant', {code: this.code},);
        //Caso o código seja válido
        if (ret.data.success) {
          //Aqui eu guardo as informações do usuário no Vuex(Tipo e código)
          this.$store.commit('updateUser', 'participant');
          this.$store.commit('updateUserCode', ret.data.data[0]);
          //Troco a rota do meu usuário
          this.$router.replace('/store');
        //Caso o código seja inválido
        } else {
              //Aciono o vuex e realizo uma alteração nos campos do basic-dialog
              this.$store.dispatch('updateDialog', {
              open: true, title: 'Não foi possível realizar a operação',
              text: ret.data.description
            });
        }
      //  Caso ocorra um erro durante a execução
      } catch (error) {
          //Aciono o vuex e realizo uma alteração nos campos do basic-dialog
          this.$store.dispatch('updateDialog', {
              open: true,
              title: 'Ooops!',
              text: 'Ocorreu um erro desconhecido'
          });
      }
    }

  }
}