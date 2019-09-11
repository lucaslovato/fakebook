<style scoped>

</style>

<template>
    <v-layout row align-center justify-center>
        <v-dialog v-model="dialog.open" persistent max-width="290">
            <v-card>
                <v-card-title class="headline">{{dialog.title}}</v-card-title>
                <v-card-text class="text-capitalize body-2">{{dialog.text}}</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat @click.native="dialog = false">Cancelar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script src="./BasicDialog.js"></script>

