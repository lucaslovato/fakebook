import axios from 'axios';
import Localforage from "localforage";
import LFM from "../utils/LocalForageManager";

class ManagementService {
  constructor() {

  }

  async getUsers(entity) {
    return await axios.post(`/api/${entity}/management/read_all_users`);
  }

  async afterLogin(data){
    axios.defaults.headers.common['authentication-key'] = data.user.authentication_key;
    axios.defaults.headers.common['session-id'] = data.session_id;

    Localforage.setItem(LFM.getKey('user'), data).then(function (value) {
      return value;
    }).catch(function (err) {
      console.error(err)
    })
  }

  async getLocale(locale) {
    return await axios.get(`/api/locale?locale=${locale}`);
  }

  async getLocation() {
    return await axios.get('http://ip-api.com/json');
  }
}

export default new ManagementService();