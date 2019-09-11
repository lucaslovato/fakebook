import Home from './views/home/Home.vue';
import Admin from './views/admin/Admin.vue';
import FakeStore from './views/fakeStore/FakeStore.vue';
import Register from './views/register/Register.vue';
import GoogleLogin from './views/loginSocial/Google/GoogleLogin.vue';
import FacebookLogin from './views/loginSocial/Facebook/FacebookLogin.vue';
import TwitterLogin from './views/loginSocial/Twitter/TwitterLogin.vue';
import Payment from './views/payment/Payment.vue';
import FinalPage from './views/finalPage/FinalPage.vue';

export default [
  {
    name: 'Home',
    path: '/',
    component: Home
  },
  {
    name: 'Admin',
    path: '/admin',
    component: Admin
  },
  {
    name: 'FakeStore',
    path: '/store',
    component: FakeStore
  },
  {
    name: 'Register',
    path: '/register',
    component: Register
  },
  {
    name: 'GoogleLogin',
    path: '/googleLogin',
    component: GoogleLogin
  },
  {
    name: 'FacebookLogin',
    path: '/facebookLogin',
    component: FacebookLogin
  },
  {
    name: 'TwitterLogin',
    path: '/twitterLogin',
    component: TwitterLogin
  },
  {
    name: 'Payment',
    path: '/payment',
    component: Payment
  },
  {
    name: 'FinalPage',
    path: '/thanks',
    component: FinalPage
  }


];
