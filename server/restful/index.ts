import {Source} from '../events/Source';
import {OpenRest} from './apis/OpenRest';
import {LoggedRest} from './apis/LoggedRest';
import {AdminRest} from './apis/AdminRest';
import {PartRest} from "./apis/ParticipantRest";

const Restfuls = {
  open_rest: OpenRest,
  logged_rest: LoggedRest,
  adminRest: AdminRest,
  partRest: PartRest
};

/**
 * Inicia todos os restfulls.
 */
export class InitRestful extends Source {
  private _restfuls: object;

  constructor(router) {
    super();
    this.restfuls = Restfuls;

    for (let restful in this.restfuls) {
      if (this.restfuls.hasOwnProperty(restful)) {
        new this.restfuls[restful](router);
      }
    }

    process.nextTick(() => {
      this.hub.send(this, 'restfuls.ready', {success: null, error: null});
    });
  }

  set restfuls(restful){
    this._restfuls = restful;
  }
  get restfuls(){
    return this._restfuls;
  }
}