import {BasicManager} from "../BasicManager";
import {Model} from "../model/User";
import * as path from "path";
const messages = require(path.resolve("util/messages.json")).user;

export class User extends BasicManager {
  wire_custom_listeners() {
    this.hub.on("db." + this.event_name + ".login", this.login.bind(this));
  }

  async login(msg){
    if (msg.source_id === this.id) return;
    let user = msg.data.success;
    let query = {
      email: user.email,
      removed: false,
    };
    let select = 'email id first_name surname password type';
    let ret = await this.model.find(query)
      .select(select)
      .exec();
    if(ret.length === 1){
      let userret:any = ret[0].toJSON();
      if (userret.password != user.password) {
        return this.answer(msg.id, "login", null, "wrong_password");
      }
      let ret_user_update:any = await this.model.findByIdAndUpdate(userret.id, {'logged': true});
      if(ret_user_update){
        delete userret.password;
        return this.answer(msg.id, 'login', userret, null);
      }else{
        this.answer(msg.id, "login", null, messages.login.ERROR_LOGIN_UPDATE);
      }
    } else {
      this.answer(msg.id, "login", null, "user_not_found");
    }
  }

  get model() {
    return Model;
  }

  get event_name() {
    return 'user';
  }
}