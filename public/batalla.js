
let urlapipokemon = `https://pokeapi.co/api/v2/pokemon/?limit=6&offset=0`;
let datosjson="";
let contadorseleccionbatallapokemon1=0;
let contadorseleccionbatallapokemon2=0;
let contadorcheckboxseleccionbatallas=0;
let ganadores={}
let contenidoganadores=[]
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

function creargetElementById(id)  {
  return  getelementid=document.getElementById(id);
}
function crearCreateElement(id,clase)  {
  createelement=document.createElement(id);
  createelement.classList.add(clase);
  return createelement;
}

function jsonpokemones(urlapipokemon)  { 
  fetch(urlapipokemon)
      .then((respuesta)=>respuesta.json())
      .then((datos)=>(datospokemones(datos,urlapipokemon))) 
}

function datospokemones(datos,urlapipokemon) {
  datos.results.forEach(pokemondatos => {
    fetch(pokemondatos.url)
    .then((respuesta)=>respuesta.json())
    .then((datos)=>(mostrarPokemonesPantallaIzquierda(datos,urlapipokemon))) 
   });
   datosjson=datos;
}


function mostrarPokemonesPantallaIzquierda(datospokemones,urlapipokemon)  {

  let ganados=0;
  contenidoganadores.forEach(element => {
    if(element==datospokemones.name)  {
      ganados+=1;
    }
  });
  datospokemones.ganados=ganados;
  // ganadores.id==datospokemones.id?console.log("igual"):console.log("no igual");

  let cardpokemonespantallaizquierda=crearCreateElement("div","pokemon");
  cardpokemonespantallaizquierda.id="pokemon";

  let containercheckboxpokemon=crearCreateElement("div","container-checkbox-pokemon");
  
  let checkboxpokemon=crearCreateElement("input","checkboxpokemon");
  checkboxpokemon.type="checkbox";
  (pokemonseleccionado1.name==datospokemones.name)&&(pokemonseleccionado1.checked==true)?checkboxpokemon.checked=true:checkboxpokemon.checked=false;
  (pokemonseleccionado2.name==datospokemones.name)&&(pokemonseleccionado2.checked==true)?checkboxpokemon.checked=true:checkboxpokemon.checked=false;
  containercheckboxpokemon.appendChild(checkboxpokemon);

  let containerimgpokemonpantallaizquierda=crearCreateElement("div","container-img-pokemon-pantalla-izquierda");

  let imgpokemonpantallaizquierda=crearCreateElement("img","img-pokemon-pantalla-izquierda");
  imgpokemonpantallaizquierda.src=datospokemones.sprites.front_default;
  containerimgpokemonpantallaizquierda.appendChild(imgpokemonpantallaizquierda);
 
  let containerparrafospokemon=crearCreateElement("div","container-parrafos-pokemon");
  let nombrepokemon=crearCreateElement("p","p");
  nombrepokemon.textContent="NOMBRE:"+datospokemones.name;
  let poderpokemon=crearCreateElement("p","p");
  poderpokemon.textContent="PODER: "+datospokemones.stats[1].base_stat;
  let hppokemon=crearCreateElement("p","p");
  hppokemon.textContent="VIDA: "+datospokemones.stats[0].base_stat;
  let batallas=crearCreateElement("p","p");
  batallas.textContent="Batallas Ganadas: "+datospokemones.ganados;
  

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
      pokemonseleccionado1=pokemonSeleccionado(datospokemones,checkboxpokemon.checked,urlapipokemon);

      let imgpokemonseleccion1=creargetElementById('img-seleccion-batalla-pokemon1');
       imgpokemonseleccion1.setAttribute('src',pokemonseleccionado1.src);

      let pseleccionpokemon1=creargetElementById('p-seleccion-pokemon1');
      pseleccionpokemon1.innerHTML="Nombre: "+pokemonseleccionado1.name;

      
    }else{ 
      pokemonseleccionado2=pokemonSeleccionado(datospokemones,checkboxpokemon.checked,urlapipokemon);
      
      let imgpokemonseleccion2=creargetElementById('img-seleccion-batalla-pokemon2');
      imgpokemonseleccion2.setAttribute('src',pokemonseleccionado2.src);

      let pseleccionpokemon2=creargetElementById('p-seleccion-pokemon2');
      pseleccionpokemon2.innerHTML="Nombre: "+pokemonseleccionado2.name;
    }  
    })
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

