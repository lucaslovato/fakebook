export default {
  name: "basic-dialog",
  data(){
    return{}
  },
  computed: {
    dialog: {
        get() {
            return this.$store.getters.getDialog
        },
        set(value) {
            this.$store.dispatch('updateDialog', {open: value})
        }
    }
  }
}