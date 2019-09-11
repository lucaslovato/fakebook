import {BasicHandler} from "./BasicHandler";
import {QueryObject} from "./util_handler/QueryObject";
import {PartStatus} from "../db/model/Participant";

export class BarrierHandler extends BasicHandler {
  async verifica_user_e_logado(id_user, type) {
    let query = {_id: id_user};
    let pesquisa_user = new QueryObject(query);
    let ret = await this.emit_to_server('db.' + type + '.read', pesquisa_user);
    let usuario_retorno = this.retorno(ret.data);
    if (!usuario_retorno.success) {
      usuario_retorno.success = false;
      return usuario_retorno;
    }
    if(type === "user") {
      await this.logged_admin_verification(usuario_retorno);
    }
    if(type === "participant"){
      await this.logged_participant_verification(usuario_retorno);
    }
    return usuario_retorno;
  }
  private async logged_admin_verification(usuario_retorno){
    if (usuario_retorno.data.length < 1 || usuario_retorno.data[0].desativado) {
      usuario_retorno.success = false;
      usuario_retorno.data = "Authentication-key é inválida.";
    } else if (!usuario_retorno.data[0].logged) {
      usuario_retorno.success = false;
      usuario_retorno.data = "Efetue o login para continuar.";//
    }
    return usuario_retorno;
  }
  private async logged_participant_verification(usuario_retorno){
    if(usuario_retorno.data[0].status === PartStatus.FINISHED){
      usuario_retorno.success = false;
      usuario_retorno.data = "Teste ja finalizado";
    } else if(usuario_retorno.data[0].status === PartStatus.CREATED){
      usuario_retorno.success = false;
      usuario_retorno.data = `Participante não logado.`;
    }
    return usuario_retorno;
  }

  // async verifica_user_e_logado(id_user, type) {
  //   let query = {_id: id_user};
  //   let pesquisa_user = new QueryObject(query);
  //   let ret = await this.emit_to_server('db.' + type + '.read', pesquisa_user);
  //   let usuario_retorno = this.retorno(ret.data);
  //   if (!usuario_retorno.success) {
  //     usuario_retorno.success = false;
  //     return usuario_retorno;
  //   } else if (usuario_retorno.data.length < 1 || usuario_retorno.data[0].desativado) {
  //     usuario_retorno.success = false;
  //     usuario_retorno.data = "Authentication-key é invalida.";
  //   } else if (!usuario_retorno.data[0].logged) {
  //     usuario_retorno.success = false;
  //     usuario_retorno.data = "Efetue o login para continuar.";//
  //   }
  //   return usuario_retorno;
  // }
}