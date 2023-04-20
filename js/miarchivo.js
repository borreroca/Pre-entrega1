
// Defino la clase Producto, que representa los productos disponibles en la tienda
class Producto {
  constructor(ID, nombre, precio) {
    this.ID = parseInt(ID);
    this.nombre = nombre;
    this.precio = parseFloat(precio);
    this.descuento = this.esLunesOMiercoles() ? true : false;
    this.cantidad = 0;
  }

  // Método para calcular el precio de un producto, aplicando descuento si corresponde
  calcularDescuento() {
    if (this.descuento) {
      return this.precio * 0.9;
    } else {
      return this.precio;
    }
  }

  // Método que indica si el día actual es lunes o miércoles
  esLunesOMiercoles() {
    const fecha = new Date();
    const diaSemana = fecha.getDay();
    return diaSemana === 1 || diaSemana === 3;
  }
}

// Array en el que creamos los productos disponibles en la tienda
const productos = [
  new Producto(1, "Televisor 45 Pulgadas", 250),
  new Producto(2, "Aire Acondicionado 9000btu", 350),
  new Producto(3, "Abanico Samurai 3 velocidades", 50)
];

// Array que representa el carrito de compras del cliente
const productosCarro = [];

// Variable que almacena el total a pagar por los productos del cliente
let total = 0;

// Mensaje de bienvenida, solicitando nombre del cliente
const nombre = prompt(`Bienvenido/a a tu tienda favorita. Por favor introduce tu nombre:`);
alert(`Hola ${nombre}. Recuerda que los días Lunes y Viernes tenemos 10% en todos los artículos.`);

let eleccion = 0;

do {
  eleccion = prompt("¿Qué operación desea realizar? \n 1. Comprar un producto \n 2. Ver los productos en el carrito \n 3. Ver el precio total a pagar \n 4. Abandonar el menú");

  switch (eleccion) {
    case "1":
      let mensaje = `¿Qué producto desea adquirir? \n`;

      const productosList = productos.map((producto, index) => `${index + 1}. ${producto.nombre} - $ ${producto.precio}`);

      mensaje += productosList.join("\n");

      // Pedimos al usuario que seleccione un producto
      const eleccion = prompt(mensaje);
      const indiceProducto = parseInt(eleccion) - 1;

    // Si el usuario ingresó una opción válida, agregamos el producto al carrito y actualizamos el total
    if (!isNaN(indiceProducto) && productos[indiceProducto]) {
      const producto = productos[indiceProducto];
      let existeEnCarrito = false;
      let cantidadProducto = parseInt(prompt(`¿Qué cantidad desea comprar del producto ${producto.nombre}?`));

      // Verificamos que la cantidad ingresada sea un número
      if (isNaN(cantidadProducto)) {
        alert("La cantidad ingresada no es válida.");
      }

      for (let i = 0; i < productosCarro.length; i++) {
        if (productosCarro[i].ID === producto.ID) {
          productosCarro[i].cantidad += cantidadProducto; // Aumentamos la cantidad del producto en el carro
          existeEnCarrito = true;
          break;
        }
      }

      // Si el producto no está en el carrito, lo agregamos
      if (!existeEnCarrito) {
        producto.cantidad += cantidadProducto;
        productosCarro.push(producto);
      }

      // Actualizamos el total de la compra
      total += producto.calcularDescuento() * cantidadProducto; // Calculamos el total a pagar
      alert(`Has agregado ${cantidadProducto} unidades de ${producto.nombre} a tu carrito.`);
    } else {
      alert("La opción ingresada no es válida, escoge una opción valida del menú.");
    }
      break;
    case "2":
      if (productosCarro.length === 0) {
        alert("El carrito está vacío.");
      } else {
        // Si hay productos en el carrito, mostramos el nombre y la cantidad de cada uno
        let mensaje = "Productos en el carrito: \n";
        productosCarro.forEach((producto) => {
          mensaje += `${producto.nombre} - Cantidad: ${producto.cantidad} \n`;
        });
        alert(mensaje);
      }
      break;
    case "3":
      alert(`El total a pagar es: $ ${total}`);
      break;
    case "4":
      break;

    default:
      console.log("La opción ingresada no es válida. Intenta escogiendo un número del menú.");
  }
} while (eleccion != "4");

alert("Muchas gracias por visitarnos, el total de su compra es $" + total);

