<style scoped></style>

<template>
    <div>
        <v-content>
            <v-container fluid fill-height>
                <v-layout justify-center align-center>
                    <v-flex xs12 sm6 md4>
                        <v-card>
                            <v-card-title>
                                <h1>Insira o código do formulário</h1>
                            </v-card-title>

                            <v-card-text>
                                <v-flex sm12>
                                    <v-form @submit.prevent="verifyCode()">
                                        <v-text-field
                                                v-model="code"
                                                :error-messages="codeErrors"
                                                required
                                                @input="$v.code.$touch()"
                                                @blur="$v.code.$touch()"
                                                label="Código"
                                                outline
                                        ></v-text-field>
                                    </v-form>
                                </v-flex>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn class="success" @click="verifyCode()">
                                    Continuar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                        <basic-dialog></basic-dialog>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </div>
</template>
<script src="./Home.js"></script>

