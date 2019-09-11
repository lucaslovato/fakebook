<style scoped>
    .product-img {
        width: auto;
        max-width: 80px;
        height: auto;
        max-height: 80px;
    }
</style>

<template>
    <v-layout column>
        <v-flex x12>
            <v-card>
                <v-toolbar class="elevation-0" color="blue">
                    <h1 class="headline white--text">Resumo da compra</h1>
                </v-toolbar>
                <v-container>
                    <v-layout row align-center>
                        <v-flex xs3>
                            <img :src="state.myCart.image" class="product-img">
                        </v-flex>
                        <v-flex xs9>
                            <v-card-text>
                                <h1 class="headline font-weight-regular">{{state.myCart.productName}}</h1>
                                <p class="body-1 font-weight-bold">Quantidade: {{state.myCart.amount}}</p>
                                <p class="subheading font-weight-medium">Total da compra: R${{state.myCart.price.toFixed(2)}}</p>
                            </v-card-text>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-toolbar class="elevation-0" color="blue">
                    <h1 class="headline white--text">Métodos de pagamento</h1>
                </v-toolbar>
                <v-card-text>
                    <v-layout column wrap align-center>
                        <v-flex xs12>
                            <v-dialog v-model="paymentOptions.ticket" persistent width="420">
                                <v-btn large color="teal lighten-5" style="width: 247px" slot="activator">
                                    <v-icon x-large>mdi-barcode</v-icon>
                                    Boleto
                                </v-btn>
                                <v-card>
                                    <v-card-title>
                                        <h1>Método de Pagamento: Boleto</h1>
                                    </v-card-title>
                                    <v-card-text>
                                        <p>Boleto Gerado com Sucesso!</p>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn class="success" @click="finalizePayment('ticket')">
                                            Finalizar
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-flex>
                        <v-flex xs12>
                            <v-dialog v-model="paymentOptions.credit" persistent width="500">
                                <v-btn large color="teal lighten-5" style="width: 247px" slot="activator">
                                    <v-icon color="blue" x-large>mdi-credit-card</v-icon>
                                    Cartão de Crédito
                                </v-btn>
                                <v-card>
                                    <v-card-title>
                                        <h1>Método de Pagamento: Cartão</h1>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-container grid-list-md text-xs-left fluid>
                                            <v-layout column wrap>
                                                <v-flex xs12>
                                                    <v-text-field
                                                            label="Número do Cartão"
                                                            placeholder=""
                                                            outline></v-text-field>
                                                </v-flex>

                                                <v-flex xs12>
                                                    <v-text-field
                                                            label="Nome do titular (como está gravado no Cartão)"
                                                            placeholder=""
                                                            outline></v-text-field>
                                                </v-flex>
                                                <v-flex xs12>
                                                    <h3>Data de Validade</h3>
                                                    <v-layout row wrap>
                                                        <v-flex xs6>
                                                            <v-combobox
                                                                    :items="months"
                                                                    label="Mês"
                                                            ></v-combobox>
                                                        </v-flex>
                                                        <v-flex xs6>
                                                            <v-combobox
                                                                    :items="years"
                                                                    label="Ano"
                                                            ></v-combobox>
                                                        </v-flex>
                                                    </v-layout>
                                                </v-flex>
                                                <v-flex xs12>
                                                    <v-text-field
                                                            label="CVV"
                                                            placeholder=""
                                                            append-outer-icon="mdi-credit-card"
                                                            outline></v-text-field>
                                                </v-flex>
                                                <v-flex xs12>
                                                    <v-checkbox label="Desejo salvar meus dados para compras futuras"
                                                                v-model="checkboxCredit" style="margin: -15px 0-40px 0"></v-checkbox>
                                                </v-flex>
                                            </v-layout>
                                        </v-container>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn @click="goBack('credit')">
                                            Voltar
                                        </v-btn>
                                        <v-btn class="success" @click="finalizePayment('credit')">
                                            Finalizar
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-flex>
                        <v-flex xs12>
                            <v-dialog v-model="paymentOptions.debit" persistent width="420">
                                <v-btn large color="teal lighten-5" style="width: 247px" slot="activator">
                                    <v-icon color="red" x-large>mdi-credit-card</v-icon>
                                    Cartão de Débito
                                </v-btn>
                                <v-card>
                                    <v-card-title>
                                        <h1>Método de Pagamento: Débito</h1>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-container grid-list-md text-xs-left fluid>
                                            <v-layout row wrap>
                                                <v-flex xs12>
                                                    <v-text-field
                                                            label="Número do Cartão"
                                                            placeholder=""
                                                            outline></v-text-field>
                                                </v-flex>

                                                <v-flex xs12>
                                                    <v-text-field
                                                            label="Nome do titular (como está gravado no Cartão)"
                                                            placeholder=""
                                                            outline></v-text-field>
                                                </v-flex>
                                                <v-flex xs12>
                                                    <h3>Data de Validade</h3>
                                                    <v-layout row wrap>
                                                        <v-flex xs6>
                                                            <v-combobox
                                                                    :items="months"
                                                                    label="Mês"
                                                            ></v-combobox>
                                                        </v-flex>
                                                        <v-flex xs6>
                                                            <v-combobox
                                                                    :items="years"
                                                                    label="Ano"
                                                            ></v-combobox>
                                                        </v-flex>
                                                    </v-layout>
                                                </v-flex>

                                                <v-flex xs12>
                                                    <v-text-field
                                                            label="CVV"
                                                            placeholder=""
                                                            append-outer-icon="mdi-credit-card"
                                                            outline></v-text-field>
                                                </v-flex>
                                                <v-checkbox label="Desejo salvar meus dados para compras futuras"
                                                            v-model="checkboxDebit" style="margin: -15px 0-40px 0"></v-checkbox>
                                            </v-layout>
                                        </v-container>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn @click="goBack('debit')">
                                            Voltar
                                        </v-btn>
                                        <v-btn class="success" @click="finalizePayment('debit')">
                                            Finalizar
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-flex>
                        <v-flex xs12>
                            <v-dialog v-model="paymentOptions.payPal" persistent width="420">
                                <v-btn large color="teal lighten-5" style="width: 247px" slot="activator">
                                    <img style="width: 137px" src="./../../assets/paypal-logo.png"/>
                                </v-btn>
                                <v-card>
                                    <v-toolbar>
                                        <img src="./../../assets/paypal-logo.png" style="width: 120px"/>
                                    </v-toolbar>
                                    <v-card-text>
                                        <v-container grid-list-md text-xs-left fluid>
                                            <v-layout row wrap>
                                                <v-flex xs12>
                                                    <v-text-field
                                                            label="Usuário"
                                                            placeholder=""
                                                            outline></v-text-field>
                                                    <v-text-field
                                                            label="Senha"
                                                            :append-icon="passwordPayPal ? 'visibility_off' : 'visibility'"
                                                            :type="passwordPayPal ? 'text' : 'password'"
                                                            @click:append=" passwordPayPal = !passwordPayPal"
                                                            placeholder=""
                                                            outline></v-text-field>
                                                    <v-checkbox
                                                            label="Armazenar meus dados de pagamento para compras futuras"
                                                            v-model="checkboxPayPal"
                                                    ></v-checkbox>
                                                </v-flex>
                                            </v-layout>
                                        </v-container>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn @click="goBack('payPal')">
                                            Voltar
                                        </v-btn>
                                        <v-btn class="success" @click="finalizePayment('payPal')">
                                            Finalizar
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-flex>
                        <v-flex xs12>
                            <v-dialog v-model="paymentOptions.pagSeguro" persistent width="420">
                                <v-btn large color="teal lighten-5" style="width: 247px" slot="activator">
                                    <img style="width: 137px" src="./../../assets/pagseguro-logo.png"/>
                                </v-btn>
                                <v-card>
                                    <v-toolbar>
                                        <img src="./../../assets/pagseguro-logo.png" style="width: 120px"/>
                                    </v-toolbar>
                                    <v-card-text>
                                        <v-container grid-list-md text-xs-left fluid>
                                            <v-layout row wrap>
                                                <v-flex xs12>
                                                    <v-text-field
                                                            label="Usuário"
                                                            placeholder=""
                                                            outline></v-text-field>
                                                    <v-text-field
                                                            label="Senha"
                                                            :append-icon="passwordPagSeguro ? 'visibility_off' : 'visibility'"
                                                            :type="passwordPagSeguro ? 'text' : 'password'"
                                                            @click:append=" passwordPagSeguro = !passwordPagSeguro"
                                                            outline></v-text-field>
                                                    <v-checkbox
                                                            label="Armazenar meus dados de pagamento para compras futuras"
                                                            v-model="checkboxPagSeguro"></v-checkbox>
                                                </v-flex>
                                            </v-layout>
                                        </v-container>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn @click="goBack('pagSeguro')">
                                            Voltar
                                        </v-btn>
                                        <v-btn class="success" @click="finalizePayment('pagSeguro')">
                                            Finalizar
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-flex>
                        <v-flex xs12>
                            <v-dialog v-model="paymentOptions.mercadoPago" persistent width="420">
                                <v-btn large color="teal lighten-5" style="width: 247px" slot="activator">
                                    <img src="./../../assets/mercadopago_logo.png"/>
                                </v-btn>
                                <v-card>
                                    <v-toolbar>
                                        <img src="./../../assets/mercadopago_logo.png" style="width: 120px"/>
                                    </v-toolbar>
                                    <v-card-text>
                                        <v-container grid-list-md text-xs-left fluid>
                                            <v-layout row wrap>
                                                <v-flex xs12>
                                                    <v-text-field
                                                            label="Usuário"
                                                            placeholder=""
                                                            outline></v-text-field>
                                                    <v-text-field
                                                            label="Senha"
                                                            :append-icon="passwordMercadoPago ? 'visibility_off' : 'visibility'"
                                                            :type="passwordMercadoPago ? 'text' : 'password'"
                                                            @click:append=" passwordMercadoPago = !passwordMercadoPago"
                                                            placeholder=""
                                                            outline></v-text-field>
                                                    <v-checkbox
                                                            label="Armazenar meus dados de pagamento para compras futuras"
                                                            v-model="checkboxMercadoPago"
                                                    ></v-checkbox>
                                                </v-flex>
                                            </v-layout>
                                        </v-container>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn @click="goBack('mercadoPago')">
                                            Voltar
                                        </v-btn>
                                        <v-btn class="success" @click="finalizePayment('mercadoPago')">
                                            Finalizar
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script src="./Payment.js"></script>

