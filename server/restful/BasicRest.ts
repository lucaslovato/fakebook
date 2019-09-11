import {BasicHandler} from "../handlers/BasicHandler";

export abstract class BasicRest{
    private _router: any;
    protected _handler: BasicHandler;
    protected _routes: any;

    constructor(router, handler) {
        this.handler = handler;
        this.router = router;
    }

    set router(router) {
        if (!router) {
            throw new Error('Toda api deve conter o router');
        }

        this._router = router;
    }

    get router() {
        return this._router;
    }

    abstract set handler(handler);

    abstract get handler();

    /**
     * Responsavel por ligar as requisicoes get.
     *
     * @param rotas
     */
    wiringget(rotas) {
        for (let name in rotas) {
            if (rotas.hasOwnProperty(name)) {
                this.router.route(name).get(rotas[name]);
            }
        }
    }

    /**
     * Responsavel por ligar as requisicoes post.
     *
     * @param rotas
     */
    wiringpost(rotas) {
        for (let name in rotas) {
            if (rotas.hasOwnProperty(name)) {
                this.router.route(name).post(rotas[name]);
            }
        }
    }

    /**
     * Responsavel por ligar as requisicoes put.
     *
     * @param rotas
     */
    wiringput(rotas) {
        for (let name in rotas) {
            if (rotas.hasOwnProperty(name)) {
                this.router.route(name).put(rotas[name]);
            }
        }
    }

    /**
     * Responsavel por ligar as requisicoes delete.
     *
     * @param rotas
     */
    wiringdelete(rotas) {
        for (let name in rotas) {
            if (rotas.hasOwnProperty(name)) {
                this.router.route(name).delete(rotas[name]);
            }
        }
    }

    abstract get routes();
    abstract set routes(value);

    /**
     * Liga as rotas as funções, simulando o evento.
     */
    wiring() {
        for (let name in this.routes) {
            if (this.routes.hasOwnProperty(name) && this.routes[name]) {
                let method = 'wiring' + name;
                this[method](this.routes[name]);
            }
        }
    }
}