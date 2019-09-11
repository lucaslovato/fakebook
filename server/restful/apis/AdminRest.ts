import {BasicRest} from "../BasicRest";
import {AdminHandler} from "../../handlers/AdminHandler";
import * as httpStatus from "http-status-codes";
import * as HTTPStatus from "http-status-codes";
import {OpenRTC} from "../../rtc/OpenRTC";
import {OpenRest} from "./OpenRest";

export class AdminRest extends BasicRest {
  protected _handler: AdminHandler;

  constructor(router) {
    super(router, new AdminHandler());

    this.routes = {
      get: {
        '/open/generate_fin_excel': this.generateFinExcel.bind(this),
        '/open/free_codes': this.freeCodesExcel.bind(this),
        '/open/code_generator': this.code_generator.bind(this),
      },
      post: {
        '/logout': this.logout.bind(this),
      }
    };

    this.wiring();
  }

  set handler(value: AdminHandler) {
    this._handler = value;
  }

  get handler(): AdminHandler {
    return this._handler;
  }

  set routes(rotas) {
    this._routes = rotas;
  }

  get routes() {
    return this._routes;
  }

  async generateFinExcel(request, response) {
    let ret = await this.handler.generate_fin_excel(request.query);
    let day = new Date();
    if (ret.success) {
      response
        .status(HTTPStatus.OK)
        //.send({success: true, description: "excel gerado com sucesso"})
        .xls(`Relatório` + '_' + day.getDate() + '_' + day.getMonth() + '_' + day.getFullYear() + '.xlsx', ret.data);
    }
    else {
      response
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .send(ret.data);
    }
  }

  async code_generator(request, response) {
    let ret = await this.handler.code_generator(request.query);
    let day = new Date();
    if (ret.success) {
      response
        .status(HTTPStatus.OK)
        .xls(`Novos Códigos` + '_' + day.getDate() + '_' + day.getMonth() + '_' + day.getFullYear() + '.xlsx', ret.data);
    }
    else {
      response
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .send(ret.data);
    }
  }

  async freeCodesExcel(request, response) {
    let ret = await this.handler.free_codes(request.query);
    let day = new Date();
    if (!ret.success) {
      response
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .send(ret.data);
    }
    else {
      response
        .status(HTTPStatus.OK)
        .xls(`Códigos Disponíveis` + '_' + day.getDate() + '_' + day.getMonth() + '_' + day.getFullYear() + '.xlsx', ret.data);
    }
  }

  async logout(request, response) {
    let ret = await this.handler.logout({id: request.headers[`authentication-key`]});
    response
      .status(HTTPStatus.OK)
      .send(ret);
  }
}