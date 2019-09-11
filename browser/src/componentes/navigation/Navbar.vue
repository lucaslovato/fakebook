<template>
    <div>
        <!--Toolbar do admin-->
        <v-toolbar color="primary" dark fixed app v-if="state.toolbar">
            <v-spacer></v-spacer>
            <v-toolbar-items v-if="state.userInfo !== 'participant'">
                <v-btn flat slot="activator" @click="dialogStatus = true" v-if="state.userInfo == null">Login</v-btn>
                <v-btn flat @click="logout()" v-if="state.userInfo != null">Sair</v-btn>
            </v-toolbar-items>
            <div class="text-xs-center" v-if="state.userInfo === 'participant'">
                <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        :nudge-width="300"
                        absolute
                        bottom
                        left
                        offset-x
                        transition="slide-y-transition"
                        v-if="state.userInfo === 'participant'">
                    <v-btn
                            slot="activator"
                            color="primary"
                            icon>
                        <v-badge left color="red">
                            <span slot="badge" v-if="state.myCart.amount > 0">{{state.myCart.amount}}</span>
                            <v-icon>shopping_cart</v-icon>
                        </v-badge>
                    </v-btn>

                    <v-card>
                        <v-card-title>
                            <h1 class="title font-weight-regular">Meu Carrinho</h1>
                        </v-card-title>

                        <v-divider></v-divider>

                        <v-list v-if="state.myCart.amount > 0">
                            <v-list-tile>
                                <v-list-tile-avatar><img :src="state.myCart.image"/></v-list-tile-avatar>
                                <v-list-tile-title>{{state.myCart.productName}}</v-list-tile-title>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-sub-title>Quantidade: {{state.myCart.amount}}</v-list-tile-sub-title>
                            </v-list-tile>
                        </v-list>
                        <v-card-text v-if="state.myCart.amount === 0">Seu carrinho ainda está vazio</v-card-text>


                        <v-card-actions v-if="state.myCart.amount > 0">
                            <v-spacer></v-spacer>
                            <v-btn class="success" @click="goToRegister()">Finalizar Compra</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-menu>
            </div>

        </v-toolbar>

        <!--Dialog para o login-->
        <v-dialog v-model="dialogStatus" max-width="300px">
            <v-card>
                <v-card-title primary-title="">
                    <div>
                        <h1 class="headline">Login</h1>
                        <div class="body-1">Insira e-mail e senha para logar no sistema</div>
                    </div>
                </v-card-title>

                <v-card-text>
                    <!--Campo para E-mail-->
                    <v-text-field label="E-mail"
                                  v-model="user.email"></v-text-field>
                    <!--Campo para Senha-->
                    <v-text-field label="Senha"
                                  :append-icon="dialogPasswordShow ? 'visibility_off' : 'visibility'"
                                  @click:append="dialogPasswordShow = !dialogPasswordShow"
                                  v-model="user.password"
                                  :type="dialogPasswordShow ? 'text' : 'password'"
                                  @keyup.enter="login()">
                    </v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="login()" class="primary">Login</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script src="./Navbar.js"></script>

<style scoped>

</style>