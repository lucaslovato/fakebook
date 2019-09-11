import services from "../../../../services/openService";

export default {
  name: "DialogGoogle",
  data() {
    return {
      progress: false,
      items: [
        {divider: true,},
        {
          avatar: 'mdi-account-circle',
          subtitle: "<span class='text--primary text-wrap'>Nome completo</span>",
        },
        {divider: true,},
        {
          avatar: 'mdi-account-circle',
          subtitle: "<span class='text--primary text-wrap'>URL do perfil</span>",
        },
        {divider: true,},
        {
          avatar: 'mdi-account-circle',
          subtitle: "<span class='text--primary text-wrap'>E-mail</span>",
        },
        {divider: true,},
        {
          avatar: 'mdi-account-circle',
          subtitle: "<span class='text--primary text-wrap'>Preferência de idioma</span>",
        },
        {divider: true,},
        {
          avatar: 'mdi-account-circle',
          subtitle: "<span class='text--primary text-truncate'>Data de nascimento</span>",
        },
        {divider: true,},
        {
          avatar: 'mdi-account-circle',
          subtitle: "<div class='text--primary text-wrap' style='height: auto'>Informações públicas do perfil Google+</div>",
        },
        {divider: true,},
      ]
    }
  },
  methods: {
    send_ans: async function () {
      this.$store.dispatch('updateSocialPerm', {use: 1, name: 0,});
      try {
        let ret = await services.postRequest('/socialPermUpdate',
          {
            code: this.$store.state.user.userCode.code,
            socialPerm: this.$store.state.user.register.socialPerm
          },
          this.$store.state.user.userCode.id, this.$store.state.user.userInfo);
        console.log('RET: ', ret);
        this.$store.dispatch('updateGoogleDialog', false);
        this.$store.dispatch('updateActualStep', 3);
        //  Caso ocorra um erro durante a execução
      } catch (error) {
        console.log('ERRO: ', error);
      }
    },
    back() {
      this.$store.dispatch('updateSocialPerm', {name: 0, socialBack: 1});
      this.$store.dispatch('updateGoogleDialog', false);
    }
  },
  computed: {
    dialog: {
      get() {
        return this.$store.getters.getSocialDialogs;
      },
      set(value) {
        this.$store.dispatch('updateGoogleDialog', value);
      }
    }
  }
}