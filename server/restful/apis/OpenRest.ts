import {BasicRest} from "../BasicRest";
import {OpenHandler} from "../../handlers/OpenHandler";
import * as HTTPStatus from "http-status-codes";

export class OpenRest extends BasicRest {
  protected _handler: OpenHandler;

  constructor(router) {
    super(router, new OpenHandler());

    this.routes = {
      post:{
        '/open/login': this.login.bind(this),
        '/open/login_participant': this.login_participant.bind(this),
      },
    };
    this.wiring();
  }

  set handler(value: OpenHandler) {
    this._handler = value;
  }

  get handler(): OpenHandler {
    return this._handler;
  }

  set routes(rotas) {
    this._routes = rotas;
  }

  get routes() {
    return this._routes;
  }

  async login(request, response){
    let ret = await this.handler.login(request.body);
    response
      .status(HTTPStatus.OK)
      .send(ret);
  }
  async login_participant(request, response){
    let ret = await this.handler.login_participant(request.body.code);
    response
      .status(HTTPStatus.OK)
      .send(ret);
  }
}


