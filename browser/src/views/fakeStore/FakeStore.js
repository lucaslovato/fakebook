import services from "../../services/openService";

export default {
  name: "FakeStore",
  data() {
    return {
      dialog: true,
      basicPerm: {
        dispHistory: true,
        navHistory: true,
        camera: true,
        microphone: true,
        locale: true,
      },
      state: this.$store.state.user,
      sizes: ['32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43'],
      selected: 0,
      selectedSize: 'Selecione',
      disableFinalize: true,
      products: [
        {
          index: 0,
          price: 79.90,
          title: 'Tênis Kappa Impact - Azul e Marinho',
          color: 'Azul e Marinho',
          images: [
            'src/assets/tenis-azul.jpg',
            'src/assets/tenis-azul2.jpg',
            'src/assets/tenis-azul3.jpg',
          ],
        },
        {
          index: 1,
          price: 99.90,
          title: 'Tênis Kappa Impact - Branco e Preto',
          color: 'Preto e Branco',
          images: [
            'src/assets/tenis-pb.jpg',
            'src/assets/tenis-pb2.jpg',
            'src/assets/tenis-pb3.jpg',
          ],
        },
        {
          index: 2,
          price: 79.90,
          title: 'Tênis Kappa Impact - Marinho e Verde Limão',
          color: 'Marinho e Verde Limão',
          images: [
            'src/assets/tenis-mali.jpg',
            'src/assets/tenis-mali2.jpg',
            'src/assets/tenis-mali3.jpg',
          ],
        },
      ],
    }
  },
methods: {
  send_ans: async function () {
    try {
      let ret = await services.postRequest('/send_ans',
        {
          code: this.state.userCode.code,
          option: '1',
          update: {
            basicPerm: this.basicPerm
          }
        }, this.state.userCode.id, this.state.userInfo);
      if (ret.data.success) {
        this.dialog = false;
      } else {
        this.dialog = false;
      }
    } catch (error) {
      console.log('erro aqui', error);
    }
  }
,
  addToCart()
  {
    console.log(this.products[this.selected]);
    this.$store.dispatch('updateMyCart', {
      productName: this.products[this.selected].title,
      image: this.products[this.selected].images[0],
      price: this.products[this.selected].price,
    });
  }
,
  finalizePurchase()
  {
    this.$store.commit('toolbarVisibility', false);
    this.$router.replace('/register');
  }
,
}
}