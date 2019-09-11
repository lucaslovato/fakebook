import {ManagerMap} from "../interfaces/ManagerMap";
import {managers} from "./index";
import {Source} from "../events/Source";
import * as mongoose from "mongoose";
import * as path from "path";
import * as fs from "fs";
import {Mongoose} from "mongoose";

export class Database extends Source {
  private mongoose: Mongoose;
  private managers: ManagerMap;

  constructor(config) {
    super();
    this.mongoose = mongoose;
    this.mongoose.Promise = Promise;
    this.managers = managers;

    this.mongoose.connection.on('error', function (err, val) {
      return console.log('error', err, val);
    });

    this.hub.on('db.getManager', this.getManager.bind(this));
    this.init(config.mongodb);
  }

  async init(config) {
    try {
      await this.mongoose.connect(`mongodb://${config.host}/${config.name}`);
      if (config.erase_db) {
        await this.popularBanco(config.fixture);
      }

      this.hub.send(this, 'banco.ready', {success: true, error: false});
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }

  async popularBanco(fixturePath): Promise<void> {
    await this.mongoose.connection.db.dropDatabase();
    let dir_path = path.join(path.resolve("test/fixtures"), fixturePath);
    let files = fs.readdirSync(dir_path);
    let promises = [];
    while (files.length > 0) {
      let file = require(path.join(dir_path, files.shift()));
      promises.push(this.hub.send(this, "db." + file.model + ".create", {
        success: file.data,
        error: null
      }).promise);
    }

    await Promise.all(promises);
    promises = [];
    for (let idx in this.managers) {
      if (this.managers.hasOwnProperty(idx)) {
        promises.push(this.managers[idx].model.ensureIndexes());
      }
    }

    await Promise.all(promises);
  };

  async destroy() {
    try {
      await this.mongoose.connection.close();
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }

  getManager(msg) {
    if (msg.source === this.id) return;

    let manager = msg.data.success;
    this.hub.send(this, 'db.getManager', this.managers[manager], msg.id);
  }
}