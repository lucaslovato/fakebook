import services from "../../services/openService";

export default {
  name: "Navbar",
  data() {
    return {
      state: this.$store.state.user,
      dialogStatus: false,
      dialogPasswordShow: false,
      user: {
        email: '',
        password: '',
      },
      menu: false,
    }
  },
  methods: {
    login: async function () {
      try {
        let ret = await services.postRequest('/open/login', this.user);
        console.log('Login ret', ret);
        if(ret.data.success){
          this.$store.commit('updateUser', ret.data.data);
          this.dialogStatus = false;
          this.$router.replace('/admin');
          console.log(this.state);
        }else{
          console.log('DEU RUIM');
        }
        // console.log('response', response);
        // console.log('Store', response);
        // App.methods.changeSpinnerColor('#2a0845');("login", {datas: this.user})

      } catch (error) {
        console.log('erro aqui', error);
        // this.validate_login = true;
        // this.error_message = error.response ? error.response.data.description : "Ocorreu um erro desconhecido.";
      }
    },
    //TODO: IMPLEMENTAR O LOGOUT
    logout: async function(){
      try {
        let ret = await services.postRequest('/logout', {id: this.state.userInfo.id}, this.state.userInfo.id, 'user');
        if(ret.data.success){
          this.$store.commit('updateUser', null);
          this.$router.replace('/');
        }else{
          console.log('DEU RUIM');
        }
      } catch (error) {
        console.log('erro aqui', error);
      }
    },
    goToRegister() {
      this.$store.commit('toolbarVisibility', false);
      this.$router.replace('/register');
      this.menu = false;
    }
  }
}