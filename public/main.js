const containerPokemon=document.querySelector(".container-pokemon");
const previous=document.querySelector("#previous");
const next=document.querySelector("#next");

let offset=1;
let limit=9;

previous.addEventListener('click',()=>{
  if(offset !=1){
offset -=10;
removeimagenes(containerPokemon);
datospokemones(offset,limit);
}
})

next.addEventListener('click',()=>{
  offset +=10;
  removeimagenes(containerPokemon);
  datospokemones(offset,limit)
  })

function datospokemon(id){
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
  .then((respuesta)=>respuesta.json())
  .then((datos)=>{agregarPokemon(datos)
    
  });
 
}

function datospokemones(offset,limit){
  for (let index = offset; index <= offset+limit; index++) {
    datospokemon(index);
  }
}

function agregarPokemon(pokemon) {
  
  const tarjeta=document.createElement("div");
  tarjeta.classList.add("pokemon-bloque");

  const imagenPokemon=document.createElement("div");
   imagenPokemon.classList.add("img-container");

  const imagenfront= document.createElement("img");
  imagenfront.src=pokemon.sprites.front_default;

  imagenPokemon.appendChild(imagenfront); 

  const imagenback= document.createElement("img");
  imagenback.src=pokemon.sprites.back_default;

  imagenPokemon.appendChild(imagenback); 
  
  const name=document.createElement("p");
  name.classList.add('name');
  name.textContent="Nombre: "+pokemon.name;

  const height=document.createElement("p");
  height.textContent="Peso: "+pokemon.height;

  const weight=document.createElement("p");
  weight.textContent="Altura: "+pokemon.weight;


  tarjeta.appendChild(imagenPokemon);
  tarjeta.appendChild(name);
  tarjeta.appendChild(height);
 tarjeta.appendChild(weight);

  containerPokemon.appendChild(tarjeta);

}

function removeimagenes(parent){
  while(parent.firstChild){
    parent.removeChild(parent.firstChild);
  }
}
datospokemones(offset,limit);