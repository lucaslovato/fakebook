class LFM {
  constructor(){
    this._keys = {
      locale: "locale",
      user: "user",
      localeData: "localeData"
    }
  }

  getKey(key){
    return this._keys[key];
  }
}
export default new LFM();