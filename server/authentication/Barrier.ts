import {BarrierHandler} from "../handlers/BarrierHandler";
import * as HTTPStatus from "http-status-codes";
import * as express from 'express';
import * as path from 'path';

const config = require(path.resolve('authentication/BarrierConfig.json'));

export class Barrier {
  private _handler: BarrierHandler;

  constructor() {
    this.handler = new BarrierHandler();
  }

  set handler(handler) {
    this._handler = handler;
  }

  get handler() {
    return this._handler;
  }

  static setBrowserModules(app) {
    for (let i = 0; i < config.modules.length; i++) {
      app.use(
        config.modules[i].path,
        express.static(path.resolve(config.modules[i].location))
      );
    }
  }

  private static async verify_module(modules: [{ path: string; location: string }], path: string): Promise<boolean> {
    for (let i = 0; i < modules.length; i++) {
      if (modules[i].path === path) return true;
    }
    return false;
  }

  private static async verify_apis(apis: [{ path: string }], path: string): Promise<boolean> {
    for (let i = 0; i < apis.length; i++) {
      if (path.startsWith(apis[i].path)) return true;
    }
    return false;
  }

  private static async verify_opens(opens: [{ path: string }], path: string): Promise<boolean> {
    for (let i = 0; i < opens.length; i++) {
      if (opens[i].path === path) return true;
    }
    return false;
  }

  private static async existRoute(path: string): Promise<boolean> {
    let verification = await Promise.all([
      Barrier.verify_module(config.modules, path),
      Barrier.verify_apis(config.apis, path),
      Barrier.verify_opens(config.opens, path)
    ]);
    for (let i = 0; i < verification.length; i++) {
      if (verification[i]) return verification[i];
    }
    return false;
  }

  async validateKey(req, res, next) {
     if (await Barrier.existRoute(req.path)) {
       return next();
     }
     let ref = req.headers["authentication-key"];
     let ref2 = req.headers["type"];
     if (ref) {
       let usuario_retorno = await this.handler.verifica_user_e_logado(ref, ref2);
       if (!usuario_retorno.success) {
         return res.status(HTTPStatus.UNAUTHORIZED).send(usuario_retorno.data);
       }
       return next();
     } else {
       return res
         .status(HTTPStatus.UNAUTHORIZED)
         .send("Sem authentication-key");
     }
   }
}