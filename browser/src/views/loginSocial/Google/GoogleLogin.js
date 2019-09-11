export default {
  name: "google-login",
  data(){
    return{
      progress: false,
    }
  },
  beforeCreate: function () {
    this.$nextTick(function () {
      this.$store.commit('toolbarVisibility', false);
    })
  },
  methods:{
    sendLogin(){
      // this.progress = true;
      console.log('KKK eae');
      this.$store.dispatch('updateSocialBack', false);
    }
  }
}