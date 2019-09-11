import {model, Schema} from "mongoose";
import {BaseSchema} from "../BaseSchema";
import * as path from "path";

const messages = require(path.resolve("util/messages.json")).participant;
const config = require(path.resolve("config.json"));

export enum PartStatus {
  CREATED,
  INITIATED,
  FINISHED
}

export enum CardType {
  CREDIT,
  DEBIT
}

export enum ExtPayType {
  PAYPAL,
  PAGSEGURO,
  MERCADOPAGO
}

export enum SocialName {
  GOOGLE,
  FACEBOOK,
  TWITTER
}

export enum TestStatus {
  NO,
  YES,
  NOREP,
}

let schema_options = {
  discriminatorKey: "type",
  timestamps: true,
  toObject: {
    virtuals: true,
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  },
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
  // http://mongoosejs.com/docs/guide.html#options
};

let schema = new Schema(Object.assign({
  code: {
    type: Schema.Types.String,
    unique: true,
  },
  status: {
    type: Schema.Types.Number,
    required: true,
    index: true,
    validate: {
      validator: function (value) {
        return !!PartStatus[value];
      },
      message: "Invalid Status"
    },
    default: PartStatus.CREATED
  },
  basicPerm: {
    locale: {
      type: Schema.Types.Number,
      default: TestStatus.NOREP,
    },
    microphone: {
      type: Schema.Types.Number,
      default: TestStatus.NOREP,
    },
    camera: {
      type: Schema.Types.Number,
      default: TestStatus.NOREP,
    },
    navHistory: {
      type: Schema.Types.Number,
      default: TestStatus.NOREP,
    },
    dispHistory: {
      type: Schema.Types.Number,
      default: TestStatus.NOREP,
    }
  },
  privatePerm: {
    contacts: {
      type: Schema.Types.Number,
      default: TestStatus.NOREP,
    },
    calendar: {
      type: Schema.Types.Number,
      default: TestStatus.NOREP,
    },
    identity: {
      type: Schema.Types.Number,
      default: TestStatus.NOREP,
    },
    multimedia: {
      type: Schema.Types.Number,
      default: TestStatus.NOREP,
    }
  },
  socialPerm: {
    type: [{
      use: {
        type: Schema.Types.Number,
        default: TestStatus.NOREP,
      },
      name: {
        type: Schema.Types.Number,
        index: true,
        validate: {
          validator: function (value) {
            return !!SocialName[value];
          },
          message: "Invalid SocialName"
        },
      },
      socialBack: {
        type: Schema.Types.Number,
        default: TestStatus.NOREP,
      }
    }]
  },
  document: {
    cpf: {
      type: Schema.Types.Number,
      default: TestStatus.NOREP,
    },
    rg: {
      type: Schema.Types.Number,
      default: TestStatus.NOREP,
    },
    sms: {
      type: Schema.Types.Number,
      default: TestStatus.NOREP,
    },
    civilState: {
      type: Schema.Types.Number,
      default: TestStatus.NOREP,
    },
    cellphone: {
      type: Schema.Types.Number,
      default: TestStatus.NOREP,
    },
  },
  address: {
    addressPerm: {
      type: Schema.Types.Number,
      default: TestStatus.NOREP
    },
    complement: {
      type: Schema.Types.Number,
      default: TestStatus.NOREP,
    },
    neighborhood: {
      type: Schema.Types.Number,
      default: TestStatus.NOREP,
    },
    state: {
      type: Schema.Types.Number,
      default: TestStatus.NOREP,
    },
    number:{
      type: Schema.Types.Number,
      default: TestStatus.NOREP,
    },
    city: {
      type: Schema.Types.Number,
      default: TestStatus.NOREP,
    },
    cep: {
      type: Schema.Types.Number,
      default: TestStatus.NOREP,
    }
  },
  register: {
    name: {
      type: Schema.Types.Number,
      default: TestStatus.NOREP,
    },
    surname: {
      type: Schema.Types.Number,
      default: TestStatus.NOREP,
    },
    sex: {
      type: Schema.Types.Number,
      default: TestStatus.NOREP,
    },
    birthdate: {
      type: Schema.Types.Number,
      default: TestStatus.NOREP,
    },
    email: {
      type: Schema.Types.Number,
      default: TestStatus.NOREP,
    },
    manualBack: {
      type: Schema.Types.Number,
      default: TestStatus.NOREP,
    }
  },
  payPerm: {
    ticket: {
      type: Schema.Types.Number,
      default: TestStatus.NOREP,
    },
    card: {
      type: [{
        type: {
          type: Schema.Types.Number,
          index: true,
          validate: {
            validator: function (value) {
              return !!CardType[value];
            },
            message: "Invalid Card Type"
          },
        },
        saveCard:
          {
            type: Schema.Types.Number,
            default: TestStatus.NOREP,
          },

        cardBack: {
          type: Schema.Types.Number,
          default: TestStatus.NOREP,
        },
        cardUse: {
          type: Schema.Types.Number,
          default: TestStatus.NOREP,
        },
      }]
    },
    extPay: {
      type: [{
        extPayUse:
          {
            type: Schema.Types.Number,
            default: TestStatus.NOREP,
          },
        extPayName: {
          type: Schema.Types.Number,
          index: true,
          validate: {
            validator: function (value) {
              return !!ExtPayType[value];
            },
            message: "Invalid ExtPayType"
          },
        },
        extPayBack: {
          type: Schema.Types.Number,
          default: TestStatus.NOREP,
        },
        extSave: {
          type: Schema.Types.Number,
          default: TestStatus.NOREP
        }
      }]
    },
  },
  horaIn: {
    type: Schema.Types.String,
  },
  horaOut: {
    type: Schema.Types.String,
  },
  removed: {
    type: Schema.Types.Boolean,
    default: false
  },
}, BaseSchema), schema_options);

let ParticipantModel = model("participant", schema);
export {ParticipantModel as Model};