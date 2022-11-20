const { createApp } = Vue

const app = createApp({
    data() {
        return {
            medicamentos: [],
            medicamentosFiltrados: [],
            textoInput: '',
            seleccionada: '',
            carrito: []
        }
    },
    created() {
        fetch('https://apipetshop.herokuapp.com/api/articulos')
            .then(response => response.json())
            .then(data => {
                this.obtenerMedicamentos(data.response)
            })
            .catch(err => console.log(err))
        this.carrito = JSON.parse(localStorage.getItem('carrito'))
        if (!this.carrito) {
            this.carrito = []
        }
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
        },
        agregarAlCarrito(medicamento) {
            if (this.carrito.includes(medicamento)) {
                const index = this.carrito.findIndex(med => med._id === medicamento._id)
                console.log(index)
                this.carrito[index].unidades += 1
            } else {
                medicamento.unidades = 1
                this.carrito.push(medicamento)
            }
            localStorage.setItem('carrito', JSON.stringify(this.carrito))
        },
        quitarUnidad(medicamento) {
            const index = this.carrito.findIndex(med => med._id === medicamento._id)
            this.carrito[index].unidades -= 1
            if (!this.carrito[index].unidades) {
                this.carrito.splice(index,1)
            }
            localStorage.setItem('carrito', JSON.stringify(this.carrito))
        },
        quitarElemento(medicamento) {
            const index = this.carrito.findIndex(med => med._id === medicamento._id)
            this.carrito.splice(index, 1)
            localStorage.setItem('carrito', JSON.stringify(this.carrito))
        }
    },
    computed: {
        filtrar() {
            let ordenarPor;
            switch (this.seleccionada) {
                case 'A-Z':
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