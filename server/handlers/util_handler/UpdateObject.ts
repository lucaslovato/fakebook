export class UpdateObject {
  private _options: object;
  private _query: Object;
  private _update: Object;
  private _id: any;

  constructor(query: string | Object, update: Object, options?: object) {
    this.query = query;
    this.update = update;
    this.options = options;
  };

  set query(query: string | Object) {
    if (typeof query === "string") {
      this.id = query
    } else {
      this._query = query;
    }
  }

  get query() {
    return this._query;
  }

  set update(update: any) {
    this._update = {$set: update};

    if (update.hasOwnProperty("$inc") || update.hasOwnProperty("$addToSet") || update.hasOwnProperty("$pull") || update.hasOwnProperty("$push") || update.hasOwnProperty("$set") || update.hasOwnProperty("$unset"))
      this._update = update;
  }

  get update() {
    return this._update;
  }

  set id(id) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  set options(options: object) {
    this._options = options;
  }

  get options(): object {
    return this._options;
  }
}