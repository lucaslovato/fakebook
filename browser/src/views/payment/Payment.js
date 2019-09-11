import services from "../../services/openService";

export default {
  name: "payment",
  data() {
    return {
      state: this.$store.state.user,
      paymentOptions: {
        ticket: false,
        credit: false,
        debit: false,
        payPal: false,
        pagSeguro: false,
        mercadoPago: false,
      },
      extPay: [],
      months: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
      ],
      years: [
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
      ],
      checkboxCredit: true,
      checkboxDebit: true,
      checkboxPayPal: true,
      passwordPayPal: false,
      checkboxPagSeguro: true,
      passwordPagSeguro: false,
      checkboxMercadoPago: true,
      passwordMercadoPago: false,
      payPerm: {
        ticket: 0,
        card: [
          {
            type: 0,
            saveCard: 2,
            cardBack: 2,
            cardUse: 2,
          },
          {
            type: 1,
            saveCard: 2,
            cardBack: 2,
            cardUse: 2,
          },
        ],
        extPay: [
          {
            extPayName: 0,
            extPayUse: 2,
            extPayBack: 2,
            extSave: 2
          },
          {
            extPayName: 1,
            extPayUse: 2,
            extPayBack: 2,
            extSave: 2
          },
          {
            extPayName: 2,
            extPayUse: 2,
            extPayBack: 2,
            extSave: 2

          }
        ]
      },
    }
  },
  methods: {
    clearUse() {
      this.payPerm.ticket = 0;
      for (let i = 0; i < this.payPerm.card.length; i++) {
        this.payPerm.card[i].saveCard = 2;
      }
      for (let i = 0; i < this.payPerm.extPay.length; i++) {
        if(this.payPerm.extPay[i].extPayBack === 1){
          this.payPerm.extPay[i].extPayUse = 0;
          this.payPerm.extPay[i].extSave = 2;
        }else{
          this.payPerm.extPay[i].extPayUse = 2;
          this.payPerm.extPay[i].extSave = 2;
        }

      }
    },
    async finalizePayment(name) {
      this.clearUse();
      switch (name) {
        case 'ticket':
          this.payPerm.ticket = 1;
          break;
        case 'credit':
          this.payPerm.card[0].cardUse = 1;
          if(this.checkboxCredit){
            this.payPerm.card[0].saveCard = 1;
          }else{
            this.payPerm.card[0].saveCard = 0;
          }
          break;
        case 'debit':
          this.payPerm.card[1].cardUse = 1;
          if(this.checkboxDebit){
            this.payPerm.card[1].saveCard = 1;
          }else{
            this.payPerm.card[1].saveCard = 0;
          }
          break;
        case 'payPal':
          this.payPerm.extPay[0].extPayUse = 1;
          if(this.checkboxPayPal){
            this.payPerm.extPay[0].extSave = 1;
          }else{
            this.payPerm.extPay[0].extSave = 0;
          }
          break;
        case 'pagSeguro':
          this.payPerm.extPay[1].extPayUse = 1;
          if(this.checkboxPagSeguro){
            this.payPerm.extPay[1].extSave = 1;
          }else{
            this.payPerm.extPay[1].extSave = 0;
          }
          break;
        case 'mercadoPago':
          this.payPerm.extPay[2].extPayUse = 1;
          if(this.checkboxMercadoPago){
            this.payPerm.extPay[2].extSave = 1;
          }else{
            this.payPerm.extPay[2].extSave = 0;
          }
          break;
      }
      try {
        let ret = await services.postRequest('/send_ans', {
          code: this.state.userCode.code,
          option: '4',
          update: {payPerm: this.payPerm}
        }, this.state.userCode.id, this.state.userInfo);
        if (ret.data.success) {
          let ret = await services.postRequest('/close_test', {code: this.state.userCode.code,}, this.state.userCode.id, this.state.userInfo);
          if (ret.data.success) {
            this.$router.replace('/thanks');
            this.paymentOptions[name] = false;
          } else {
            console.log('close_test error', ret);
          }
          this.$router.replace('/thanks');
          this.paymentOptions[name] = false;
        } else {
          console.log('DEU RUIM');
        }
      } catch (error) {
        console.log('erro aqui', error);
      }
    },
    goBack(name) {
      switch (name) {
        case 'credit':
          this.payPerm.card[0].cardBack = 1;
          break;
        case 'debit':
          this.payPerm.card[1].cardBack = 1;
          break;
        case 'payPal':
          this.payPerm.extPay[0].extPayBack = 1;
          break;
        case 'pagSeguro':
          this.payPerm.extPay[1].extPayBack = 1;
          break;
        case 'mercadoPago':
          this.payPerm.extPay[2].extPayBack = 1;
          break;
      }
      this.paymentOptions[name] = false;
    },
  }
}