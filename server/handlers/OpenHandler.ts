import {BasicHandler} from "./BasicHandler";
import {Util} from '../util/Util';
import {PartStatus} from "../db/model/Participant";
import {UpdateObject} from "./util_handler/UpdateObject";
import {QueryObject} from "./util_handler/QueryObject";

export class OpenHandler extends BasicHandler {

  async login(dados_login: object) {
    let ret = await this.emit_to_server('db.user.login', dados_login);
    if (ret.data.error) {
      ret.data.error = await Util.getErrorByLocale('pt-Br', 'login', ret.data.error);
      return await this.retorno(ret.data);
    }
    return this.retorno(ret.data);
  }

  async login_participant(code: number) {
    let ret;
    let options = {
      fields: {
        code: 1,
        id: 1,
        status: 1,
      },
    };
    ret = await this.emit_to_server('db.participant.read', new QueryObject({code: code}, 'id code status'));
    if (ret.data.success.length === 0) {
      return {
        error: true,
        description: 'usuário nao encontrado'
      }
    }
    if (ret.data.success[0].status === PartStatus.FINISHED) {
      return {
        error: true,
        description: 'teste já finalizado'
      }
    }
    if (ret.data.success[0].status === PartStatus.CREATED) {
      let updateobj = {
        horaIn: this.getDateInit(),
        status: PartStatus.INITIATED
      };
      let update = await this.emit_to_server('db.participant.update', new UpdateObject({code: code}, updateobj, options));
      if (update.data.error === null) return this.retorno(ret.data);
    }
    return this.retorno(ret.data);
  }

  private getDateInit() {
    let date = new Date();
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
  }
}