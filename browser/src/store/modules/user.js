const state = {
  userInfo: null,
  userCode: null,
  dialog: {
    open: false,
    title: '',
    text: '',
  },
  myCart: {
    amount: 0,
    productName: null,
    image: null,
    price: null,
  },
  register: {
    actualStep: 1,
    socialPerm: [{
      use: 2,
      name: 0,
      socialBack: 2,
    }, {
      use: 2,
      name: 1,
      socialBack: 2,
    }, {
      use: 2,
      name: 2,
      socialBack: 2,
    }],
    socialDialogs: {
      google: false,
      facebook: false,
      twitter: false,
    }
  },
  toolbar: true,
};

const getters = {
  getMyCart() {
    return state.myCart;
  },
  getDialog() {
    return state.dialog;
  },
  getSocialPerm() {
    return state.register.socialPerm;
  },
  getSocialDialogs() {
    return state.register.socialDialogs;
  },
  getActualStep() {
    return state.register.actualStep;
  },
};

const actions = {
  updateDialog({commit}, value) {
    commit('dialogActions', value);
  },
  updateMyCart({commit}, value) {
    commit('incrementMyCart', value);
  },
  updateSocialPerm({commit}, payload) {
    commit('addSocialPerm', payload);
  },
  updateSocialBack({commit}, value) {
    console.log('Passei!!');
    commit('loginSocial', value);
  },
  updateGoogleDialog({commit}, value) {
    commit('googleDialog', value);
  },
  updateFacebookDialog({commit}, value) {
    commit('facebookDialog', value);
  },
  updateTwitterDialog({commit}, value) {
    commit('twitterDialog', value);
  },
  updateActualStep({commit}, value) {
    commit('actualStep', value);
  },
};

const mutations = {
  addSocialPerm(state, payload) {
    Object.assign(state.register.socialPerm[payload.name], payload);
  },

  loginSocial(state, value) {
    let index = state.socialPerm.length;
    console.log('index', index);
    state.socialPerm[index].socialBack = value;
  },

  initUser(state, userInfo) {
    state.userInfo = userInfo;
  },
  updateUser(state, updatedInfo) {
    state.userInfo = updatedInfo;
  },

  updateUserCode(state, updatedCode) {
    state.userCode = updatedCode;
  },

  incrementMyCart(state, payload) {
    state.myCart.amount++;
    state.myCart.productName = payload.productName;
    state.myCart.image = payload.image;
    state.myCart.price = payload.price * state.myCart.amount;
  },

  dialogActions(state, payload) {
    state.dialog.open = payload.open;
    state.dialog.title = payload.title;
    state.dialog.text = payload.text;
  },
  toolbarVisibility(state, action) {
    state.toolbar = action;
    console.log('TESTE');
  },
  googleDialog(state, payload) {
    state.register.socialDialogs.google = payload;
  },
  facebookDialog(state, payload) {
    state.register.socialDialogs.facebook = payload;
  },
  twitterDialog(state, payload) {
    state.register.socialDialogs.twitter = payload;
  },
  actualStep(state, value) {
    state.register.actualStep = value;
  }

};

export default {
  state,
  getters,
  actions,
  mutations
}