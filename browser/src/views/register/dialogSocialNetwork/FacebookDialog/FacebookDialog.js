import services from "../../../../services/openService";

export default {
  name: "FacebookDialog",
  data() {
    return {
      dialogEdit: false,
      items: [
        {divider: true,},
        {
          avatar: 'mdi-account-circle',
          subtitle: "<span class='text--primary text-wrap'>Nome completo</span>",
          action: 'mdi-alert-circle-outline'
        },
        {divider: true,},
        {
          avatar: 'mdi-account-circle',
          subtitle: "<span class='text--primary text-wrap'>URL do perfil</span>",
          action: 'mdi-alert-circle-outline'
        },
        {divider: true,},
        {
          avatar: 'mdi-account-circle',
          subtitle: "<span class='text--primary text-wrap'>E-mail</span>",
          action: 'mdi-alert-circle-outline'
        },
        {divider: true,},
        {
          avatar: 'mdi-account-circle',
          subtitle: "<span class='text--primary text-wrap'>Preferência de idioma</span>",
          action: 'mdi-alert-circle-outline'
        },
        {divider: true,},
        {
          avatar: 'mdi-account-circle',
          subtitle: "<span class='text--primary text-truncate'>Data de nascimento</span>",
          action: 'mdi-alert-circle-outline'
        },
        {divider: true,},
        {
          avatar: 'mdi-account-circle',
          subtitle: "<div class='text--primary text-wrap' style='height: auto'>Informações públicas do perfil Google+</div>",
          action: 'mdi-alert-circle-outline'
        },
        {divider: true,},
      ]
    }
  },
  methods: {

    updateSocialPerm: async function () {
      this.$store.dispatch('updateSocialPerm', {use: 1, name: 1});
      try {
        let ret = await services.postRequest('/socialPermUpdate',
          {
            code: this.$store.state.user.userCode.code,
            socialPerm: this.$store.state.user.register.socialPerm
          },
          this.$store.state.user.userCode.id, this.$store.state.user.userInfo);
        console.log('RET: ', ret);
        this.$store.dispatch('updateFacebookDialog', false);
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
      this.$store.dispatch('updateSocialPerm', {name: 1, socialBack: 1});
      this.$store.dispatch('updateFacebookDialog', false);

    },
  },
  computed: {
    dialog: {
      get() {
        return this.$store.getters.getSocialDialogs;
      },
      set(value) {
        this.$store.dispatch('updateFacebookDialog', value);
      }
    }
  }
}