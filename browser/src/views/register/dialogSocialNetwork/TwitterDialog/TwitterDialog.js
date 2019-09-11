import services from "../../../../services/openService";

export default {
  name: "TwitterDialog",
  data() {
    return {}
  },
  methods: {
    send_ans: async function () {
      this.$store.dispatch('updateSocialPerm', {use: 1, name: 2});
      try {
        let ret = await services.postRequest('/socialPermUpdate',
          {
            code: this.$store.state.user.userCode.code,
            socialPerm: this.$store.state.user.register.socialPerm
          },
          this.$store.state.user.userCode.id, this.$store.state.user.userInfo);
        console.log('RET: ', ret);
        this.$store.dispatch('updateTwitterDialog', false);
        this.$store.dispatch('updateActualStep', 3);
        //  Caso ocorra um erro durante a execução
      } catch (error) {
        console.log('ERRO: ', error);
        //Aciono o vuex e realizo uma alteração nos campos do basic-dialog
        // this.$store.dispatch('updateDialog', {
        //   open: true,
        //   title: 'Ooops!',
        //   text: 'Ocorreu um erro desconhecido'
        // });
      }
    },
    back() {
      this.$store.dispatch('updateSocialPerm', {name: 2, socialBack: 1});
      this.$store.dispatch('updateTwitterDialog', false);
    }
  },
  computed: {
    dialog: {
      get() {
        return this.$store.getters.getSocialDialogs;
      },
      set(value) {
        this.$store.dispatch('updateTwitterDialog', value);
      }
    }
  }
}