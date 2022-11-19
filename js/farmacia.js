const { createApp } = Vue

const app = createApp({
    data() {
        return {
            medicamentos: [],
            medicamentosFiltrados: [],
            textoInput: '',
            seleccionada: ''
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
            this.medicamentos = this.medicamentos.sort((a, b) => a.nombre.localeCompare(b.nombre))
            this.medicamentosFiltrados = this.medicamentos
            console.log(this.medicamentosFiltrados)
        },
        filtrarMedicamentos() {
            console.log(this.textoInput)
            if (this.textoInput) {
                this.medicamentosFiltrados = this.medicamentos.filter(medicamento => {
                    return medicamento.nombre.toLowerCase().trim().includes(this.textoInput.toLowerCase().trim())
                })
                /* this.medicamentosFiltrados = this.medicamentos.filter(medicamento => medicamento.stock > 5) */
            } else {
                this.medicamentosFiltrados = this.medicamentos
            }
        }
    },
    computed: {
        filtrar() {
            let ordenarPor;
            switch (this.seleccionada) {
                case 'A-Z':
                    console.log('holaa')
                    this.medicamentosFiltrados = this.medicamentosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre))
                    break;
                case 'Mayor precio':
                    this.medicamentosFiltrados = this.medicamentosFiltrados.sort((a, b) => b.precio - a.precio)
                    break;
                case 'Menor precio':
                    this.medicamentosFiltrados = this.medicamentosFiltrados.sort((a, b) => a.precio - b.precio)
                    break;
                default:
                    this.medicamentosFiltrados = this.medicamentosFiltrados
            }
            
        }
    }
})

app.mount('#app')