<style lang="scss">
    .footer-class {
        background-color: transparent !important;
    }

    .toggle-custom-button {
        margin-bottom: 15px;
        margin-right: 10px;
        background-color: transparent !important;
    }
    .toggle-custom-button-mobile {
      display: none;
    }

    /**
     Layout mobile.
   */
    @media screen and (max-width: 767px){
        .footer-class {
            display: none;
        }
        .toggle-custom-button-mobile {
          display: flex;
          background-color: transparent !important;
        }
    }
</style>
<template>
    <v-app id="container">
        <Navbar></Navbar>
        <v-content class="background">
            <v-container fluid wrap>
                <router-view :user="user"></router-view>
            </v-container>
        </v-content>
        <v-footer fixed class="footer-class">
        </v-footer>
    </v-app>
</template>
<script>

  import Navbar from './componentes/navigation/Navbar.vue';

  export default {
    name: 'App',
    data() {
      return {
        showSpinner: true
      }
    },
    components: {
      'Navbar': Navbar,
    },
    computed: {
      user() {
        return this.$store.state.user.userInfo
      },
    },
    methods: {},
    mounted() {},
    watch: {}
  }
</script>