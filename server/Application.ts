import * as bodyParser from "body-parser";
import * as socketio from "socket.io";
import * as express from "express";
import * as path from "path";
import * as http from "http";
import * as cors from "cors";

import {Barrier} from "./authentication/Barrier";
import {InitRestful} from "./restful/";
import {Source} from "./events/Source";
import {Database} from "./db/Database";
import {OpenRTC} from "./rtc/OpenRTC";
import {Router} from "express";

// const Sessao_filas = require('./sessoes/filas/sessao_filas');
const j2x = require('json2xls');

export class Application extends Source {
  private database: Database;
  private barrier: any;
  private config: any;
  private http: any;
  private app: any;
  private io: any;

  constructor(pathConfig) {
    super();
    this.config = require(pathConfig);
    this.app = express();
    this.http = http.createServer(this.app);
    this.io = socketio(this.http);
    this.barrier = new Barrier();
    let router = Router();
    this.app.set('view engine', 'ejs');
    this.app.set('views', path.resolve(__dirname + '/views'));
    Barrier.setBrowserModules(this.app);
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.use(this.barrier.validateKey.bind(this.barrier));
    this.app.use(j2x.middleware);
    this.io.on('connection', Application.connection.bind(this));

    this.http.listen(this.config.server.port, () => {
      this.hub.on('error.**', function () {
        console.log('algo feio aconteceu');
      });

      this.hub.on('banco.ready', function () {
        new InitRestful(router);
      });

      this.hub.on('restfuls.ready', () => {
        this.app.use('/api', router);
        console.log(`APP PRONTO. BORA DALHEEE ${this.config.server.port} \n`);
        this.hub.send(this, 'app.ready', {success: null, error: null});
      });

      this.database = new Database(this.config.db);
    });

    this.app.use('/favicon.ico',
      express.static(path.resolve(__dirname + '/favicon.ico'))
    );
  }

  static connection(socket) {
    new OpenRTC({socket: socket});
  }

  async destroy() {
    return await this.database.destroy();
  }
}