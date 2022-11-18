const { createApp } = Vue

const app = createApp({
    data() {
        return {
            medicamentos: []
        }
    },
    created() {
        fetch('https://apipetshop.herokuapp.com/api/articulos')
            .then(response => response.json())
            .then(data => {
                this.obtenerMedicamentos(data.response)
            })
            .catch(err => console.log(err))
    },
    methods: {
        obtenerMedicamentos(data) {
            this.medicamentos = data.filter(elemento => elemento.tipo === "Medicamento")
            console.log(this.medicamentos)
        }
    },
    computed: {

    }
})

app.mount('#app')