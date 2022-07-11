'use strict'

// process.argv.slice(2) -> que comience a partir del parametro 
// numero 2('1')
var params = process.argv.slice(2);

// recibir varios parametros al node calculadora.js
var numero1 = parseFloat(params[0]);
var numero2 = parseFloat(params[1]);

var plantilla = `
La suma es: ${numero1 + numero2}
La resta es: ${numero1 - numero2}
La multiplicación es: ${numero1 * numero2}
La división es: ${numero1 / numero2}
`;


// muestra los valores de los numeros
console.log(numero1);
console.log(numero2);
// muestra el resultado de la calculadora
console.log(plantilla); 
console.log('Hola mundo con NodeJs');