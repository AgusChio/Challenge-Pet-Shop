const { createApp } = Vue

const app = createApp({
    data() {
        return {
            juguetes: [],
            juguetesFiltrados: [],
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
    },
    methods: {
        obtenerMedicamentos(data) {
            this.juguetes = data.filter(elemento => elemento.tipo === "Juguete")
            this.juguetes = this.juguetes.sort((a, b) => a.nombre.localeCompare(b.nombre))
            this.juguetesFiltrados = this.juguetes
            console.log(this.juguetesFiltrados)
        },
        filtrarjuguetes() {
            console.log(this.textoInput)
            if (this.textoInput) {
                this.juguetesFiltrados = this.juguetes.filter(Juguete => {
                    return Juguete.nombre.toLowerCase().trim().includes(this.textoInput.toLowerCase().trim())
                })
                /* this.juguetesFiltrados = this.juguetes.filter(Juguete => Juguete.stock > 5) */
            } else {
                this.juguetesFiltrados = this.juguetes
            }
        },
        agregarAlCarrito(Juguete) {
            if (this.carrito.includes(Juguete)) {
                const index = this.carrito.findIndex(med => med._id === Juguete._id)
                console.log(index)
                this.carrito[index].unidades += 1
            } else {
                Juguete.unidades = 1
                this.carrito.push(Juguete)
            }
            console.log(this.carrito)
        },
        quitarUnidad(Juguete) {
            const index = this.carrito.findIndex(med => med._id === Juguete._id)
            this.carrito[index].unidades -= 1
            if (!this.carrito[index].unidades) {
                this.carrito.splice(index,1)
            }
        }
    },
    computed: {
        filtrar() {
            let ordenarPor;
            switch (this.seleccionada) {
                case 'A-Z':
                    console.log('holaa')
                    this.juguetesFiltrados = this.juguetesFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre))
                    break;
                case 'Mayor precio':
                    this.juguetesFiltrados = this.juguetesFiltrados.sort((a, b) => b.precio - a.precio)
                    break;
                case 'Menor precio':
                    this.juguetesFiltrados = this.juguetesFiltrados.sort((a, b) => a.precio - b.precio)
                    break;
                default:
                    this.juguetesFiltrados = this.juguetesFiltrados
            }
            
        }
    }
})

app.mount('#app')
