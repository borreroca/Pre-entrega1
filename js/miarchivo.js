
const nombre = prompt("Bienvenido/a a tu tienda favorita. Por favor introduce tu nombre:");
const numArticulos = prompt ('Hola ' + nombre + ", ¿cuantos articulos deseas comprar el día de hoy?")

const prom = prompt("¿Desea saber el costo promedio de sus articulos al finalizar la compra? 1 - Si.  2 - No.")

if(prom == 1){
    alert("El promedio será mostrado al finalizar la compra.")
}else if (prom == 2){
    alert("El promedio no será mostrado al finalizar la compra.")
}else{
    alert("La opción escogida no es valida, no se calculará el promedio. Si desea calcularlo, recargue la pagina nuevamente.")
}

let total = 0;
let promedio = 0;

for ( let i = 0; i<numArticulos; i++ ){
    
    let eleccion = prompt("Escoga el número que corresponde al producto que desea adquirir: 1.Televisor 45 Pulgadas - 200$ 2. Aire acondicionado Olimpo 9000btu - 120$ 3.Abanico Samurai 3 velocidades - $50. Nota: Numero de productos escogidos: " + i);

    if (eleccion == 1){
        total += 200;
    }else if(eleccion == 2){
        total += 120;
    }else if (eleccion == 3){
        total += 50;
    }else{
        alert("Has ingresado una opcion incorrecta. Recarga la pagina nuevamente.")
        total= -1;
        break
    }
};

if (prom == 1){
    caclularPromedio(numArticulos, total)
}

function caclularPromedio (numArticulos, total) {
    promedio = total /numArticulos;
    return promedio;
};

if (total !=-1 && prom == 1){
    alert("El total de su compra es: $" + total + ". El costo promedio de sus articulso ha sido: $" + promedio);
} else if (total !=-1 && prom !=1){
    alert("El total de su compra es: $" + total);
}
