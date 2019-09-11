import {Participant} from "./managers/Participant";
import {Admin} from './managers/Admin';
import {ManagerMap} from "../interfaces/ManagerMap";
import {User} from "./managers/User";

/**
 * Inicia todos os managers.
 */
let managers: ManagerMap = {
  "user": new User(),
  "admin": new Admin(),
  "participant": new Participant()
};

export {managers};