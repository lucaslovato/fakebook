export default {
    name: "BasicPerm",
    data() {
        return {
            basicPerm: {
                dialogStatus: false,
                selectedPerm: [],
            },
        }
    },
    methods: {
        openBasicPerm() {
            console.log('Cheguei aqui');
            this.dialogStatus = true;
        }
    },
}