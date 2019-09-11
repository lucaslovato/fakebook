<style scoped>
    .button-continue{
        background: #1da1f2 !important;
        color: #fff;
    }
</style>

<template>
    <v-layout column align-center>
        <v-flex xs12>
            <v-dialog v-model="dialog.twitter" persistent scrollable width="400">
                <v-card>
                    <v-toolbar>
                        <img src="../../../../assets/twitter-logo.png" style="max-height: 48px">
                    </v-toolbar>
                    <v-card-text>
                        <h1 class="headline font-weight-bold">Autorizar Loja a usar sua conta?</h1>
                        <div style="margin: 20px 0 20px 0">
                            <h2 class="title font-weight-bold" style="margin-bottom: 10px">Esta aplicação poderá:</h2>
                            <ul>
                                <li>Ler Tweets da sua timeline</li>
                                <li>Ver quem você segue</li>
                                <li>Ver seu endereço de e-mail</li>
                            </ul>
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn outline round  @click="back()" style=" border-color: #1da1f2; color: #1da1f2">
                            Voltar
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn round flat class="button-continue" color="#1da1f2" @click="send_ans">
                            Continuar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!--</v-flex>-->
            <!--</v-dialog>-->
        </v-flex>
    </v-layout>
</template>

<script src="./TwitterDialog.js"></script>

