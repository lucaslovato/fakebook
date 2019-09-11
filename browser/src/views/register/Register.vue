<style scoped>
    body {
        margin: 0;
        padding: 0;
    }

    .checkbox-perm {
        margin: 15px 0 -20px 0
    }
</style>

<template>
    <v-layout column wrap>
        <v-flex x12>
            <!--Stepper para a compra do produto-->
            <v-stepper v-model="state.register.actualStep" vertical>
                <v-stepper-step :complete="getActualStep() > 1" step="1">
                    Identificação
                    <small>Primeiro passo</small>
                </v-stepper-step>
                <v-stepper-content step="1">
                    <v-card>
                        <v-card-text>
                            <v-layout column wrap align-center justify-center>
                                <v-flex xs12>
                                    <div>
                                        <h2>Já sou cliente</h2>
                                    </div>
                                    <div>
                                        <v-text-field
                                                label="E-mail"
                                                required></v-text-field>
                                        <v-text-field
                                                label="Senha"
                                                required></v-text-field>
                                    </div>
                                    <p><a>Esqueci minha senha</a></p>
                                </v-flex>
                                <v-flex xs12>
                                    <v-btn>Acessar Conta</v-btn>
                                </v-flex>
                                <v-flex xs12 style="margin-bottom: 25px">
                                    <v-btn class="success" @click="updateSocialPerm()">Criar Nova
                                        Conta
                                    </v-btn>
                                </v-flex>
                                <v-divider></v-divider>
                                <v-flex xs12 style="margin-top: 25px">
                                    <h2>Cadastrar usando:</h2>
                                </v-flex>
                                <v-flex xs12>
                                    <v-btn round @click="openGoogle()">
                                        Conta Google
                                        <v-icon right>
                                            mdi-google
                                        </v-icon>
                                    </v-btn>
                                </v-flex>
                                <GoogleDialog></GoogleDialog>
                                <v-flex xs12>
                                    <v-btn round @click="openFacebook()">
                                        Facebook
                                        <v-icon right>
                                            mdi-facebook-box
                                        </v-icon>
                                    </v-btn>
                                </v-flex>
                                <FacebookDialog></FacebookDialog>
                                <v-flex xs12>
                                    <v-btn round @click="openTwitter()">
                                        Twitter
                                        <v-icon right>
                                            mdi-twitter
                                        </v-icon>
                                    </v-btn>
                                </v-flex>
                                <TwitterDialog></TwitterDialog>
                            </v-layout>
                        </v-card-text>
                    </v-card>
                </v-stepper-content>

                <v-stepper-step :complete="getActualStep() > 2" step="2">
                    Dados do usuário
                    <small>Segundo Passo</small>
                </v-stepper-step>
                <v-stepper-content step="2">
                    <v-card>
                        <v-card-text>
                            <v-layout column>
                                <v-flex xs12>
                                    <v-text-field
                                            label="Nome*"
                                            :error-messages="error(0)"
                                            required
                                            v-model="step2.name"
                                            @input="$v.step2.name.$touch()"
                                            @blur="$v.step2.name.$touch()"></v-text-field>
                                    <v-text-field
                                            label="Sobrenome*"
                                            :error-messages="error(1)"
                                            required
                                            v-model="step2.surname"
                                            @input="$v.step2.surname.$touch()"
                                            @blur="$v.step2.surname.$touch()"></v-text-field>

                                    <v-dialog
                                            ref="dialog"
                                            v-model="menu"
                                            persistent
                                            lazy
                                            full-width
                                            width="290px">
                                        <v-text-field
                                                slot="activator"
                                                v-model="birthdate1"
                                                label="Data de nascimento"
                                                prepend-icon="event"
                                                readonly
                                        ></v-text-field>
                                        <v-date-picker
                                                ref="picker"
                                                v-model="step2.birthdate"
                                                :max="new Date().toISOString().substr(0, 10)"
                                                min="1950-01-01"
                                                locale="pt-br"
                                                @change="save()"
                                                scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                                            <v-btn flat color="primary" @click="menu = false">OK</v-btn>
                                        </v-date-picker>
                                    </v-dialog>
                                    <v-select
                                            v-model="step2.sex"
                                            :items="step2.sexOptions"
                                            item-text="text"
                                            item-value="value"
                                            label="Sexo"></v-select>
                                </v-flex>
                                <v-flex xs12>
                                    <!--<v-select-->
                                            <!--:items="step2.civilStateOpt"-->
                                            <!--item-text="text"-->
                                            <!--item-value="value"-->
                                            <!--v-model="step2.civilState"-->
                                            <!--label="Estado Civil"></v-select>-->
                                    <v-text-field
                                            label="E-mail*" v-model="step2.email"></v-text-field>
                                    <v-text-field
                                            label="Senha*" v-model="step2.password"
                                            :append-icon="step2.showPassword ? 'visibility_off' : 'visibility'"
                                            :type="step2.showPassword ? 'text' : 'password'"
                                            @click:append="step2.showPassword = !step2.showPassword"
                                            :error-messages="error(4)"
                                            @input="$v.step2.password.$touch()"
                                            @blur="$v.step2.password.$touch()"></v-text-field>
                                    <span><small>Campos marcados com * são Obrigatórios</small></span>
                                </v-flex>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn @click=" setActualStep(1)">Voltar</v-btn>
                                    <v-btn class="primary" @click="step2Send()" :disabled="$v.step2.$invalid">
                                        Continuar
                                    </v-btn>
                                </v-card-actions>
                            </v-layout>
                        </v-card-text>
                    </v-card>
                </v-stepper-content>
                <v-stepper-step :complete="getActualStep() > 3" step="3">
                    Dados pessoais
                    <small>Terceiro Passo</small>
                </v-stepper-step>
                <v-stepper-content step="3">
                    <v-card>
                        <v-card-text>
                            <v-select
                                    :items="step3.civilStateOpt"
                                    item-text="text"
                                    item-value="value"
                                    v-model="step3.civilState"
                                    label="Estado Civil"></v-select>
                            <v-text-field
                                    label="RG" v-model="step3.rg"></v-text-field>
                            <v-text-field
                                    label="CPF*"
                                    v-model="step3.cpf"
                                    :error-messages="error(5)"
                                    required
                                    @input="$v.step3.cpf.$touch()"
                                    @blur="$v.step3.cpf.$touch()"></v-text-field>
                            <v-text-field
                                    label="Telefone*"
                                    prepend-icon="mdi-phone"
                                    v-model="step3.cellphone"
                                    :error-messages="error(6)"
                                    required
                                    @input="$v.step3.cellphone.$touch()"
                                    @blur="$v.step3.cellphone.$touch()"></v-text-field>
                            <v-flex>
                                <span style="margin: 10px 0 500px  0"><small>Campos marcados com * são Obrigatórios</small></span>
                            </v-flex>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="dialog = true" :disabled="$v.step3.$invalid">Confirmar Número</v-btn>
                        </v-card-actions>
                    </v-card>
                    <v-dialog width="300" v-model="dialog">
                        <v-card>
                            <v-card-title
                                    class="headline grey lighten-2"
                                    primary-title>
                                <v-icon style="margin-right: 10px">mdi-phone</v-icon>
                                Confirmar Número
                            </v-card-title>

                            <v-card-text>
                                Uma mensagem SMS com um código de confirmação foi enviado ao seu
                                telefone.
                                Deseja permitir o acesso às mensagens SMS para ler o
                                código de confirmação?
                            </v-card-text>

                            <v-divider></v-divider>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" flat @click="prepareToSendDocs(0)">
                                    Cancelar
                                </v-btn>
                                <v-btn color="primary" flat @click="prepareToSendDocs(1)">Permitir</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-stepper-content>
                <v-stepper-step step="4">
                    Terceiro Passo
                    <small>Preencher Dados da Conta e Localização</small>
                </v-stepper-step>
                <v-stepper-content step="4">
                    <v-card>
                        <v-layout column>
                            <v-flex xs12>
                                <v-card-text class="align-center">
                                    <v-dialog v-model="dialog2" width="300">
                                        <v-btn slot="activator">
                                            <v-icon left>mdi-crosshairs-gps</v-icon>
                                            Obter Localização
                                        </v-btn>

                                        <v-card>
                                            <v-card-title
                                                    class="headline grey lighten-2"
                                                    primary-title>
                                                <v-icon style="margin-right: 10px">mdi-crosshairs-gps</v-icon>

                                                Buscar Localização
                                            </v-card-title>

                                            <v-card-text>
                                                Para buscar sua localização é necessário permitir o acesso à
                                                localização.
                                                Deseja Permitir o acesso à localização do dispositivo?
                                            </v-card-text>

                                            <v-divider></v-divider>

                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                        color="primary"
                                                        flat
                                                        @click="cancelLocale()">
                                                    Cancelar
                                                </v-btn>
                                                <v-btn
                                                        color="primary"
                                                        flat
                                                        @click="allowLocale()">
                                                    Permitir
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                    <v-text-field
                                            label="CEP*" v-model="step4.cep"
                                            mask="#####-###"
                                            :error-messages="error(7)"
                                            @input="$v.step4.cep.$touch()"
                                            @blur="$v.step4.cep.$touch()"></v-text-field>
                                    <v-text-field
                                            label="Rua*" v-model="step4.address"
                                            :error-messages="error(8)"
                                            @input="$v.step4.address.$touch()"
                                            @blur="$v.step4.address.$touch()"></v-text-field>
                                    <v-text-field
                                            label="Número*" v-model="step4.number"
                                            :error-messages="error(9)"
                                            @input="$v.step4.number.$touch()"
                                            @blur="$v.step4.number.$touch()"></v-text-field>
                                    <v-text-field
                                            label="Complemento" v-model="step4.complement"></v-text-field>
                                    <v-text-field
                                            label="Bairro*" v-model="step4.neighborhood"
                                            :error-messages="error(10)"
                                            @input="$v.step4.neighborhood.$touch()"
                                            @blur="$v.step4.neighborhood.$touch()"></v-text-field>
                                    <v-text-field
                                            label="Cidade*" v-model="step4.city"
                                            :error-messages="error(11)"
                                            @input="$v.step4.city.$touch()"
                                            @blur="$v.step4.city.$touch()"></v-text-field>
                                    <v-text-field
                                            label="Estado*" v-model="step4.state"
                                            :error-messages="error(12)"
                                            @input="$v.step4.state.$touch()"
                                            @blur="$v.step4.state.$touch()"></v-text-field>
                                    <span style="margin: 10px 0 500px  0"><small>Campos marcados com * são Obrigatórios</small></span>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" @click="prepareToSendLocale()" :disabled="$v.step4.$invalid">Ir para Pagamento</v-btn>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>
                        <v-dialog v-model="dialog3" width="300">
                            <v-card>
                                <v-card-title
                                        class="subheading grey lighten-2"
                                        primary-title>
                                    Para melhorar a sua experiência com o aplicativo, você pode permitir o acesso a:
                                </v-card-title>
                                <v-card-text>
                                    <v-card-text>
                                        <div style="margin-top: -35px">
                                            <v-checkbox label="Fotos e arquivos multimídia"
                                                        v-model="privatePerm.multimedia"
                                                        class="checkbox-perm"></v-checkbox>
                                            <span class="caption">Permite que o aplicativo salve as fotos dos produtos que você visualizou</span>

                                            <v-checkbox label="Identidade" v-model="privatePerm.identity"
                                                        class="checkbox-perm"></v-checkbox>
                                            <span class="caption">Por motivos de segurança, permite a confirmação de sua identidade</span>

                                            <v-checkbox label="Contatos" v-model="privatePerm.contacts"
                                                        class="checkbox-perm"></v-checkbox>
                                            <span class="caption">Permite que o aplicativo salve automaticamente nossos dados de
                                        contato em sua agenda de contatos
                                    </span>

                                            <v-checkbox label="Calendário"
                                                        v-model="privatePerm.calendar"
                                                        class="checkbox-perm"></v-checkbox>
                                            <span class="caption">Permite que o aplicativo registre em seu calendário a data
                                        prevista para a entrega do produto
                                    </span>
                                        </div>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-btn @click="dialog3 = false">Voltar</v-btn>
                                        <v-spacer></v-spacer>
                                        <v-btn class="success" @click="sendPvtPerm()">Continuar</v-btn>
                                    </v-card-actions>
                                </v-card-text>
                            </v-card>
                        </v-dialog>
                    </v-card>
                </v-stepper-content>
            </v-stepper>
        </v-flex>
    </v-layout>
</template>

<script src="./Register.js"></script>



