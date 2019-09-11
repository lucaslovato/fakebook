export class QueryObject {
	private _query: Object;
	private _limit: number;
	private _select: string;
	private _populate: Object;
	private _page: number;
	private _id: string;

	constructor(query?: Object, select?: string, populate?: Object, limit?: number,  page?: number){
		this.query = query;
		this.select = select;
		this.populate = populate || "";
		this.limit = limit || 25;
		this.page = page || 1;
	};

	set id(id){
	  this._id = id;
  }

  get id(){
	  return this._id;
  }

	set query(query) {
		this._query = query;
    if (typeof query !== "object") {
      this.id = query;
      this._query = null;
    }
	}

	get query() {
		return this._query;
	}

	set limit(limit){
		if(limit){
			limit = typeof limit === 'number' ? limit : parseInt(limit);
		}

		this._limit = limit;
	}

	get limit(){
		return this._limit;
	}

	set select(seletc){
		this._select = seletc;
	}

	get select(){
		return this._select;
	}

	set populate(populate){
		this._populate = this.handler_populate(populate);
	}

	get populate(){
		return this._populate;
	}

	set page(page){
		this._page = page;
	}

	get page(){
		return this._page;
	}

	handler_populate(populate){

		if(populate.hasOwnProperty('select')) populate.select = 'id ' + populate.select;
		if(populate.hasOwnProperty('populate')) populate.populate = this.handler_populate(populate.populate);

		return populate;
	}
}