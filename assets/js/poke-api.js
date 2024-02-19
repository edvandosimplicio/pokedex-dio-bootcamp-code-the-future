const pokeApi = {}

//converte todos os detalhes dos pokemons para o nosso objeto Pokemon no arquivo pokemon-model.js
function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

//requisição http para buscar todos os detalhes dos pokemons e passa para a nossa function acima que converte o que nos interessa pro nosso objeto Pokemon
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then (convertPokeApiDetailToPokemon)
}

//criação do método com url da api settada em 10 pokemons
pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    //requisição http para buscar os pokemons
    return fetch(url)

        //transforma em json
        .then((response) => response.json())
        //filtra apenas os resultados dos 10 pokemons limitados que escolhemos
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)

}