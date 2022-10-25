
const previous=document.querySelector("#previous");
const next=document.querySelector("#next");

let pokemonmaximo=6;
let offset=1;
let limit=5;


function datospokemon(id,offset,limit){
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
  .then((respuesta)=>respuesta.json())
  .then((datos)=>{agregarPokemon(datos,offset,limit)
  });
}

function datospokemones(offset,limit){
  for (let index = offset; index <= offset+limit; index++) {
    datospokemon(index,offset,limit);
  }
 
}

function agregarPokemon(pokemon,offset,limit) {
  let idpokemon=pokemon.id;
  let limitepokemon=limit+offset-6;
  console.log(idpokemon)
  if(pokemon.id>6){
    idpokemon-=limitepokemon;
  }
  
  const imgpokemon1=document.getElementById(`img-pokemon${idpokemon}`);
  const nombrepokemon1=document.getElementById(`nombre-pokemon${idpokemon}`);
  const poderpokemon1=document.getElementById(`poder-pokemon${idpokemon}`);
  const hppokemon1=document.getElementById(`hp-pokemon${idpokemon}`);
  imgpokemon1.src=pokemon.sprites.front_default;
  nombrepokemon1.innerHTML="Nombre: "+pokemon.name;
  poderpokemon1.innerHTML="Poder: "+pokemon.stats[1].base_stat;
  hppokemon1.innerHTML="Vida: "+pokemon.stats[0].base_stat;

}


function removeimagenes(parent){
  while(parent.firstChild){
    parent.removeChild(parent.firstChild);
  }
}

previous.addEventListener('click',()=>{
  if(offset !=1){
offset -=6;

datospokemones(offset,limit);
}
})

next.addEventListener('click',()=>{
  offset +=6;

  datospokemones(offset,limit)
  })
datospokemones(offset,limit);