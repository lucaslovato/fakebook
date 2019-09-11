<style scoped>
    .pageheader {
        color: #fff;
        background: #4267b2;
    }

    .cart-icon {
        margin-top: 30px;
        margin-bottom: 30px;
        height: 68px;
        width: 68px;
        border: 2px solid gray;
        position: relative;
        left: 40%;
        border-radius: 15px;
    }
</style>

<template>
    <v-layout column align-center>
        <v-flex xs12>
            <v-dialog v-model="dialog.facebook" persistent scrollable width="400">
                <v-card>
                    <v-toolbar class="pageheader">
                        <img src="../../../../assets/facebook-logo.png">
                        <h2 class="subheading font-weight-regular" style="margin-left: 5px">Facebook</h2>

                    </v-toolbar>

                    <div class="cart-icon">
                        <v-layout column align-center>
                            <v-flex xs12>
                                <v-icon x-large style="padding-top: 13px">mdi-cart</v-icon>
                            </v-flex>
                        </v-layout>

                    </div>

                    <div class="text-xs-center" style="margin-bottom: 30px; padding: 0 15px 0 15px">
                        <span class="font-weight-bold">Loja</span> receberá: suas permissões para e-mail, nome completo,
                        data de nascimento, foto de perfil, e todas as informações abertas.
                        <v-dialog v-model="dialogEdit">
                            <a slot="activator">Editar isso</a>
                            <v-card>
                                lorem ipsum
                                <v-flex xs12>

                                    <v-btn class="font-weight-bold text-capitalize"
                                           style="background: #4267b2; color: #ffffff" small @click="dialogEdit = false">Continuar

                                    </v-btn>
                                </v-flex>


                            </v-card>

                        </v-dialog>
                    </div>
                    <v-layout column align-center>
                        <v-flex xs12>

                            <v-btn class="font-weight-bold" style="background: #4267b2; color: #ffffff" small
                                   @click="updateSocialPerm()">C<span
                                    class="text-lowercase">ontinuar para a Loja</span></v-btn>
                        </v-flex>
                        <v-flex xs12>
                            <v-btn class="font-weight-bold text-capitalize"
                                   style="background: #f6f7f9; color: #4b4f56" small @click="back()">Cancelar
                            </v-btn>
                        </v-flex>
                        <div class="caption" style="margin-top: 10px; margin-bottom: 10px">
                            <div class="">Isso não
                                permite que o aplicativo publique no Facebook
                            </div>
                        </div>
                    </v-layout>
                </v-card>
            </v-dialog>
            <!--</v-flex>-->
            <!--</v-dialog>-->
        </v-flex>
    </v-layout>
</template>

<script src="./FacebookDialog.js"></script>

