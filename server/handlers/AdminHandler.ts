import {CommonHandler} from "./CommonHandler";
import {CardType, ExtPayType, PartStatus, SocialName} from "../db/model/Participant";
import {QueryObject} from "./util_handler/QueryObject";
import * as fs from "fs";

const generatePassword = require('password-generator');

export class AdminHandler extends CommonHandler {

  async part_read(data) {
    let query = {
      status: data.status,
    };
    let select = "code payPerm register socialPerm privatePerm basicPerm";
    let ret = await this.emit_to_server('db.participant.read', new QueryObject(query, select));
    return this.retorno(ret.data);
  };

  private async get_finished_users_array() {
    let query = {
      $or: [{status: PartStatus.INITIATED}, {status: PartStatus.FINISHED}]
    };
    let select = "code payPerm register address document socialPerm privatePerm basicPerm horaIn horaOut";
    let jsons_array = await this.emit_to_server('db.participant.read', new QueryObject(query, select));
    return this.retorno(jsons_array.data);
  }

  async generate_fin_excel(data: any) {
    let teste = await this.get_finished_users_array();
    let xls = [];
    if (!teste.success) {
      return this.retorno(teste.data);
    }
    for (let i = 0; i < teste.data.length; i++) {
      // xls[i] = j2x(teste.data[i]);
      let data = {};
      data[`Código`] = teste.data[i].code;
      data[`Permissões Básicas => `] = ``;
      data[`Câmera`] = this.stringReturn(teste.data[i].basicPerm.camera);
      data[`Microfone`] = this.stringReturn(teste.data[i].basicPerm.microphone);
      data[`Localização`] = this.stringReturn(teste.data[i].basicPerm.locale);
      data[`Histórico de Navegação`] = this.stringReturn(teste.data[i].basicPerm.navHistory);
      data[`Histórico do dispositivo`] = this.stringReturn(teste.data[i].basicPerm.dispHistory);
      data[`Permissões Social => `] = ``;
      for (let size in teste.data[i].socialPerm) {
        let socialName;
        if (teste.data[i].socialPerm[size].name === SocialName.FACEBOOK) {
          socialName = "FACEBOOK"
        } else if (teste.data[i].socialPerm[size].name === SocialName.GOOGLE) {
          socialName = "GOOGLE";
        }
        else socialName = "TWITTER";
        data[`Cadastro Social ${socialName} - Uso`] = this.stringReturn(teste.data[i].socialPerm[size].use);
        data[`Cadastro Social ${socialName} - Retorno`] = this.stringReturn(teste.data[i].socialPerm[size].socialBack);
      }

      data[`Registro => `] = ``;
      data[`Nome`] = this.stringReturn(teste.data[i].register.name);
      data[`Sobrenome`] = this.stringReturn(teste.data[i].register.surname);
      data[`Sexo`] = this.stringReturn(teste.data[i].register.sex);
      data[`Data de nascimento`] = this.stringReturn(teste.data[i].register.birthdate);
      data[`email`] = this.stringReturn(teste.data[i].register.email);
      data[`Voltou`] = this.stringReturn(teste.data[i].register.manualBack);
      data[`Documentos => `] = ``;
      data[`Estado Civil`] = this.stringReturn(teste.data[i].document.civilState);
      data[`CPF`] = this.stringReturn(teste.data[i].document.cpf);
      data[`RG`] = this.stringReturn(teste.data[i].document.rg);
      data[`SMS`] = this.stringReturn(teste.data[i].document.sms);
      data[`Telefone`] = this.stringReturn(teste.data[i].document.cellphone);
      data[`Endereço => `] = ``;
      data['Obteve Localização'] = this.stringReturn(teste.data[i].address.addressPerm);
      data[`aNúmero`] = this.stringReturn(teste.data[i].address.number);
      data['Cidade'] = this.stringReturn(teste.data[i].address.city);
      data['CEP'] = this.stringReturn(teste.data[i].address.cep);
      data[`Complemento`] = this.stringReturn(teste.data[i].address.complement);
      data[`Bairro`] = this.stringReturn(teste.data[i].address.neighborhood);
      data[`Estado`] = this.stringReturn(teste.data[i].address.state);
      data[`Permissões Privadas =>`] = ``;
      data[`Calendário`] = this.stringReturn(teste.data[i].privatePerm.calendar);
      data[`Multimídia`] = this.stringReturn(teste.data[i].privatePerm.multimedia);
      data[`Contatos`] = this.stringReturn(teste.data[i].privatePerm.contacts);
      data[`Identidade`] = this.stringReturn(teste.data[i].privatePerm.identity);
      data[`Pagamento => `] = ``;
      data[`Boleto`] = this.stringReturn(teste.data[i].payPerm.ticket);
      for (let size in teste.data[i].payPerm.card) {
        let cardtype;
        if (teste.data[i].payPerm.card[size].type === CardType.CREDIT) {
          cardtype = "CRÉDITO"
        } else cardtype = "DÉBITO";
        data[`Cartao de ${cardtype} - Retorno`] = this.stringReturn(teste.data[i].payPerm.card[size].cardBack);
        data[`Cartao de ${cardtype} - Uso`] = this.stringReturn(teste.data[i].payPerm.card[size].cardUse);
        data[`Cartao de ${cardtype} - Salvou`] = this.stringReturn(teste.data[i].payPerm.card[size].saveCard);
      }
      for (let size in teste.data[i].payPerm.extPay) {
        let extPayType;
        if (teste.data[i].payPerm.extPay[size].extPayName === ExtPayType.PAYPAL) {
          extPayType = "PAYPAL"
        } else if (teste.data[i].payPerm.extPay[size].extPayName === ExtPayType.PAGSEGURO) {
          extPayType = "PAGSEGURO"
        }
        else extPayType = "MERCADOPAGO";
        data[`Pagamento com ${extPayType} - Uso`] = this.stringReturn(teste.data[i].payPerm.extPay[size].extPayUse);
        data[`Pagamento Externo ${extPayType} - Retorno`] = this.stringReturn(teste.data[i].payPerm.extPay[size].extPayBack);
        data[`Pagamento Externo ${extPayType} - Salvou`] = this.stringReturn(teste.data[i].payPerm.extPay[size].extSave);
      }
      data[`Data de Entrada`] = teste.data[i].horaIn;
      data[`Data de Saída`] = teste.data[i].horaOut;
      xls.push(data);
    }
    //let day = new Date();
    // fs.writeFileSync(`Relatório` + '_' + day.getDate() + '_' + day.getMonth() + '_' + day.getFullYear() + '.xls', testeRetono, 'binary');
    return this.retorno({success: xls});
  }

