

class Producto {
  constructor(ID, nombre, precio) {
    this.ID = parseInt(ID);
    this.nombre = nombre;
    this.precio = parseFloat(precio);
    this.cantidad = 0;
  }

}

const productos = [
  new Producto(1, "Televisor 45 Pulgadas", 250),
  new Producto(2, "Aire Acondicionado 9000btu", 350),
  new Producto(3, "Abanico Samurai 3 velocidades", 50),
  new Producto(4, "Computador Intel I7", 420)
];

let productosCarro = JSON.parse(localStorage.getItem('productosCarro')) || [];
let total = parseFloat(localStorage.getItem('totalCompra')) || 0;

for (const producto of productos){
  let contenedor = document.createElement("ol");
  let padre = document.querySelector("li.listadoProductos")
  contenedor.innerHTML = `<h3>${producto.ID}</h3>
                          <p>${producto.nombre}</p>
                          <b>precio: $ ${producto.precio}</b>
                          <div class="opcionesProducto">
                          <button class="agregarProducto" data-id="${producto.ID}">+</button>
                          <button class="quitarProducto" data-id="${producto.ID}">-</button>
                          </div>`;
  contenedor.className="producto"
  padre.appendChild(contenedor);

  const btnAgregar = contenedor.querySelector('.agregarProducto');
  btnAgregar.addEventListener('click', () => {
    const id = btnAgregar.dataset.id;
    const productoCarro = productos.find(p => p.ID === parseInt(id));
    const productoExistente = productosCarro.find(p => p.ID === parseInt(id));
    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      productoCarro.cantidad = 1;
      productosCarro.push(productoCarro);
    }
    total += productoCarro.precio;

    localStorage.setItem('productosCarro', JSON.stringify(productosCarro));
    localStorage.setItem('totalCompra', total);

    const infoCarro = document.querySelector('.infoCarro');
    let cantidadTotal = 0;
    let productosEnCarro = '';
    for (const producto of productosCarro) {
      cantidadTotal += producto.cantidad;
      productosEnCarro += `${producto.nombre}: ${producto.cantidad} unidades<br>`;
    }
    infoCarro.innerHTML = `Carrito de Compra: ${cantidadTotal} productos - Total: $ ${total}<br>${productosEnCarro}`;
    const mensajeCompra = document.querySelector('.mensajeCompra');
    mensajeCompra.innerHTML = '';
  });

  const btnQuitar = contenedor.querySelector('.quitarProducto');

  btnQuitar.addEventListener('click', () => {
    const id = btnQuitar.dataset.id;
    const productoCarro = productos.find(p => p.ID === parseInt(id));
    const productoExistente = productosCarro.find(p => p.ID === parseInt(id));
    if (productoExistente) {
      if (productoExistente.cantidad === 1) {
        const index = productosCarro.indexOf(productoExistente);
        productosCarro.splice(index, 1);
      } else {
        productoExistente.cantidad--;
      }
      total -= productoCarro.precio;

      localStorage.setItem('productosCarro', JSON.stringify(productosCarro));
      localStorage.setItem('totalCompra', total);

      const infoCarro = document.querySelector('.infoCarro');
      let cantidadTotal = 0;
      let productosEnCarro = '';
      for (const producto of productosCarro) {
        cantidadTotal += producto.cantidad;
        productosEnCarro += `${producto.nombre}: ${producto.cantidad} unidades<br>`;
      }
      infoCarro.innerHTML = `Carrito de Compra: ${cantidadTotal} productos - Total: $ ${total}<br>${productosEnCarro}`;
      const mensajeCompra = document.querySelector('.mensajeCompra');
      mensajeCompra.innerHTML = '';
    }
  });

    const btnComprar = document.querySelector('.comprar');
    btnComprar.addEventListener('click', () => {
      productosCarro = [];
      total = 0;
      localStorage.removeItem('productosCarro');
      localStorage.removeItem('totalCompra');
      const infoCarro = document.querySelector('.infoCarro');
      infoCarro.innerHTML = `Carrito de Compra: 0 productos - Total: $0`;
      const mensajeCompra = document.querySelector('.mensajeCompra');
      mensajeCompra.innerHTML = 'Muchas gracias por su compra!';
  });
}

const infoCarro = document.querySelector('.infoCarro');
let cantidadTotal = 0;
let productosEnCarro = '';
for (const producto of productosCarro) {
  cantidadTotal += producto.cantidad;
  productosEnCarro += `${producto.nombre}: ${producto.cantidad} unidades<br>`;
}
infoCarro.innerHTML = `Carrito de Compra: ${cantidadTotal} productos - Total: $ ${total}<br>${productosEnCarro}`;
const mensajeCompra = document.querySelector('.mensajeCompra');
mensajeCompra.innerHTML = '';
