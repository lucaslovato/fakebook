import {OpenHandler} from "./OpenHandler";
import {UpdateObject} from "./util_handler/UpdateObject";

export class CommonHandler extends OpenHandler {

  async logout(data: any) {
    let ret = await this.emit_to_server('db.user.update', new UpdateObject({id: data.id}, {logged: false}));
    return this.retorno(ret.data);
  }
}