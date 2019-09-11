import lil from 'lil-uuid';
class Message{
  constructor(event, data, id){
    this.id = id ? id : lil.uuid();
    this.event = event;
    this.data = data;
  }

  set id(id){
    if(!lil.isUUID(id)){
      throw new Error("O id da Mensagem é incompativel!");
    }
    this._id = id;
  }

  get id(){
    return this._id;
  }

  set event(event){
    this._event = event;
  }

  get event(){
    return this._event;
  }

  set data(data){
    this._data = data;
  }

  get data(){
    return this._data;
  }

  toServer(){
    return {
      id: this.id,
      event: this.event,
      data: this.data,
    }
  }

}

export default Message;