function maíscula(texto){
let maisculo =  texto.split(/\s/).map((palavras)=>palavras[0].toUpperCase() + palavras.slice(1))

return maisculo.join(" ")
}

console.log(maíscula("isaias caetano de oliveira"))