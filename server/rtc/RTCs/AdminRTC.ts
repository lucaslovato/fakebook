import {BasicRTC} from '../BasicRTC';
import {AdminHandler} from '../../handlers/AdminHandler';
import {OpenRTC} from '../OpenRTC';

export class AdminRTC extends BasicRTC {
  private _loggedUser;

  /**
   * Recebe o socketId passado pelo client.
   *
   * @param conf
   */
  constructor(conf, msg, openRTC) {
    super('admin', new AdminHandler(), conf);
    openRTC.destroy();
    this.interfaceListeners = {
      'logout': this.logout.bind(this),
      'part_read': this.part_read.bind(this),
      'generate_fin_excel': this.generate_fin_excel.bind(this),
      'code_generator': this.code_generator.bind(this),
      'free_codes': this.free_codes.bind(this),
    };
    this.loggedUser = msg.datas.data;
    this.emit_to_browser(msg);
    this.wiring();
  }

  set loggedUser(loggedUser) {
    this._loggedUser = loggedUser;
  }

  get loggedUser() {
    return this._loggedUser;
  }

  set handler(handler: AdminHandler) {
    this._handler = handler;
  }

  get handler(): AdminHandler {
    return this._handler;
  }

  set interfaceListeners(interfaceListeners: object) {
    this._interfaceListeners = interfaceListeners;
  }

  get interfaceListeners(): object {
    return this._interfaceListeners;
  }

  async logout(msg) {
    msg.datas = await this.handler.logout(msg.datas);
    new OpenRTC(this.config);
    this.emit_to_browser(msg);
    this.destroy();
  }

  async part_read(msg) {
    msg.datas = await this.handler.part_read(msg.datas);
    this.emit_to_browser(msg);
  }
  async generate_fin_excel(msg){
    msg.datas = await this.handler.generate_fin_excel(msg.datas);
    this.emit_to_browser(msg);
  }
  async code_generator(msg){
    msg.datas = await this.handler.code_generator(msg.datas);
    this.emit_to_browser(msg);
  }
  async free_codes(msg){
    msg.datas = await this.handler.free_codes(msg.datas);
    this.emit_to_browser(msg);
  }
}
