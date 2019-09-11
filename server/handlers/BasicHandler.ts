import * as BBPromise from "bluebird";
import {Source} from "../events/Source";

export class BasicHandler extends Source {

  constructor() {
    super();
  }

  protected emit_to_server(event, dado): BBPromise<any> {
    return this.hub.send(this, event, {success: dado, error: null,}).promise;
  }

  retorno(data) {
    return {success: !data.error, data: data.error ? data.error : data.success};
  }

}