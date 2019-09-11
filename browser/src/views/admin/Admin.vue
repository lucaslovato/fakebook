<style scoped></style>

<template>
    <v-container fluid grid-list-lg>
        <v-layout column>
            <v-flex xs12>
                <div>
                    <v-card>
                        <v-card-title>
                            <div>
                                <h1 class="display-1">Área do Administrador</h1>
                                <div class="body-2">Clique nos botões abaixo para realizar uma ação</div>
                            </div>
                        </v-card-title>
                        <v-card-text>
                            <v-layout align-center justify-center fill-height :row="$vuetify.breakpoint.mdAndUp" :column="$vuetify.breakpoint.smAndDown">

                                <v-flex xs12>
                                    <v-card color="blue-grey darken-2" class="white--text">
                                        <v-card-title primary-title>
                                            <div class="headline">Gerar Códigos</div>
                                            <div>
                                                Clique no botão abaixo para gerar mais códigos que autenticam usuários para a pesquisa
                                            </div>
                                        </v-card-title>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn @click="dialogCriarCodigo = true">
                                                Gerar
                                                <v-icon dark right> ballot</v-icon>
                                            </v-btn>
                                            <v-spacer></v-spacer>
                                        </v-card-actions>
                                    </v-card>
                                </v-flex>

                                <v-flex xs12>
                                    <v-card color="blue-grey darken-2" class="white--text">
                                        <v-card-title primary-title>
                                            <div class="headline">Códigos Não Usados</div>
                                            <div>
                                                Clique no botão abaixo para fazer o download dos códigos que foram
                                                criados e não foram usados ainda
                                            </div>
                                        </v-card-title>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn @click="getFreeCodes">
                                                Fazer Download
                                                <v-icon right dark>mdi-download</v-icon>
                                            </v-btn>
                                            <v-spacer></v-spacer>
                                        </v-card-actions>
                                    </v-card>
                                </v-flex>


                                <v-flex xs12>
                                    <v-card color="blue-grey darken-2" class="white--text">
                                        <v-card-title primary-title>
                                            <div class="headline">Respostas</div>
                                            <div>
                                                Clique para fazer download das respostas que já estão no Sistema
                                            </div>
                                        </v-card-title>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn @click="getFinExcel()">
                                                Fazer Download
                                                <v-icon right dark>mdi-download</v-icon>
                                            </v-btn>
                                            <v-spacer></v-spacer>
                                        </v-card-actions>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                    </v-card>
                    <v-dialog v-model="dialogCriarCodigo" max-width="350">
                        <v-card>
                            <v-card-title>
                                <div>
                                <div>
                                <h1 class="headline">Gerar Códigos</h1>
                                </div>
                                    <p class="subheading">Insira a quantidade de códigos a ser gerada</p>
                                </div>
                            </v-card-title>
                            <v-card-text>
                                <v-text-field label="Quantidade" v-model='codeAmount'
                                            @keyup.enter="getCodes()"></v-text-field>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn flat @click="getCodes()">Concluir</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script src="./Admin.js"></script>
