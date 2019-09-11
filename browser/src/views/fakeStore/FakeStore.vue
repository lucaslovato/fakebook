<style scoped>
    .productCaption {
        margin-left: 30px;
    }

    .checkbox-perm {
        margin: 15px 0 -20px 0
    }
</style>

<template>
    <v-container fluid grid-list-lg>
        <v-layout row>
            <v-flex x12>
                <v-layout align-center justify-center fill-height>
                    <v-card style="width: auto; max-width:1100px">
                        <v-layout column align-center justify-center>
                            <v-dialog v-model="dialog" persistent max-width="330">
                                <v-card>
                                    <v-card-title class="headline primary white--text font-weight-light" primary-title>
                                        Este aplicativo solicita acesso aos dados a seguir
                                    </v-card-title>
                                    <v-card-title class="subheading">Desejo permitir acesso a:</v-card-title>
                                    <v-card-text style="margin-top: -35px">
                                        <v-checkbox label="Localização" v-model="basicPerm.locale"
                                                    class="checkbox-perm"></v-checkbox>
                                        <v-checkbox label="Microfone" v-model="basicPerm.microphone"
                                                    class="checkbox-perm"></v-checkbox>
                                        <v-checkbox label="Câmera" v-model="basicPerm.camera"
                                                    class="checkbox-perm"></v-checkbox>
                                        <v-checkbox label="Histórico de Navegação"
                                                    v-model="basicPerm.navHistory" class="checkbox-perm"></v-checkbox>
                                        <v-checkbox label="Histórico de Dispositivo"
                                                    v-model="basicPerm.dispHistory" class="checkbox-perm"></v-checkbox>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="green darken-1" flat @click.native="send_ans">Continuar</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>

                            <v-flex xs6>
                                <v-carousel hide-delimiters light
                                            prev-icon="mdi-arrow-left-drop-circle"
                                            next-icon="mdi-arrow-right-drop-circle"
                                            style="width: 310px; height: 250px">
                                    <v-carousel-item v-for="image in products[selected].images">
                                        <v-layout align-center justify-center>
                                            <img :src="image"
                                                 style="width: auto; max-width: 250px; height: auto; max-height: 250px">
                                        </v-layout>
                                    </v-carousel-item>
                                </v-carousel>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-card-title>
                                    <h1 class="title">{{products[selected].title}}</h1>
                                </v-card-title>
                                <v-card-text>
                                    <v-layout column align-center justify-center>
                                        <v-flex xs12>
                                            <p class="font-weight-thin display-1" style="margin: -15px 0 -1px 0">R${{products[selected].price.toFixed(2)}}</p>
                                        </v-flex>
                                        <v-flex xs12>
                                            <p class="title font-weight-light" style="margin-bottom: 5px">Cor:</p>
                                            <v-select solo :items="products" item-text="color"
                                                      item-value="index" v-model="selected"></v-select>
                                            <p class="title font-weight-light" style="margin: -10px 0 5px 0">Tamanho:</p>
                                            <v-select solo label="Escolha" :items="sizes" item-text="sizes"
                                                      v-model="selectedSize"></v-select>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
                                <v-card-actions style="margin-top: -30px">
                                    <v-layout column align-center justify-center fill-height>
                                        <v-flex x12>
                                            <v-btn class="primary" @click="addToCart()">
                                                Adicionar ao carrinho
                                                <v-icon right>add_shopping_cart</v-icon>
                                            </v-btn>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-fab-transition>
                                                <v-btn class="success" @click="finalizePurchase()"
                                                       v-if="state.myCart.amount > 0" style="margin-bottom: 10px">
                                                    Finalizar Compra
                                                    <v-icon right>shopping_cart</v-icon>
                                                </v-btn>
                                            </v-fab-transition>
                                        </v-flex>
                                    </v-layout>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script src="./FakeStore.js"></script>