function pokemonSeleccionado(datospokemon,checkboxpokemon,urlapipokemon){
  let pokemonseleccionado={};
  pokemonseleccionado.name=datospokemon.name;
  pokemonseleccionado.id=datospokemon.id;
  pokemonseleccionado.src=datospokemon.sprites.front_default;
  pokemonseleccionado.hp=datospokemon.stats[0].base_stat;
  pokemonseleccionado.att=datospokemon.stats[1].base_stat;
  pokemonseleccionado.checked=checkboxpokemon;
  pokemonseleccionado.url=urlapipokemon;
  return pokemonseleccionado;
}

function removeimagenes(parent){
    while(parent.firstChild){
      parent.removeChild(parent.firstChild);
    }
}

function comienzoBatallaPokemones() {

  if((Object.entries(pokemonseleccionado1).length!=0)&&(Object.entries(pokemonseleccionado2).length!=0)){
  let resultado1=pokemonseleccionado1.hp;
  let resultado2=pokemonseleccionado2.hp;
  do {
    let ataquepokemon= Math.floor(Math.random()*2);
    (ataquepokemon=='0')?(resultado2-=pokemonseleccionado1.att) : (resultado1-=pokemonseleccionado2.att);
  } while ((resultado1>0)&&(resultado2>0));
  (resultado1<=0&&resultado2>0)?resultadobatallapokemon(pokemonseleccionado2): resultadobatallapokemon(pokemonseleccionado1);
}else{
  window.alert("seleccione los dos pokemones para la batalla")
}

}


function resultadobatallapokemon(pokemonganador) {

  let botonbatallanueva=creargetElementById('boton-batalla-nueva');
  botonbatallanueva.disabled=false;

  let imgganadorbatalla=creargetElementById('img-ganador');
  imgganadorbatalla.src=pokemonganador.src;

  let nombreganador=creargetElementById('p-ganador');
  nombreganador.innerHTML=pokemonganador.name;

  let botonbatalla=creargetElementById('boton-batalla-empezar');
  botonbatalla.disabled=true;

  let imgseleccionuno=creargetElementById('img-seleccion-batalla-pokemon1');
  imgseleccionuno.setAttribute('src','img/buscarpokemon.png');

  let imgselecciondos=creargetElementById('img-seleccion-batalla-pokemon2');
  imgselecciondos.setAttribute('src','img/buscarpokemon.png');

  pokemonseleccionado1.checked=false;
  pokemonseleccionado2.checked=false;

  ganadores.name=pokemonganador.name;
  contenidoganadores.push(ganadores.name);

  removeimagenes(containerpokemones);
  jsonpokemones(pokemonganador.url);
}

function botonBatallaNueva(){
  
  let botonbatalla=creargetElementById('boton-batalla-empezar');
  botonbatalla.disabled=false;

  let imgganadorbatalla=creargetElementById('img-ganador');
  imgganadorbatalla.setAttribute('src','img/buscarpokemon.png');

  let nombreganador=creargetElementById('p-ganador');
  nombreganador.innerHTML="";

  let botonbatallanueva=creargetElementById('boton-batalla-nueva');
  botonbatallanueva.disabled=true;

  url=pokemonseleccionado1.url;
  pokemonseleccionado1={};
  pokemonseleccionado2={};



  removeimagenes(containerpokemones);
  jsonpokemones(url);
}

jsonpokemones(urlapipokemon);