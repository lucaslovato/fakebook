import {BasicRTC} from '../BasicRTC';
import {CommonHandler} from '../../handlers/CommonHandler';

export class CommonRTC extends BasicRTC {

  /**
   * Recebe o socketId passado pelo client.
   *
   * @param conf
   */
  constructor(conf, msg, openRTC) {
    super('common', new CommonHandler(), conf);

    openRTC.destroy();

    this.interfaceListeners = {
      'logout': this.logout.bind(this),
    };

    this.emit_to_browser(msg);
    this.wiring();
  }

  set handler(handler: CommonHandler) {
    this._handler = handler;
  }

  get handler(): CommonHandler {
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

    this.emit_to_browser(msg);

    this.destroy();
  }
}