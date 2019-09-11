<template>
    <v-dialog v-model="basicPerm.dialogStatus" max-width="300px">
        <v-card>
            <v-card-title>
                <div>
                    <h1 class="headline">Permissões Básicas</h1>
                    <div class="body-1">Calcarias crescere in fortis tolosa!</div>
                </div>
            </v-card-title>
            <v-card-text>
                <v-checkbox class="basics-perms" v-model="basicPerm.locale" label="Localização"></v-checkbox>
                <v-checkbox class="basics-perms" v-model="basicPerm.microphone" label="Microfone"></v-checkbox>
                <v-checkbox class="basics-perms" v-model="basicPerm.camera" label="Câmera"></v-checkbox>
                <v-checkbox class="basics-perms" v-model="basicPerm.navHistory" label="Histórico de Navegação"></v-checkbox>
                <v-checkbox class="basics-perms" v-model="basicPerm.dispHistory" label="Histórico do Dispositivo"></v-checkbox>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="success" @click="basicPermSelected()">Continuar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script src="./BasicPerm.js"></script>

<style scoped>

</style>