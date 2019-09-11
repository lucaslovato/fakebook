import {Participant} from "./Participant";
import {Model} from "../model/Admin";
import * as path from "path";
const messages = require(path.resolve("util/messages.json")).admin;

export class Admin extends Participant {
  wire_custom_listeners() {
    super.wire_custom_listeners();
    this.hub.on("db." + this.event_name + ".login", this.login.bind(this));
  }

  async login(msg){
    if (msg.source_id === this.id) return;
    let admin = msg.data.success;

    let query = {
      email: admin.email,
      removed: false,
    };
    let select = 'email id first_name surname password type';

    let ret = await this.model.find(query)
      .select(select)
      .exec();

    if(ret.length === 1){
      let adminret:any = ret[0].toJSON();
      if (adminret.password != admin.password) {
        return this.answer(msg.id, "login", null, "wrong_password");
      }
      let ret_admin_update:any = await this.model.findByIdAndUpdate(adminret.id, {'logged': true});
      if(ret_admin_update){
        delete adminret.password;
        return this.answer(msg.id, 'login', adminret, null);
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
    return 'admin';
  }
}