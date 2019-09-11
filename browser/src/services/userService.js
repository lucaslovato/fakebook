import axios from 'axios';
import localForage from "localforage";
import LFM from "../utils/LocalForageManager";

class UserService {
  constructor() {

  }


  async doLogout(){
    return await axios.post('/api/logout');
  }

  async getUser(user){
    // return await  axios.get('')
  }
}

export default new UserService();