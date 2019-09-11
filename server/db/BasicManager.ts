import {Source} from "../events/Source";
import {Types, Model} from "mongoose";

export abstract class BasicManager extends Source {
  constructor() {
    super();
    this.wiring();
  }

  //noinspection JSMethodCanBeStatic
  /**
   * Método chamado antes do create para fazer as operações necessárias com o(s)
   * dado(s) do(s) objeto(s) que será(ão) criado(s)
   *
   * @param data
   */


  async beforeCreate(data) {
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; ++i) {
        data[i]._id = data[i]._id ? new Types.ObjectId(data[i]._id) : new Types.ObjectId();
        data[i].id = data[i]._id.toString();
      }
    } else {
      data._id = data._id ? new Types.ObjectId(data._id) : new Types.ObjectId();
      data.id = data._id.toString();
    }

    return data;
  }

  //noinspection JSMethodCanBeStatic
  /**
   * Realiza operações necessárias
   *
   * @param data
   */
  async afterCreate(data: any[]) {
    for (let i = 0; i < data.length; i++) {
      data[i] = data[i].toJSON();
    }

    return data;
  }

  /**
   * Cria um novo documento no banco.
   *
   * @param data
   */
  async create(data) {
    let dados: any[] = await this.beforeCreate(data);
    let ret: any = await this.model.create(dados);
    return await this.afterCreate(Array.isArray(ret) ? ret : [ret]);
  }

  handleCreate(msg) {
    if (msg.source_id === this.id) return;

    this.create(msg.data.success).then((ret) => {
      this.answer(msg.id, "create", ret, null);
    }).catch((error) => {
      console.error(error);
      this.answer(msg.id, "create", null, error);
    });
  }

  //noinspection JSMethodCanBeStatic
  /**
   * Faz tratamentos necesários nos dados antes de executar o read
   *
   * @param data
   */
  async beforeRead(data) {
    return data;
  }

  //noinspection JSMethodCanBeStatic
  /**
   * Faz as modificações/operações necessárias no retorno do read
   *
   * @param data
   */
  async afterRead(data) {
    if(Array.isArray(data)){
      for (let i = 0; i < data.length; ++i) {
        delete data[i]._id;
      }
    } else {
      delete data._id;
    }

    return data;
  }

  /**
   * Le um ou todos os documentos de uma determinada colecao no banco.
   *
   * @param data
   */
  async read(data) {
    let result: any = [];
    let limit = data.limit || 25;
    let page = data.page || 1;
    let select = data.select ? 'id ' + data.select : '';
    let populate = data.populate || '';

    if (data.id && !data.query) {
      let ret = await this.model
        .findById(data._id)
        .select(select)
        .populate(populate)
        .lean()
        .exec();

      if (ret) return ret;
    } else {
      let read_query = await this.beforeRead(data.query);

      let query = this.model
        .find(read_query)
        //.limit(limit)
        .select(select)
        .populate(populate)
        //.skip(limit * (page - 1))
        .lean();

      result = await query.exec();
    }

    return await this.afterRead(result);
  }

  handleRead(msg) {
    if (msg.source_id === this.id) return;

    this.read(msg.data.success).then((ret) => {
      this.answer(msg.id, "read", ret, null);
    }).catch((error) => {
      this.answer(msg.id, "read", null, error);
    });
  }

  //noinspection JSMethodCanBeStatic
  /**
   * Faz verificações e/ou operações necessárias com os dados recebidos para
   * update
   *
   * @param data
   */
  async beforeUpdate(data) {
    return data;
  }

  //noinspection JSMethodCanBeStatic
  async afterUpdate(data) {
    for (let i = 0; i < data.length; i++) {
      data[i] = data[i].toJSON();
    }

    return data;
  }

  /**
   * Modifica um documento em uma determinada colecao.
   *
   * @param data
   */
  async update(data) {
    let result = null;
    let options = data.options || {"new": true, "runValidators": true};
    let dados = await this.beforeUpdate(data);
    if (data._id && !dados.hasOwnProperty("query")) {
      result = [await this.model.findByIdAndUpdate(dados._id, dados.update, options)];
    } else {
      result = await this.model.update(dados.query, dados.update, options);
    }

    return await this.afterUpdate(result);
  }

  async handleUpdate(msg) {
    if (msg.source_id === this.id) return;

    this.update(msg.data.success).then((ret) => {
      this.answer(msg.id, "update", ret, null);
    }).catch((error) => {
      this.answer(msg.id, "update", null, error);
    });
  }

  //noinspection JSMethodCanBeStatic
  async beforeDelete(data) {
    return data;
  }

  //noinspection JSMethodCanBeStatic
  async afterDelete(result) {
    return result;
  }

  //noinspection ReservedWordAsName
  /**
   * Destroi um documento em uma determinada colecao.
   *
   * @param data
   */
  async delete(data) {
    let result = null;

    if (data._id) {
      result = await this.model.findByIdAndRemove(data._id);
    } else {
      let dados = await this.beforeDelete(data);
      result = await this.model.remove(dados);
    }

    return await this.afterDelete(result);
  }

  handleDelete(msg) {
    if (msg.source_id === this.id) return;

    this.delete(msg.data.success).then((ret) => {
      this.answer(msg.id, "delete", ret, null);
    }).catch((error) => {
      this.answer(msg.id, "delete", null, error);
    });
  }

  async handleExists(msg): Promise<void> {
    if (msg.source_id === this.id) return;

    let query = msg.getData().success;
    let exists = await this.exists(query);

    this.answer(msg.id, "exists", exists, null);
  }

  async exists(query): Promise<boolean> {
    let count = await this.count(query);
    return count > 0;
  }

  async handleCount(msg): Promise<void> {
    if (msg.source_id === this.id) return;
    let data = msg.data.success;

    let count = await this.model.count(data);
    this.answer(msg.id, "count", count, null);
  }

  async count(query): Promise<number> {
    return await this.model.count(query).exec();
  }

  // handleAggregate(msg) {
  //     // if (msg.source_id === this.id) return;
  //     //
  //     // this.answer(msg.id, "aggregate", ret, null);
  // }

  /**
   * Função para responder a mensagem
   *
   * @param id_mensagem
   * @param evento
   * @param success
   * @param error
   */
  answer(id_mensagem, evento, success, error) {
    let dados = {
      success: success,
      error: error
    };

    this.hub.send(this, "db." + this.event_name + "." + evento, dados, id_mensagem);
  }

  /**
   * Funcao responsavel por ligar os eventos escutados por esse documento.
   */
  wiring() {
    this.hub.on("db." + this.event_name + ".create", this.handleCreate.bind(this));
    this.hub.on("db." + this.event_name + ".read", this.handleRead.bind(this));
    this.hub.on("db." + this.event_name + ".update", this.handleUpdate.bind(this));
    this.hub.on("db." + this.event_name + ".delete", this.handleDelete.bind(this));
    this.hub.on("db." + this.event_name + ".exists", this.handleExists.bind(this));
    this.hub.on("db." + this.event_name + ".count", this.handleCount.bind(this));
    // this.hub.on("db." + this.event_name + ".aggregate", this.handleAggregate.bind(this));
    this.wire_custom_listeners();
  }

  /**
   * Método a ser implementado nas subclasses que ouvirem eventos fora do CRUD
   */
  abstract wire_custom_listeners();

  /**
   * Deve ser implementado em todas as subclasses para retornar seu devido
   * model
   */
  abstract get model(): Model<any>;

  /**
   * Deve ser implementado em todas as subclasses para retornar seu devido
   * nome
   */
  abstract get event_name(): string;
}