  async code_generator(data: any) {
    let bank_codes = await this.read_all_codes();
    let used_codes = new Set<string>();
    let new_codes = [];
    let participants = [];
    if (!bank_codes) {
      return this.retorno(bank_codes.data);
    }
    for (let data of bank_codes.data) {
      used_codes.add(data.code);
    }
    let times = data.quantity;
    for (let i = 0; i < times; ++i) {
      let generated_code;
      do {
        generated_code = this.generate_code();
      } while (used_codes.has(generated_code));
      participants.push({
        code: generated_code,
        payPerm: {
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
          ],
          card: [
            {
              type: 0,
              saveCard: 2,
              cardBack: 2,
              cardUse: 2
            },
            {
              type: 1,
              saveCard: 2,
              cardBack: 2,
              cardUse: 2
            }
          ],
        },
        socialPerm: [
          {
            name: 0,
            use: 2,
            socialBack: 2,
          },
          {
            name: 1,
            use: 2,
            socialBack: 2,
          },
          {
            name: 2,
            use: 2,
            socialBack: 2,
          }
        ]
        // Demais dados caso precisar
      });
      used_codes.add(generated_code);
      //new_codes.push(generated_code);
      new_codes.push({
        codigo: generated_code
      });
    }
    let ret = await this.emit_to_server('db.participant.create', participants);
    if (this.retorno(ret.data.success)) {
      return this.retorno({success: new_codes});
    }
    else {
      return this.retorno(ret.data);
    }
  }

  private generate_code() {
    let code = generatePassword(6, false, /\d/);
    return code;
  }

  private async read_all_codes() {
    let ret = await this.emit_to_server('db.participant.read', new QueryObject(null, 'code'));
    return this.retorno(ret.data);
  }

  // private async new_codes_excel(codes_for_use) {
  //   codes_for_use = j2x(codes_for_use);
  //   let day = new Date();
  //   fs.writeFileSync('Novos Códigos' + '_' + day.getDate() + '_' + day.getMonth() + '_' + day.getFullYear() + '.xls', codes_for_use, 'binary');
  // } jeito de fazer o excel baixando direto na pasta do server

  async free_codes(data: any) {
    let query = {
      status: PartStatus.CREATED,
    };
    let xls = [];
    let ret = await this.emit_to_server('db.participant.read', new QueryObject(query, 'code', null, 500));
    for (let i = 0; i < ret.data.success.length; i++) {
      // xls[i] = j2x(teste.data[i]);
      let data = {};
      data[`Códigos ainda não utilizados`] = ret.data.success[i].code;
      xls.push(data);
    }
    return this.retorno({success: xls});
  }

  private stringReturn(data) {
    if (data === 0) {
      return "Não"
    }
    else if (data === 1) {
      return "Sim"
    }
    return " ";
  }
}
