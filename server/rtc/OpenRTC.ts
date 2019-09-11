import {BasicRTC} from './BasicRTC';
import {OpenHandler} from '../handlers/OpenHandler';
import {AdminRTC} from './RTCs/AdminRTC';
import {CommonRTC} from './RTCs/CommonRTC';

export class OpenRTC extends BasicRTC {
  protected _rtcs_usuario: BasicRTC;
  private teste;

  /**
   * Recebe o socketId passado pelo Client.
   *
   * @param conf
   */
  constructor(conf) {
    super('login', new OpenHandler(), conf);
    this.rtcs_usuario = {
      'admin': AdminRTC,
      'common': CommonRTC,
    };
    this.interfaceListeners = {
      'login': this.login.bind(this),
    };
    this.wiring();
  }

  set handler(handler: OpenHandler) {
    this._handler = handler;
  }

  get handler(): OpenHandler {
    return this._handler;
  }

  set interfaceListeners(interfaceListeners: object) {
    this._interfaceListeners = interfaceListeners;
  }

  get interfaceListeners(): object {
    return this._interfaceListeners;
  }

  set rtcs_usuario(rtcs_usuario: any) {
    this._rtcs_usuario = rtcs_usuario;
  }

  get rtcs_usuario(): any {
    return this._rtcs_usuario;
  }

  /**
   * Repassa o Order de login do Client.
   * @param msg
   * @returns {Promise.<void>}
   */
  async login(msg) {
    // this.emit_to_browser(msg);
    msg.datas = await this.handler.login(msg.datas);
    if (msg.datas.success) {
      return this.trocar_rtc(msg);
    }
    this.emit_to_browser(msg);
  }

  /**
   * Responsavel por criar o rtc para o tipo de Employee.
   * @param msg
   */
  trocar_rtc(msg) {
    let rtc_tipo = msg.datas.data.type;
    new this.rtcs_usuario[rtc_tipo](this.config, msg, this);
  }
}