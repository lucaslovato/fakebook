import * as crypto from "crypto";
import * as path from "path";
import * as fs from "fs";

export class Util {
  private static config = require(path.resolve("config.json"));

  public static validateEmail(value): boolean {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(value);
  }

  public static decryptWithPrivateKey(toDecrypt, privateKeyPath = "util/privkey.pem"): string {
    let absolutePath = path.resolve(privateKeyPath);
    let privateKey = fs.readFileSync(absolutePath, "utf8");
    let buffer = new Buffer(toDecrypt, "base64");
    let decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString("utf8");
  };

  public static validateCPNJ(value): boolean {
    value = value.replace('.', '');
    value = value.replace('.', '');
    value = value.replace('.', '');
    value = value.replace('-', '');
    value = value.replace('/', '');
    let cnpj = value;
    let numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
    digitos_iguais = 1;
    if (cnpj.length < 14 && cnpj.length < 15)
      return false;
    for (i = 0; i < cnpj.length - 1; i++)
      if (cnpj.charAt(i) != cnpj.charAt(i + 1)) {
        digitos_iguais = 0;
        break;
      }
    if (!digitos_iguais) {
      tamanho = cnpj.length - 2;
      numeros = cnpj.substring(0, tamanho);
      digitos = cnpj.substring(tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
          pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(0))
        return false;
      tamanho = tamanho + 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
          pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

      return resultado !== digitos.charAt(1);
    }
    else
      return false;
  }

  public static encrypt(encrypton_method, senha): string {
    return crypto.createHash(encrypton_method).update(senha).digest('hex');
  }

  public static isArray(value): boolean {
    return Array.isArray(value);
  }

  public static isValidId(value): boolean {
    return /^[a-fA-F0-9]{24}$/.test(value);
  }

  public static async getErrorByLocale(locale: string, error: string, type_error: string){
    let error_obj = await require(path.resolve('locale/'+locale+'/errors.json'));
    return error_obj[error][type_error];
  }
}