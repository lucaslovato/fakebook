import {TestManager} from '../TestManager';
import {PartStatus} from "../../db/model/Participant";

const chai = require("chai");
const chaihttp = require("chai-http");
chai.use(chaihttp);
let expect = chai.expect;
let io = require("socket.io-client");
let socketUrl = "http://localhost:1337";
let testManager = null;

describe("Teste AdminRTC", () => {
  before(function (done) {
    testManager = new TestManager(done);
  });

  let cliente = null;
  let usuario = null;

  it("Connect", (done) => {
    cliente = io(socketUrl);
    cliente.on("connect", (data) => {
      done();
    });
    cliente.connect();
  });

  describe('Login', () => {
    it('Login email errado', (done) => {
      let email_errado = (msg) => {
        expect(msg.datas.success).to.be.false;
        expect(msg.datas.data).to.be.instanceOf(Object);
        expect(msg.datas.data).to.include.all.keys('buttons', 'description', 'title');
        cliente.removeListener('retorno', email_errado);
        done();
      };
      cliente.on('retorno', email_errado);
      let user = {
        email: 'admin@ademir',
        password: 'admin'
      };
      cliente.emit('login', {datas: user});
    });

    it('Login senha errada', (done) => {
      let senha_errado = (msg) => {
        expect(msg.datas.success).to.be.false;
        expect(msg.datas.data).to.be.instanceOf(Object);
        expect(msg.datas.data).to.include.all.keys('buttons', 'description', 'title');
        cliente.removeListener('retorno', senha_errado);
        done();
      };
      cliente.on('retorno', senha_errado);
      let user = {
        email: 'admin@admin.com',
        password: 'ademir'
      };
      cliente.emit('login', {datas: user});
    });

    it("Admin Login", (done) => {
      let retorno_login = function (msg) {
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceOf(Object);
        expect(msg.datas.data).to.include.all.keys("email", "first_name", "id", "surname", "type");
        usuario = msg.datas.data;
        cliente.removeListener("retorno", retorno_login);
        done();
      };
      cliente.on("retorno", retorno_login);
      let user = {
        email: "admin@admin.com",
        password: "admin",
      };
      cliente.emit("login", {datas: user});
    });

  });

  describe('Busca de Participante', () => {

    it("Busca de Participante pelo Status Created", (done) => {
      let retorno_partSearch = (msg) => {
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceof(Array);
        expect(msg.datas.data[0]).to.include.all.keys("basicPerm", "code", "id", "payPerm", "privatePerm", "socialPerm", "register");
        expect(msg.datas.data[0].basicPerm).to.be.instanceof(Object);
        expect(msg.datas.data[0].basicPerm).to.include.all.keys("camera", "dispHistory", "locale", "microphone", "navHistory");
        expect(msg.datas.data[0].payPerm).to.be.instanceof(Object);
        expect(msg.datas.data[0].payPerm).to.include.all.keys("creditCard", "extPay", "saveCard", "saveCard", "ticket");
        expect(msg.datas.data[0].payPerm.extPay).to.be.instanceof(Array);
        expect(msg.datas.data[0].payPerm.extPay[0]).to.include.all.keys("extPayBack", "extPayName", "extPayUse", "_id");
        expect(msg.datas.data[0].privatePerm).to.be.instanceof(Object);
        expect(msg.datas.data[0].privatePerm).to.include.all.keys("calendar", "contacts", "identity", "multimedia");
        expect(msg.datas.data[0].register).to.be.instanceof(Object);
        expect(msg.datas.data[0].register).to.include.all.keys("birthdate", "cellphone", "civilState", "complement", "country", "cpf", "rg", "email", "name", "neighborhood", "sex", "sms", "state", "surname");
        expect(msg.datas.data[0].socialPerm).to.be.instanceof(Array);
        expect(msg.datas.data[0].socialPerm[0]).to.include.all.keys("name", "socialBack", "use", "_id");
        cliente.removeListener("retorno", retorno_partSearch);
        done();
      };
      cliente.on("retorno", retorno_partSearch);
      let data = {
        status: PartStatus.CREATED,
      };
      cliente.emit("part_read", {datas: data});
    });
    it("Busca de Participante pelo Status INITIATED", (done) => {
      let retorno_partSearch = (msg) => {
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceof(Array);
        expect(msg.datas.data[0]).to.include.all.keys("basicPerm", "code", "id", "payPerm", "privatePerm", "socialPerm", "register");
        expect(msg.datas.data[0].basicPerm).to.be.instanceof(Object);
        expect(msg.datas.data[0].basicPerm).to.include.all.keys("camera", "dispHistory", "locale", "microphone", "navHistory");
        expect(msg.datas.data[0].payPerm).to.be.instanceof(Object);
        expect(msg.datas.data[0].payPerm).to.include.all.keys("creditCard", "extPay", "saveCard", "saveCard", "ticket");
        expect(msg.datas.data[0].payPerm.extPay).to.be.instanceof(Array);
        expect(msg.datas.data[0].payPerm.extPay[0]).to.include.all.keys("extPayBack", "extPayName", "extPayUse", "_id");
        expect(msg.datas.data[0].privatePerm).to.be.instanceof(Object);
        expect(msg.datas.data[0].privatePerm).to.include.all.keys("calendar", "contacts", "identity", "multimedia");
        expect(msg.datas.data[0].register).to.be.instanceof(Object);
        expect(msg.datas.data[0].register).to.include.all.keys("birthdate", "cellphone", "civilState", "complement", "country", "cpf", "rg", "email", "name", "neighborhood", "sex", "sms", "state", "surname");
        expect(msg.datas.data[0].socialPerm).to.be.instanceof(Array);
        expect(msg.datas.data[0].socialPerm[0]).to.include.all.keys("name", "socialBack", "use", "_id");
        cliente.removeListener("retorno", retorno_partSearch);
        done();
      };
      cliente.on("retorno", retorno_partSearch);
      let data = {
        status: PartStatus.INITIATED,
      };
      cliente.emit("part_read", {datas: data});
    });
    it("Busca de Participante pelo Status FINISHED", (done) => {
      let retorno_partSearch = (msg) => {
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceof(Array);
        expect(msg.datas.data[0]).to.include.all.keys("basicPerm", "code", "id", "payPerm", "privatePerm", "socialPerm", "register");
        expect(msg.datas.data[0].basicPerm).to.be.instanceof(Object);
        expect(msg.datas.data[0].basicPerm).to.include.all.keys("camera", "dispHistory", "locale", "microphone", "navHistory");
        expect(msg.datas.data[0].payPerm).to.be.instanceof(Object);
        expect(msg.datas.data[0].payPerm).to.include.all.keys("creditCard", "extPay", "saveCard", "saveCard", "ticket");
        expect(msg.datas.data[0].payPerm.extPay).to.be.instanceof(Array);
        expect(msg.datas.data[0].payPerm.extPay[0]).to.include.all.keys("extPayBack", "extPayName", "extPayUse", "_id");
        expect(msg.datas.data[0].privatePerm).to.be.instanceof(Object);
        expect(msg.datas.data[0].privatePerm).to.include.all.keys("calendar", "contacts", "identity", "multimedia");
        expect(msg.datas.data[0].register).to.be.instanceof(Object);
        expect(msg.datas.data[0].register).to.include.all.keys("birthdate", "cellphone", "civilState", "complement", "country", "cpf", "rg", "email", "name", "neighborhood", "sex", "sms", "state", "surname");
        expect(msg.datas.data[0].socialPerm).to.be.instanceof(Array);
        expect(msg.datas.data[0].socialPerm[0]).to.include.all.keys("name", "socialBack", "use", "_id");
        cliente.removeListener("retorno", retorno_partSearch);
        done();
      };
      cliente.on("retorno", retorno_partSearch);
      let data = {
        status: PartStatus.FINISHED,
      };
      cliente.emit("part_read", {datas: data});
    });
    it("Excel dos participantes finalizados", (done) => {
      let retorno_generate_fin_excel = (msg) => {
        expect(msg.datas.success).to.be.true;
        //todo: expect ver o retorno da *data*.
        cliente.removeListener("retorno", retorno_generate_fin_excel);
        done();
      };
      cliente.on("retorno", retorno_generate_fin_excel);
      let data = {};
      cliente.emit("generate_fin_excel", {datas: data});
    });

  });
  describe('CRIAR TESTES', () => {

    it("Criando x testes(participantes)", (done) => {
      let retorno_code_generator = (msg) => {
        expect(msg.datas.success).to.be.true;
        expect(msg.datas.data).to.be.instanceof(Array);
        expect(msg.datas.data[0]).to.include.all.keys("basicPerm", "code", "id", "payPerm", "privatePerm", "socialPerm");
        expect(msg.datas.data[0].basicPerm).to.be.instanceof(Object);
        expect(msg.datas.data[0].basicPerm).to.include.all.keys("camera", "dispHistory", "locale", "microphone", "navHistory");
        expect(msg.datas.data[0].payPerm).to.be.instanceof(Object);
        expect(msg.datas.data[0].payPerm).to.include.all.keys("extPay");
        expect(msg.datas.data[0].payPerm.extPay).to.be.instanceof(Array);
        expect(msg.datas.data[0].privatePerm).to.be.instanceof(Object);
        expect(msg.datas.data[0].privatePerm).to.include.all.keys("calendar", "contacts", "identity", "multimedia");
        expect(msg.datas.data[0].socialPerm).to.be.instanceof(Array);
        cliente.removeListener("retorno", retorno_code_generator);
        done();
      };
      cliente.on("retorno", retorno_code_generator);
      let data = {
        number: 50,
      };
      cliente.emit("code_generator", {datas: data});
    });

    it("Criando x testes(participantes)", (done) => {
      let retorno_free_codes = (msg) => {
        expect(msg.datas.success).to.be.true;
        cliente.removeListener("retorno", retorno_free_codes);
        done();
      };
      cliente.on("retorno", retorno_free_codes);
      let data = {};
      cliente.emit("free_codes", {datas: data});
    });
  });

  describe('Logout', () => {

    it("Admin Logout", (done) => {
      let retorno_login = (msg) => {
        expect(msg.datas.success).to.be.true;
        cliente.removeListener("retorno", retorno_login);
        done();
      };
      cliente.on("retorno", retorno_login);
      let data = {};
      cliente.emit("logout", {datas: data});
    });

  });


});