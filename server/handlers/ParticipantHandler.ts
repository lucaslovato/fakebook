import {CommonHandler} from "./CommonHandler";
import {PartStatus} from "../db/model/Participant";
import {CardType} from "../db/model/Participant";
import {QueryObject} from "./util_handler/QueryObject";
import {UpdateObject} from "./util_handler/UpdateObject";

export class ParticipantHandler extends CommonHandler {
  async send_ans(data: any) {
    let ret;
    let teste = await this.isValidData(data);
    if (teste["validator"]) {
      let update = data.update;
      let query = {
        code: data.code,
      };
      let options = {
        code: 1,
        id: 1,
        basicPerm: 1,
        document: 1,
        address: 1,
        payPerm: 1,
        register: 1,
        socialPerm: 1,
        privatePerm: 1,
      };
      ret = await this.emit_to_server('db.participant.update', new UpdateObject(query, update, options));
      return this.retorno(ret.data);
    }
    ret = {
      success: false,
      description: "A key " + teste['key'] + " está faltando",
      key: teste['key']
    };
    return ret;
  }

  private isValidData(data: any) { //option tem q ser para o update
    switch (data.option) {
      case '1': { // case do update BASICPERM
        return this.firstPageConfirm(data.update);
      }
      case '2': { // case do update PRIVATEPERM
        return this.secondPageConfirm(data.update);
      }
      case '3': { // case do update REGISTER
        return this.thirdPageConfirm(data.update);
      }
      case '4': { // case do update PAYPERM
        return this.fourthPageConfirm(data.update);
      }
      case '5': { // case do update SOCIALPERM
         return this.addressConfirm(data.update);
       }
      case '6': { //case do update document
        return this.documentConfirm(data.update);
      }
      case '7': { //case do update address
        return this.addressConfirm(data.update);
      }
    }
    return false;
  }

  private firstPageConfirm(data: any) { // arrumar a data depois
    let keys = ['camera', 'dispHistory', 'locale', 'microphone', 'navHistory'];
    for (let key of keys) {
      if (!data.basicPerm.hasOwnProperty(key)) {
        return {
          validator: false,
          key: key
        };
      }
    }
    return {
      validator: true,
      key: null
    };
  }

  private secondPageConfirm(data: any) { // arrumar a data depois
    let keys = ['multimedia', 'identity', 'calendar', 'contacts'];
    for (let key of keys) {
      if (!data.privatePerm.hasOwnProperty(key)) {
        return {
          validator: false,
          key: key
        };
      }
    }
    return {
      validator: true,
      key: null
    };
  }

  private thirdPageConfirm(data: any) { // arrumar a data depois
    let keys = ['name', 'surname', 'sex', 'birthdate', 'email', 'manualBack'];
    for (let key of keys) {
      if (!data.register.hasOwnProperty(key)) {
        return {
          validator: false,
          key: key
        };
      }
    }
    return {
      validator: true,
      key: null
    };
  }

  private fourthPageConfirm(data: any) { //arrumar a data depois
    let keys = ['ticket', 'card', 'extPay'];
    let extkeys = ['extPayBack', 'extPayName', 'extPayUse', 'extSave'];
    let cardKeys = ['type', 'saveCard', 'cardUse', 'cardBack'];
    for (let key of keys) {
      if (!data.payPerm.hasOwnProperty(key)) {
        return {
          validator: false,
          key: key
        };
      }
    }
    for (let key of cardKeys) {
      for (let size in data.payPerm.card) {
        if (!data.payPerm.card[size].hasOwnProperty(key)) {
          return {
            validator: false,
            key: key
          }
        }
      }
    }
    for (let key of extkeys) {
      for (let size in data.payPerm.extPay)
        if (!data.payPerm.extPay[size].hasOwnProperty(key)) {
          return {
            validator: false,
            key: key
          };
        }
    }
    return {
      validator: true,
      key: null
    };
  }

  private fifthPageConfirm(data: any) { //arrumar a data depois
    //if(data.socialPerm.length === 3) {
    let keys = ['use', 'name', 'socialBack'];
    for (let size in data.socialPerm) {
      for (let key of keys) {
        if (!data.socialPerm[size].hasOwnProperty(key)) {
          return {
            validator: false,
            key: key
          };
        }
      }
      return {
        validator: true,
        key: null
      };
    }
    //}
    return {
      validator: false,
      key: null
    }
  }

  private addressConfirm(data: any){
    let keys = ['state', 'neighborhood', 'complement', 'addressPerm', 'number', 'city', 'cep'];
    for(let key of keys){
      if(!data.address.hasOwnProperty(key)){
        return {
          validator: false,
          key: key
        }
      }
    }
    return {
      validator: true,
      key: null
    }
  }
  private documentConfirm(data: any){
    let keys = ['rg', 'cpf', 'sms', 'cellphone', 'civilState'];
    for(let key of keys){
      if(!data.document.hasOwnProperty(key)){
        return {
          validator: false,
          key: key
        }
      }
    }
    return {
      validator: true,
      key: null
    }
  }

  async close_test(data: any) { //arrumar a data depois
    let update = {
      status: PartStatus.FINISHED,
      horaOut: this.getDateEnd(),
    };
    let query = {
      code: data.code
    };
    let options = {
      code: 1,
      status: 1,
    };
    let ret = await this.emit_to_server('db.participant.update', new UpdateObject(query, update, options));
    return this.retorno(ret.data);
  }

  private getDateEnd() {
    let date = new Date();
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
  }

  /**
   * @param data
   * @description função para update no socialPerm, não precisa vir dentro de um objeto update, diretamente o array
   * de socialPerm, vindo 1,2,3 da o update no banco com os 3 socialperm possíveis.
   * @returns update success
   */

  async socialPermUpdate(data: any) {
    let socialPermnames = [];
    let socialcomparation = [0, 1, 2];
    let aux = [];
    for (let size in data.socialPerm) {
      socialPermnames.push(data.socialPerm[size].name);
    }
    for (let key of socialcomparation) {
      if (!socialPermnames.hasOwnProperty(key)) {
        aux.push(key);
      }
    }
    for (let size in aux) {
      data.socialPerm.push({name: aux[size], use: 2, socialBack: 2});
    }
    let comparation = await this.fifthPageConfirm(data);
    if (comparation["validator"]) {
      let ret = await this.emit_to_server('db.participant.update', new UpdateObject({code: data.code}, {socialPerm: data.socialPerm}, {
        id: 1,
        socialPerm: 1
      }));
      return this.retorno(ret.data);
    }
    return {
      success: false,
      description: "algo de errado não está certo",
    }
  };
}