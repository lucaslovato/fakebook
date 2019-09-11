import {TestManager} from '../TestManager';
import {CardType} from "../../db/model/Participant";

const chai: any = require('chai');
const chaihttp = require('chai-http');

chai.use(chaihttp);

let expect = chai.expect;

let testManager = null;
let user = null;
let participante = null;

describe('Teste aplicativo', () => {
  before(function (done) {
    testManager = new TestManager(done);
  });
  it('Admin Login', (done) => {
    chai.request('http://localhost:1337')
      .post('/api/open/login')
      .send({
        email: "admin@admin.com",
        password: "admin",
      })
      .end(async (error, response) => {
        user = response.body.data;
        done();
      });
  });
  //todo: arrumar os testes do ademir
  it('Gera Relatório participantes finalizados', (done) => {
    chai.request('http://localhost:1337')
      .get('/api/open/generate_fin_excel')
      .set("authentication-key", user.id)
      .set("type", "user")
      .end(async (error, response) => {
        expect(response.type).to.be.equal("application/vnd.openxmlformats");
        expect(response.status).to.be.equal(200);
        done();
      });
  });
  it('Gerar excel novos códigos', (done) => {
    chai.request('http://localhost:1337')
      .get('/api/open/code_generator')
      .set("authentication-key", user.id)
      .set("type", "user")
      .set({quantity: 2})
      .end(async (error, response) => {
        expect(response.type).to.be.equal("application/vnd.openxmlformats");
        expect(response.status).to.be.equal(200);
        done();
      });
  });
  it('Gerar excel cédigos livres', (done) => {
    chai.request('http://localhost:1337')
      .get('/api/open/free_codes')
      .set("authentication-key", user.id)
      .set("type", "user")
      .end(async (error, response) => {
        expect(response.type).to.be.equal("application/vnd.openxmlformats");
        expect(response.status).to.be.equal(200);
        done();
      });
  });
  it('Logout do ademir', (done) => {
    chai.request('http://localhost:1337')
      .get('/api/logout')
      .set("authentication-key", user.id)
      .set("type", "user")
      .send({id: user.id})
      .end(async (error, response) => {
        done();
      });
  });
  it('Login - Do Participante - deu boa ', (done) => {
    chai.request('http://localhost:1337')
      .post('/api/open/login_participant')
      .send({
        code: '123556'
      })
      .end(async (error, response) => {
        participante = response.body.data[0];
        done();
      });
  });
  it('Login - Do Participante - usuario ja esta logado ', (done) => {
    chai.request('http://localhost:1337')
      .post('/api/open/login_participant')
      .send({
        code: '123556'
      })
      .end(async (error, response) => {
        done();
      });
  });
  it('Login - Do Participante - usuario nao encontrado ', (done) => {
    chai.request('http://localhost:1337')
      .post('/api/open/login_participant')
      .send({
        code: '777bro'
      })
      .end(async (error, response) => {
        expect(response.body.description).to.be.equal("usuário nao encontrado");
        expect(response.body.error).to.be.true;
        done();
      });
  });
  it('Login - Do Participante - teste ja finalizado ', (done) => {
    chai.request('http://localhost:1337')
      .post('/api/open/login_participant')
      .send({
        code: '133457'
      })
      .end(async (error, response) => {
        expect(response.body.description).to.be.equal("teste já finalizado");
        expect(response.body.error).to.be.true;
        done();
      });
  });
  it('Participante Envia respostas - basicperm ( deu boa )', (done) => {
    chai.request('http://localhost:1337')
      .post('/api/send_ans')
      .set("authentication-key", participante.id)
      .set("type", "participant")
      .send({
        code: '123556',
        option: '1',
        update: {
          basicPerm: {
            dispHistory: 1,
            navHistory: 0,
            camera: 1,
            microphone: 0,
            locale: 1,
          }
        }
      })
      .end(async (error, response) => {
        expect(response.body.data).to.be.instanceOf(Object);
        expect(response.body.data).to.include.all.keys('n', 'nModified', 'ok');
        expect(response.body.success).to.be.true;
        done();
      });
  });
  it('basicperm Update Error - locale faltando', (done) => {
    chai.request('http://localhost:1337')
      .post('/api/send_ans')
      .set("authentication-key", participante.id)
      .set("type", "participant")
      .send({
        code: '123556',
        option: '1',
        update: {
          basicPerm: {
            dispHistory: 1,
            navHistory: 0,
            camera: 1,
            microphone: 0,
          }
        }
      })
      .end(async (error, response) => {
        expect(response.body).to.include.all.keys('description', 'key', 'success');
        expect(response.body.description).to.be.equal("A key locale está faltando");
        expect(response.body.key).to.be.equal("locale");
        expect(response.body.success).to.be.false;
        done();
      });
  });
  it('Participante Envia respostas - privatePerm ( deu boa )', (done) => {
    chai.request('http://localhost:1337')
      .post('/api/send_ans')
      .set("authentication-key", participante.id)
      .set("type", "participant")
      .send({
        code: '123556',
        option: '2',
        update: {
          privatePerm: {
            multimedia: 0,
            identity: 1,
            calendar: 0,
            contacts: 1,
          }
        }
      })
      .end(async (error, response) => {
        expect(response.body.data).to.be.instanceOf(Object);
        expect(response.body.data).to.include.all.keys('n', 'nModified', 'ok');
        expect(response.body.success).to.be.true;
        done();
      });

  });
  it('PrivatePerm Update Error - contacts faltando', (done) => {
    chai.request('http://localhost:1337')
      .post('/api/send_ans')
      .set("authentication-key", participante.id)
      .set("type", "participant")
      .send({
        code: '123556',
        option: '2',
        update: {
          privatePerm: {
            multimedia: 0,
            identity: 0,
            calendar: 1,
          }
        }
      })
      .end(async (error, response) => {
        expect(response.body).to.include.all.keys('description', 'key', 'success');
        expect(response.body.description).to.be.equal("A key contacts está faltando");
        expect(response.body.success).to.be.false;
        done();
      });

  });
  it('Participante Envia respostas - register ( deu boa )', (done) => {
    chai.request('http://localhost:1337')
      .post('/api/send_ans')
      .set("authentication-key", participante.id)
      .set("type", "participant")
      .send({
        code: '123556',
        option: '3',
        update: {
          register: {
            name: 0,
            surname: 0,
            civilState: 0,
            sex: 0,
            birthdate: 0,
            cellphone: 0,
            email: 0,
            sms: 0,
          }
        }
      })
      .end(async (error, response) => {
        expect(response.body.data).to.be.instanceOf(Object);
        expect(response.body.data).to.include.all.keys('n', 'nModified', 'ok');
        expect(response.body.success).to.be.true;
        done();
      });

  });
  it('Register Update Error - email faltando', (done) => {
    chai.request('http://localhost:1337')
      .post('/api/send_ans')
      .set("authentication-key", participante.id)
      .set("type", "participant")
      .send({
        code: '123556',
        option: '3',
        update: {
          register: {
            name: 1,
            surname: 0,
            civilState: 0,
            sex: 0,
            birthdate: 0,
            sms: 0,
          }
        }
      })
      .end(async (error, response) => {
        expect(response.body.description).to.be.equal("A key email está faltando");
        expect(response.body.key).to.be.equal("email");
        expect(response.body.success).to.be.false;
        done();
      });

    it('Document Update', (done) => {
      chai.request('http://localhost:1337')
        .post('/api/send_ans')
        .set("authentication-key", participante.id)
        .set("type", "participant")
        .send({
          code: '123556',
          option: '6',
          update: {
            document: {
              rg: 1,
              cpf: 1,
            }
          }
        })
        .end(async (error, response) => {
          done();
        });
    });

    it('Document Update', (done) => {
      chai.request('http://localhost:1337')
        .post('/api/send_ans')
        .set("authentication-key", participante.id)
        .set("type", "participant")
        .send({
          code: '123556',
          option: '7',
          update: {
            address: {
              state: 1,
              neighborhood: 1,
              complement: 1,
            }
          }
        })
        .end(async (error, response) => {
          done();
        });
    });

    it('Participante Envia respostas - payPerm ( deu boa )', (done) => {
      chai.request('http://localhost:1337')
        .post('/api/send_ans')
        .set("authentication-key", participante.id)
        .set("type", "participant")
        .send({
          code: '123556',
          option: '4',
          update: {
            payPerm: {
              ticket: 0,
              card: [
                {
                  type: CardType.CREDIT,
                  saveCard: 1,
                  cardBack: 0,
                  cardUse: 0,
                },
                {
                  type: CardType.DEBIT,
                  saveCard: 0,
                  cardBack: 0,
                  cardUse: 0,
                },
              ],
              extPay: [
                {
                  extPayUse: 0,
                  extPayName: 0,
                  extPayBack: 0,
                  extSave: 0
                },
                {
                  extPayName: 1,
                  extPayBack: 1,
                  extPayUse: 1,
                  extSave: 0
                },
                {
                  extPayName: 2,
                  extPayBack: 2,
                  extPayUse: 2,
                  extSave: 0
                }
              ]
            }
          }
        })
        .end(async (error, response) => {
          expect(response.body.data).to.be.instanceOf(Object);
          expect(response.body.data).to.include.all.keys('n', 'nModified', 'ok');
          expect(response.body.success).to.be.true;
          done();
        });
    });

    it('PayPerm Update Error - card faltando', (done) => {
      chai.request('http://localhost:1337')
        .post('/api/send_ans')
        .set("authentication-key", participante.id)
        .set("type", "participant")
        .send({
          code: '123556',
          option: '4',
          update: {
            payPerm: {
              ticket: 1,
              creditCard: 1,
              saveCard: 1,
              extPay: [
                {
                  extPayUse: 1,
                  extPayName: "hu3life",
                  extPayBack: 1,
                },
                {
                  extPayName: "fakebuki",
                  extPayBack: 1,
                  //exemplo faltando um extpayUse no segundo extpay
                }
              ]
            }
          }
        })
        .end(async (error, response) => {
          expect(response.body.description).to.be.equal("A key card está faltando");
          expect(response.body.key).to.be.equal("card");
          expect(response.body.success).to.be.false;
          done();
        });

    });
    it('PayPerm Update Error - type faltando', (done) => {
      chai.request('http://localhost:1337')
        .post('/api/send_ans')
        .set("authentication-key", participante.id)
        .set("type", "participant")
        .send({
          code: '123556',
          option: '4',
          update: {
            payPerm: {
              ticket: 1,
              card: [
                {
                  saveCard: 0,
                  cardBack: 0,
                  cardUse: 0,
                },
                {
                  type: CardType.DEBIT,
                  saveCard: 1,
                  cardBack: 1,
                  cardUse: 0,
                },
              ],
              extPay: [
                {
                  extPayUse: 1,
                  extPayName: 0,
                  extPayBack: 1,
                  save: 0
                },
                {
                  extPayName: 1,
                  extPayBack: 1,
                  extPayUse: 1,
                  save: 0
                },
                {
                  extPayName: 2,
                  extPayBack: 1,
                  extPayUe: 1,
                  save: 0
                }
              ]
            }
          }
        })
        .end(async (error, response) => {
          expect(response.body.description).to.be.equal("A key type está faltando");
          expect(response.body.key).to.be.equal("type");
          expect(response.body.success).to.be.false;
          done();
        });
    });
    it('PayPerm Update Error - saveCard faltando', (done) => {
      chai.request('http://localhost:1337')
        .post('/api/send_ans')
        .set("authentication-key", participante.id)
        .set("type", "participant")
        .send({
          code: '123556',
          option: '4',
          update: {
            payPerm: {
              ticket: true,
              card: [
                {
                  type: CardType.CREDIT,
                  cardBack: 1,
                  cardUse: 1,
                },
                {
                  type: CardType.DEBIT,
                  saveCard: 1,
                  cardBack: 1,
                  cardUse: 1,
                },
              ],
              extPay: [
                {
                  extPayUse: 0,
                  extPayName: 0,
                  extPayBack: 0,
                },
                {
                  extPayName: 1,
                  extPayBack: 0,
                  extPayUse: 0
                },
                {
                  extPayName: 2,
                  extPayBack: 1,
                  extPayUse: 0
                }
              ]
            }
          }
        })
        .end(async (error, response) => {
          expect(response.body.description).to.be.equal("A key saveCard está faltando");
          expect(response.body.key).to.be.equal("saveCard");
          expect(response.body.success).to.be.false;
          done();
        });
    });
    // it('Participante Envia respostas - socialPerm ( deu boa )', (done) => {
    //   chai.request('http://localhost:1337')
    //     .post('/api/send_ans')
    //     .set("authentication-key", participante.id)
    //     .set("type", "participant")
    //     .send({
    //       code: '123556',
    //       option: '5',
    //       update: {
    //         socialPerm: [
    //           {
    //             use: false,
    //             name: 0,
    //             socialBack: true,
    //           },
    //           {
    //             use: true,
    //             name: 1,
    //             socialBack: false,
    //           },
    //           {
    //             use: false,
    //             name: 2,
    //             socialBack: true,
    //           }
    //         ]
    //       }
    //     })
    //     .end(async (error, response) => {
    //       done();
    //     });
    // });
    // it('SocialPerm Update Error - name faltando', (done) => {
    //   chai.request('http://localhost:1337')
    //     .post('/api/send_ans')
    //     .set("authentication-key", participante.id)
    //     .set("type", "participant")
    //     .send({
    //       code: '123556',
    //       option: '5',
    //       update: {
    //         socialPerm: [
    //           {
    //             use: true,
    //             socialBack: false,
    //           },
    //           {
    //             use: false,
    //             name: 1,
    //             socialBack: true,
    //           }
    //         ]
    //       }
    //     })
    //     .end(async (error, response) => {
    //       expect(response.body).to.include.all.keys('description', 'key', 'success');
    //       expect(response.body.description).to.be.equal("A key name está faltando");
    //       expect(response.body.success).to.be.false;
    //       done();
    //     });
    // });
    it('Eviando respostas sem estar no teste', (done) => {
      chai.request('http://localhost:1337')
        .post('/api/send_ans')
        .set("authentication-key", "5b44f6e7f1e11a175b99803c")
        .set("type", "participant")
        .send({
          code: '323357',
          option: '5',
          update: {
            socialPerm: [
              {
                use: 0,
                name: "facebook",
                socialBack: 0,
              },
              {
                use: 0,
                name: "twitter",
                socialBack: 0,
              }
            ]
          }
        })
        .end(async (error, response) => {
          expect(response.text).to.be.equal("Participante não logado.");
          expect(response.unauthorized).to.be.true;
          expect(response.status).to.be.equal(401);
          done();
        });
    });
    it('Participante teste do socialPerm (novo) - tudo certo faltando 2', (done) => {
      chai.request('http://localhost:1337')
        .post('/api/socialPermUpdate')
        .set("authentication-key", participante.id)
        .set("type", "participant")
        .send({
          code: '123556',
          socialPerm: [
            {
              use: 1,
              name: 0,
              socialBack: 1,
            }
          ]
        })
        .end(async (error, response) => {
          expect(response.body.data).to.be.instanceOf(Object);
          expect(response.body.data).to.include.all.keys('n', 'nModified', 'ok');
          expect(response.body.success).to.be.true;
          done();
        });
    });
    it('Participante teste do socialPerm (novo) - tudo certo faltando 1', (done) => {
      chai.request('http://localhost:1337')
        .post('/api/socialPermUpdate')
        .set("authentication-key", participante.id)
        .set("type", "participant")
        .send({
          code: '123556',
          socialPerm: [
            {
              use: 0,
              name: 0,
              socialBack: 0,
            },
            {
              use: 1,
              name: 1,
              socialBack: 1,
            },
          ]
        })
        .end(async (error, response) => {
          expect(response.body.data).to.be.instanceOf(Object);
          expect(response.body.data).to.include.all.keys('n', 'nModified', 'ok');
          expect(response.body.success).to.be.true;
          done();
        });
    });
    it('Participante teste do socialPerm (novo) - tudo certo faltando 0', (done) => {
      chai.request('http://localhost:1337')
        .post('/api/socialPermUpdate')
        .set("authentication-key", participante.id)
        .set("type", "participant")
        .send({
          code: '123556',
          socialPerm: [
            {
              use: 0,
              name: 0,
              socialBack: 0,
            },
            {
              use: 1,
              name: 1,
              socialBack: 1,
            },
            {
              use: 1,
              name: 2,
              socialBack: 1,
            }
          ]
        })
        .end(async (error, response) => {
          expect(response.body.data).to.be.instanceOf(Object);
          expect(response.body.data).to.include.all.keys('n', 'nModified', 'ok');
          expect(response.body.success).to.be.true;
          done();
        });
    });
    it('Participante teste do socialPerm (novo) - tudo certo faltando 0 - ordem invertida', (done) => {
      chai.request('http://localhost:1337')
        .post('/api/socialPermUpdate')
        .set("authentication-key", participante.id)
        .set("type", "participant")
        .send({
          code: '936448',
          socialPerm: [
            {
              use: 1,
              name: 2,
              socialBack: 1,
            },
            {
              use: 0,
              name: 0,
              socialBack: 0,
            },
            {
              use: 1,
              name: 1,
              socialBack: 1,
            }
          ]
        })
        .end(async (error, response) => {
          expect(response.body.data).to.be.instanceOf(Object);
          expect(response.body.data).to.include.all.keys('n', 'nModified', 'ok');
          expect(response.body.success).to.be.true;
          done();
        });
    });
    it('Participante Sai do teste', (done) => {
      chai.request('http://localhost:1337')
        .post('/api/close_test')
        .set("authentication-key", participante.id)
        .set("type", "participant")
        .send({
          code: '123556',
        })
        .end(async (error, response) => {
          expect(response.body).to.include.all.keys('data', 'success');
          expect(response.body.data).to.be.instanceof(Object);
          expect(response.body.data).to.include.all.keys('n', 'nModified', 'ok');
          expect(response.body.success).to.be.true;
          done();
        });
    });
  });
});