
let urlapipokemon = `https://pokeapi.co/api/v2/pokemon/?limit=6&offset=0`;
let datosjson="";
let contadorseleccionbatallapokemon1=0;
let contadorseleccionbatallapokemon2=0;
let contadorcheckboxseleccionbatallas=0;
let pokemonseleccionado1 ={}
let pokemonseleccionado2 ={}

const anteriorpaginapokemon=document.querySelector("#anterior-pagina");
const homepaginapokemon=document.querySelector("#home-pagina");
const siguientepaginapokemon=document.querySelector("#siguiente-pagina");
const containerpokemones=document.querySelector(".container-pokemones");
//const checkboxpokemon=document.querySelector("#checkboxpokemon");

siguientepaginapokemon.addEventListener('click',()=>{
  siguientePagina(datosjson.next);
})

homepaginapokemon.addEventListener('click',()=>{
  homaPagina();
})

anteriorpaginapokemon.addEventListener('click',()=>{
  datosjson.previous!=null?anteriorPagina(datosjson.previous):console.log("primera pagina");
})

function crearGetElementById(id)  {
  return  getelementid=document.createElement(id);
}

function jsonpokemones(urlapipokemon)  { 
  fetch(urlapipokemon)
      .then((respuesta)=>respuesta.json())
      .then((datos)=>(datospokemones(datos))) 
}

function datospokemones(datos) {
 
  datos.results.forEach(pokemondatos => {
    fetch(pokemondatos.url)
    .then((respuesta)=>respuesta.json())
    .then((datos)=>(mostrarPokemonesPantallaIzquierda(datos))) 
   });
   datosjson=datos;
}


function mostrarPokemonesPantallaIzquierda(datospokemones)  {
 
  let cardpokemonespantallaizquierda=crearGetElementById("div");
  cardpokemonespantallaizquierda.classList.add("pokemon")
  cardpokemonespantallaizquierda.id="pokemon";

  let containercheckboxpokemon=crearGetElementById("div");
  containercheckboxpokemon.classList.add("container-checkbox-pokemon");
  
  let checkboxpokemon=crearGetElementById("input");
  checkboxpokemon.type="checkbox";
  checkboxpokemon.classList.add("checkboxpokemon");
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
 
  checkboxpokemon.addEventListener ('click',()=>{

    if ((Object.entries(pokemonseleccionado1).length==0)&&(checkboxpokemon.checked==true)) {
      pokemonseleccionado1.name=datospokemones.name;
      pokemonseleccionado1.id=datospokemones.id;
      pokemonseleccionado1.src=imgpokemonpantallaizquierda.src;
      pokemonseleccionado1.hp=datospokemones.stats[0].base_stat;
      pokemonseleccionado1.att=datospokemones.stats[1].base_stat;
      pokemonseleccionado1.checked=checkboxpokemon.checked;

      let imgpokemonseleccion1=document.getElementById('img-seleccion-batalla-pokemon1');
      imgpokemonseleccion1.setAttribute('src',pokemonseleccionado1.src);

      let pseleccionpokemon1=document.getElementById('p-seleccion-pokemon1');
      pseleccionpokemon1.innerHTML="Nombre: "+pokemonseleccionado1.name;
      
    }else{ 
      pokemonseleccionado2.name=datospokemones.name;
      pokemonseleccionado2.id=datospokemones.id;
      pokemonseleccionado2.src=imgpokemonpantallaizquierda.src;
      pokemonseleccionado2.hp=datospokemones.stats[0].base_stat;
      pokemonseleccionado2.att=datospokemones.stats[1].base_stat;
      pokemonseleccionado2.checked=checkboxpokemon.checked;
  
      let imgpokemonseleccion2=document.getElementById('img-seleccion-batalla-pokemon2');
      imgpokemonseleccion2.setAttribute('src',pokemonseleccionado2.src);

      let pseleccionpokemon2=document.getElementById('p-seleccion-pokemon2');
      pseleccionpokemon2.innerHTML="Nombre: "+pokemonseleccionado2.name;
    }    
    })

}

function seleccionpokemonuno(pokemon1) {
  console.log(pokemon1)
}
function siguientePagina(siguienteurl){
  removeimagenes(containerpokemones);
  jsonpokemones(siguienteurl);
}

function homaPagina() {
  removeimagenes(containerpokemones);
  jsonpokemones(urlapipokemon);
}

function anteriorPagina(anteriorurl){
  removeimagenes(containerpokemones);
  jsonpokemones(anteriorurl);
}

function removeimagenes(parent){
    while(parent.firstChild){
      parent.removeChild(parent.firstChild);
    }
}

function comienzoBatallaPokemones() {

  let resultado1=pokemonseleccionado1.hp;
  let resultado2=pokemonseleccionado2.hp;
  console.log(resultado1)
  console.log(resultado2)
  do {
    let ataquepokemon= Math.floor(Math.random()*2);
    console.log(ataquepokemon);
    (ataquepokemon=='0')?(resultado2-=pokemonseleccionado1.att) : (resultado1-=pokemonseleccionado2.att);
  } while ((resultado1>0)&&(resultado2>0));

  (resultado1<=0&&resultado2>0)?resultadobatallapokemon(pokemonseleccionado2): resultadobatallapokemon(pokemonseleccionado1);
}


function resultadobatallapokemon(pokemonganador) {
  console.log(pokemonganador)
  console.log("Ganador"+pokemonganador.name)
  let imgganadorbatalla=document.getElementById('img-ganador');
  imgganadorbatalla.src=pokemonganador.src;

  let nombreganador=document.getElementById('p-ganador');
  nombreganador.innerHTML=pokemonganador.name;

  let botonbatalla=document.getElementById('boton-batalla-empezar');
  botonbatalla.disabled=true;
  
}

function botonBatallaNueva(){
  let botonbatalla=document.getElementById('boton-batalla-empezar');
  botonbatalla.disabled=false;

  let imgganadorbatalla=document.getElementById('img-ganador');
  imgganadorbatalla.setAttribute('src','img/buscarpokemon.png');

  let nombreganador=document.getElementById('p-ganador');
  nombreganador.innerHTML="";
}

jsonpokemones(urlapipokemon);
