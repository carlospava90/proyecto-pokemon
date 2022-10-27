
let url = `https://pokeapi.co/api/v2/pokemon/?limit=6&offset=0`;
let siguienteurl="";
let anteriorurl="";
const anteriorpaginapokemon=document.querySelector("#anterior-pagina");
const homepaginapokemon=document.querySelector("#home-pagina");
const siguientepaginapokemon=document.querySelector("#siguiente-pagina");
const containerpokemones=document.querySelector(".container-pokemones");

siguientepaginapokemon.addEventListener('click',()=>{
  siguientePagina(siguienteurl);
  })
  anteriorpaginapokemon.addEventListener('click',()=>{
    console.log(anteriorurl)
    anteriorurl!=null?anteriorPagina(anteriorurl):console.log("null");
    })

function crearGetElementById(id)  {
  return  getelementid=document.createElement(id);
}

function jsonpokemones()  { 
  fetch(url)
      .then((respuesta)=>respuesta.json())
      .then((datos)=>(datospokemones(datos))) 
}

function datospokemones(datos) {
  siguienteurl= JSON.stringify(datos.next);
  anteriorurl= JSON.stringify(datos.previous);
 console.log(anteriorurl)
  datos.results.forEach(pokemondatos => {
    fetch(pokemondatos.url)
    .then((respuesta)=>respuesta.json())
    .then((datos)=>(mostrarPokemonesPantallaIzquierda(datos))) 
   });
}



function mostrarPokemonesPantallaIzquierda(datospokemones)  {

  let cardpokemonespantallaizquierda=crearGetElementById("div");
  cardpokemonespantallaizquierda.classList.add("pokemon")
  cardpokemonespantallaizquierda.id="pokemon";

  let containercheckboxpokemon=crearGetElementById("div");
  containercheckboxpokemon.classList.add("container-checkbox-pokemon");
  
  let checkboxpokemon=crearGetElementById("input");
  checkboxpokemon.type="checkbox";
  containercheckboxpokemon.appendChild(checkboxpokemon);

  let containerimgpokemonpantallaizquierda=crearGetElementById("div");
  cardpokemonespantallaizquierda.classList.add("container-img-pokemon-pantalla-izquierda")

  let imgpokemonpantallaizquierda=crearGetElementById("img");
  imgpokemonpantallaizquierda.classList.add("img-pokemon-pantalla-izquierda")
  imgpokemonpantallaizquierda.src=datospokemones.sprites.front_default;
  containerimgpokemonpantallaizquierda.appendChild(imgpokemonpantallaizquierda);
 
  let containerparrafospokemon=crearGetElementById("div");
  containerparrafospokemon.classList.add("container-parrafos-pokemon");
  let nombrepokemon=crearGetElementById("p");
  nombrepokemon.textContent="NOMBRE:"+datospokemones.name;
  let poderpokemon=crearGetElementById("p");
  poderpokemon.textContent="PODER: "+datospokemones.stats[1].base_stat;
  let hppokemon=crearGetElementById("p");
  hppokemon.textContent="VIDA: "+datospokemones.stats[0].base_stat;
  let batallas=crearGetElementById("p");
  batallas.textContent="Batallas Ganadas: ";
  

  containerparrafospokemon.appendChild(nombrepokemon);
  containerparrafospokemon.appendChild(poderpokemon);
  containerparrafospokemon.appendChild(hppokemon);
  containerparrafospokemon.appendChild(batallas);

  cardpokemonespantallaizquierda.appendChild(containercheckboxpokemon);
  cardpokemonespantallaizquierda.appendChild(containerimgpokemonpantallaizquierda);
  cardpokemonespantallaizquierda.appendChild(containerparrafospokemon)
  containerpokemones.appendChild(cardpokemonespantallaizquierda);

}
function siguientePagina(siguienteurl){
  let urlsiguiente=JSON.parse(siguienteurl);
  removeimagenes(containerpokemones);
  fetch(urlsiguiente)
      .then((respuesta)=>respuesta.json())
      .then((datos)=>(datospokemones(datos))) 
}
function anteriorPagina(anteriorurl){
  let urlanterior=JSON.parse(anteriorurl);
  removeimagenes(containerpokemones);
  fetch(urlanterior)
      .then((respuesta)=>respuesta.json())
      .then((datos)=>(datospokemones(datos))) 
}

function removeimagenes(parent){
    while(parent.firstChild){
      parent.removeChild(parent.firstChild);
    }
  }
jsonpokemones();





// previous.addEventListener('click',()=>{
//   if(offset !=1){
// offset -=6;



// next.addEventListener('click',()=>{
//   offset +=6;

//   datospokemones(offset,limit)
//   })

  

