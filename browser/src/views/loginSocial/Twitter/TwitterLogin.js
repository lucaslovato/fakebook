export default {
  name: "twitter-login",
  beforeCreate: function () {
    this.$nextTick(function () {
      this.$store.commit('toolbarVisibility', false);
    })
  },
}