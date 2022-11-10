import { retornarElValorDeLaVariableAlCuadrado } from "./modulo";

const dictionary = {
    "S": {
        "Hola": "1023"
    }
}

for(const[k,v] in dictionary){
    console.log(k,v)
}

console.log(retornarElValorDeLaVariableAlCuadrado(10));