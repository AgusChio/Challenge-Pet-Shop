const { createApp } = Vue;

createApp({
  data() {
    return {
      productos: [], //declara el tipo de dato en este caso array
    };
  },
  created() {
    fetch("https://apipetshop.herokuapp.com/api/articulos")
      .then((response) => response.json()) //response es un parametro
      .then((json) => {
        console.log(json);
        this.productos = json.response;
        console.log(this.productos);
      })
      .catch((error) => console.log(error));
  },
}).mount("#app");

