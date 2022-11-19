const { createApp } = Vue

const app = createApp({
    data(){
        return{
        juguetes: [],
        juguetesFiltrados: [],
        checked: [],
        inputBusqueda:"",
        
        }
    },
    created(){
        fetch("https://apipetshop.herokuapp.com/api/articulos")
        .then( response => response.json())
        .then( data =>{
            this.juguetes = data
            this.juguetesFiltrados = data.response.filter( element => element.tipo === "Juguete")
            this.juguetesFiltradosBusqueda = data
            console.log(this.juguetesFiltrados);
            console.log(data);
        } )
        .catch(err => console.log(err))
        
    },
    methods: {
        buscar(){
            this.juguetesFiltradosBusqueda = this.juguetesFiltrados.filter( juguete=> juguete.nombre.toLowerCase().trim().includes(this.inputBusqueda.toLowerCase().trim()) )
        },
        },
    computed:{
        
    }
    },
)
app.mount('#app')
