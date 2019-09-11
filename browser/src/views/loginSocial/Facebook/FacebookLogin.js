export default {
  name: "google-login",
  data(){
    return{
      email: '',
    }
  },
  beforeCreate: function () {
    this.$nextTick(function () {
      this.$store.commit('toolbarVisibility', false);
    })
  },
  methods: {
    goToForm(){
      this.$store.commit('updateUser', ret.data.data);
    }
  },
}