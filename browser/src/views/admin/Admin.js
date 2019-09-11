import services from '../../services/openService'

export default {
  name: "Admin",
  data() {
    return {
      dialogCriarCodigo: false,
      state: this.$store.state.user,
      codeAmount: null,
    }
  },
  methods: {
    async getFinExcel() {
      // 59e8d9095191ebeca03799a2
      try {
        window.open('http://179.97.106.7:8080/api/open/generate_fin_excel?authKey='+this.state.userInfo.id+'&type=user', '_blank');
        // window.open('http://192.168.0.198:1337/api/open/generate_fin_excel?authKey='+this.state.userInfo.id+'&type=user', '_blank');
      } catch (error) {
        console.error('error', error);
      }
    },
    /*
    pedro fiz a funcao de pegar os excel finalizados e também a de baixo de pegar os codigos ainda não utilizados
    mas essa de baixo tu precisa testar pra ver se ta funcionando bjus
     */
    async getFreeCodes() {
      // 59e8d9095191ebeca03799a2
      try {
        // window.open('http://192.168.0.198:1337/api/open/free_codes?authKey='+this.state.userInfo.id+'&type=user', '_blank');
        window.open('http://179.97.106.7:8080/api/open/free_codes?authKey='+this.state.userInfo.id+'&type=user', '_blank');
      } catch (error) {
        console.error('error', error);
      }
    },
    /*
    fiz um teste pra essa aqui de baixo getCodes, o parametro que usei de teste 'codetest' tu vai ter q passar do front
    um input do user tipo o que tu fez com o state.userinfo.id só que pra quantidade de codes que o usuario quer
    ai tu se vira com isso e faz ai pow
     */
    async getCodes() {
      try {
        console.log('code', this.codeAmount);
        console.log('USER', this.state);
        window.open('http://179.97.106.7:8080/api/open/code_generator?authKey='+this.state.userInfo.id+'&type=user'+'&quantity='+ this.codeAmount, '_blank');
        // window.open('http://192.168.0.198:1337/api/open/code_generator?authKey='+this.state.userInfo.id+'&type=user'+'&quantity='+ this.codeAmount, '_blank');
        this.dialogCriarCodigo = false;
      } catch (error) {
        console.error('error', error);
      }
    },
  },

}