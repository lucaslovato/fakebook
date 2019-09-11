import {BasicRest} from "../BasicRest";
import * as httpStatus from "http-status-codes";
import {ParticipantHandler} from "../../handlers/ParticipantHandler";
import * as HTTPStatus from "http-status-codes";


export class PartRest extends BasicRest {
  protected _handler: ParticipantHandler;

  constructor(router) {
    super(router, new ParticipantHandler());

    this.routes = {
      post: {
        '/send_ans': this.sendAnswer.bind(this),
        '/socialPermUpdate': this.socialPermUpdate.bind(this),
        '/close_test': this.closeTest.bind(this),
      }
    };
    this.wiring();
  }

  set handler(value: ParticipantHandler) {
    this._handler = value;
  }

  get handler(): ParticipantHandler {
    return this._handler;
  }

  set routes(rotas) {
    this._routes = rotas;
  }

  get routes() {
    return this._routes;
  }

  async sendAnswer(request, response) {
    let ret = await this.handler.send_ans(request.body);
    response
      .status(HTTPStatus.OK)
      .send(ret);
  }

  async socialPermUpdate(request, response) {
    let ret = await this.handler.socialPermUpdate(request.body);
    response
      .status(HTTPStatus.OK)
      .send(ret)
  }

  async closeTest(request, response) {
    let ret = await this.handler.close_test(request.body);
    response
      .status(HTTPStatus.OK)
      .send(ret);
  }
}