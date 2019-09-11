import axios from 'axios';
import localForage from "localforage";
import LFM from "../utils/LocalForageManager";
import UserService from "./userService";
const countryCodes = {
  'BR': 'pt-Br',
  'US': 'en'
};

class OpenService {
  constructor() {

  }

  /**
   * @author Bernardo Schveitzer
   * Inicia o processo de definição do Locale no armazenamento local,
   * verificando a localização do usuário, caso não tenha definido.
   */
  async initSystemLocale() {
    try {
      const responseAPI = await this.getLocation();
      let localeCode = countryCodes[responseAPI.data.countryCode] ? countryCodes[responseAPI.data.countryCode] : 'en';
      const responseGetLocale = await this.getLocale(localeCode);
      await this.setLocaleToForage(responseGetLocale, localeCode);
    } catch (err) {
      console.error(err)
    }
  }

  /**
   * @author Bernardo Schveitzer
   * Define o locale no armazenamento local.
   * @param response
   * @param localeCode
   */
  async setLocaleToForage(response, localeCode) {
    try {
      await localForage.setItem(LFM.getKey('locale'), localeCode);
      await localForage.setItem(LFM.getKey('localeData'), response.data);
    } catch (err) {
      await localForage.removeItem('locale');
      window.alert("Ocorreu um erro desconhecido, recarregue a página.");
    }
  }

  async getLocale(locale) {
    return await axios.get(`/api/locale?locale=${locale}`);
  }

  async getLocation() {
    return await axios.get('http://ip-api.com/json');
  }

  async getRequest(path, queries, userId, userType){
    let url = `/api${path}`;
    let config = {};
    if(queries){
      url = `${url}?`;
      for(let attr in queries){
        if(queries.hasOwnProperty(attr)){
          url = `${url}${attr}=${queries[attr]}&`;
        }
      }
      url = url.slice(0, url.lastIndexOf('&'));
    }
    if(userId){
      config.headers = {
        "authentication-key": userId,
        "type": userType,
      };
    }
    return await axios.get(url, config);
  }

  async postRequest(path, body, userId, userType){
    let config = {};
    if(userId){
      config.headers = {
        "authentication-key": userId,
        "type": userType,
      };
    }
    let url = `/api${path}`;
    return await axios.post(url, body, config);
  }

  /**
   * @author Bernardo Schveitzer
   * Verifica as autorizações do usuário para entrar em uma rota.
   * @param destinyRoute
   * @returns {Promise<boolean>}
   */
  async checkUserAuthorization(destinyRoute){
    const user = await localForage.getItem(LFM.getKey('user'));

      if(user === null) return false;

      let userEntities = user.user.entities;
      for(let entityIndex = 0; entityIndex < userEntities.length; entityIndex++){
        if(userEntities[entityIndex].entity.name === destinyRoute.params.entityName){

          if(destinyRoute.name === "entity") return true;

          let userModules = userEntities[entityIndex].role.modules;
          for(let moduleIndex = 0; moduleIndex < userModules.length; moduleIndex++){
            if(userModules[moduleIndex].name === destinyRoute.name){
              return true;
            }
          }
        }
      }
      return false;
  }

}

export default new OpenService();