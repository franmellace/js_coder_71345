const productos = [
    new Producto(1,"Fernet Branca",9000,"./img/fernet.png"),
    new Producto(2,"Fernet Buhero",7500,"./img/buhero.png"),
    new Producto(3,"Vodka Smirnoff",6000,"./img/smirnoff.png"),
    new Producto(4,"Vodka Absolut",18000,"./img/absolut.png"),
    new Producto(5,"Cerveza Quilmes",2000,"./img/quilmes.png"),
    new Producto(6,"Cerveza Brahma",2100,"./img/brahma.png"),
    new Producto(7,"Cerveza Stella Artois",2600,"./img/stella.png"),
    new Producto(8,"Gancia",3200,"./img/gancia.png"),
    new Producto(9,"Malibu",15000,"./img/malibu.png"),
    new Producto(10,"Jaggermeister",19000,"./img/jagger.png"),
    new Producto(11,"Campari",6000,"./img/campari.png"),
    new Producto(12,"Jack Daniels Honey",45000,"./img/jack.png"),
    new Producto(13,"Red Label",30000,"./img/redlabel.png"),
    new Producto(14,"Johnnie Walker (blue label)",120000,"./img/bluelabel.png"),
    new Producto(15,"Federio de Alvear",5800,"./img/fede.png"),
    new Producto(16,"London",9000,"./img/london.png"),
    new Producto(17,"Santa Filomena",3100,"./img/filomena.png"),
    new Producto(18,"Cosecha Tardia",5800,"./img/cosecha.png"),
    new Producto(19,"Termidor",1600,"./img/temineitor.png"),
    new Producto(20,"Sidra 1888",5000,"./img/sidra.png"),
    new Producto(21,"Coca Cola",2800,"./img/coca.png"),
    new Producto(22,"Sprite",2800,"./img/sprite.png"),
    new Producto(23,"Manaos Pomelo",1400,"./img/pomelo.png"),
    new Producto(24,"Speed",1100,"./img/speed.png"),
];
const esMayor = localStorage.getItem("esMayor")
if(!esMayor){
Swal.fire({
    title: "IMPORTANTE!",
    text: "Eres mayor de 18 años?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si",
    cancelButtonText:"No",
    allowOutsideClick: false,
  }).then((result) => { console.log (result)
    if (!result.isConfirmed) {
      window.location.href = "https://www.google.com"
    }
    else{
        localStorage.setItem("esMayor", "T")
    }
  });
}
const renderProductos = (productos) => {
    let contenidoHTML = "";
    productos.forEach(producto => {
        contenidoHTML += `
        <div class="col-md-3">
        <form>
        <div class="card border-0">
        <img src="${producto.img}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
            <p class="card-text text-primary "><b>$ ${producto.precio}</b><br><span class="card-text text-secondary">${producto.nombre}</span></p>
        <input id="carrito-cantidad-${producto.id}" name="carrito-cantidad" min="1" class="form-control form-control-md col d-inline p-2" type="number" placeholder="Seleccione Cantidad" aria-label=".form-control-lg example">
            </div>
        <button onclick="agregarAlcarrito(${producto.id})" type="submit" class="btn btn-dark rounded-pill">Agregar Producto</button>
        </div>
        </form>
        </div>`;
    })
    document.getElementById("resultado").innerHTML = contenidoHTML;
}

renderProductos(productos);

function agregarAlcarrito(id) {
    const producto = productos.find(item => item.id == id);
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const cantidad = parseInt(document.getElementById(`carrito-cantidad-${id}`).value);

    if (isNaN(cantidad) || cantidad <= 0) {
        Swal.fire({
            icon: 'error',
            title: 'Cantidad Invalida',
            text: 'Seleccione la cantidad de productos que desea agregar al carrito.',
        });
        event.preventDefault()
        return;
        
    }

    const productoExistente = carrito.find(item => item.producto.id == id);
    if (productoExistente) {
        productoExistente.cantidad += cantidad;
    } else {
        carrito.push({ producto, cantidad });
        event.preventDefault()
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    totalProductos();
    Swal.fire({
        icon: "success",
        title: "Agregado al Carrito",
        showConfirmButton: false,
        timer: 1000
    });
    renderCarrito();
    event.preventDefault();
}

function totalProductos(){
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    document.getElementById("totalCarrito").innerHTML = total;
}

function renderCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let contenidoHTML = `<table class="table">
    <tbody id="tabla_carrito">`;   
    for (const item of carrito){
        contenidoHTML += `<tr>
        <td><img src="${item.producto.img}" class="card-img-top" alt="${item.producto.nombre}" width="16"></td>
        <td>${item.producto.nombre}</td>
        <td>$${item.producto.precio}</td>
        <td>x${item.cantidad}u</td>
        <td><button class="btn btn-danger" id="eliminar-${item.producto.id}">x</button></td>
        </tr>`;    
    }

    contenidoHTML += `</tbody>
    </table>`;

    document.getElementById("contenido").innerHTML = contenidoHTML;

    agregarEventosEliminar();
}

function agregarEventosEliminar() {
    const botonesEliminar = document.querySelectorAll('button[id^="eliminar-"]');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', (event) => {
            const id = event.target.id.replace('eliminar-', '');
            eliminarDelCarrito(id);
        });
    });
}

function eliminarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter(item => item.producto.id != id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
    totalProductos();
    Swal.fire({
        icon: "success",
        title: "Eliminado del Carrito",
        showConfirmButton: false,
        timer: 1000
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderCarrito();
    totalProductos();
});

    const formCliente = document.getElementById('form-cliente');
    formCliente.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombreApellido = document.getElementById('nombreApellido').value;
        const dni = document.getElementById('dni').value;
        const edad = document.getElementById('edad').value;
        const domicilio = document.getElementById('domicilio').value;

        if (!nombreApellido || !dni || !edad || !domicilio) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, complete todos los campos.',
            });
            return;
        }


        const cliente = new Cliente(nombreApellido, edad, domicilio, dni);
        localStorage.setItem('cliente', JSON.stringify(cliente));

        Swal.fire({
            icon: 'success',
            title: 'Datos Guardados',
            text: 'Sus datos personales han sido guardados.',
        });
    });

    const botonComprar = document.querySelector('button.btn-success');
    botonComprar.addEventListener('click', () => {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const cupon = new Cupon('DESCUENTO10', 0.1); 

        if (carrito.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Carrito vacío',
                text: 'No hay productos en el carrito para comprar.',
            });
            return;
        }

        const cliente = JSON.parse(localStorage.getItem('cliente'));
        if (!cliente) {
            Swal.fire({
                title: 'Datos Personales',
                text: 'Por favor, complete sus datos personales antes de continuar con la compra.',
                icon: 'info',
                confirmButtonText: 'Ir al formulario',
                preConfirm: () => {
                    document.getElementById('offcanvasWithBothOptions').classList.add('show');
                }
            });
            return;
        }

        const items = carrito.map(item => new ItemComprado(item.producto, item.cantidad));
        const carritoObj = new Carrito(items, cupon);
        const totalBruto = carritoObj.obtenerTotalBruto();
        const totalNeto = carritoObj.obtenerTotalNeto();
        let detalleCompra = '<ul>';
        carrito.forEach(item => {
            const subtotal = item.producto.precio * item.cantidad;
            detalleCompra += `<li>${item.producto.nombre} x ${item.cantidad} = $${subtotal.toFixed(2)}</li>`;
        });
        detalleCompra += '</ul>';
        detalleCompra += `<p><b>Total Bruto:</b> $${totalBruto.toFixed(2)}</p>`;
        detalleCompra += `<p><b>Total con descuento especial:</b> $${totalNeto.toFixed(2)}</p>`;
        Swal.fire({
            title: 'Detalle de Compra',
            html: detalleCompra,
            icon: 'info',
            confirmButtonText: 'Aceptar'
        }).then(() => {
            Swal.fire({
                title: 'Compra realizada',
                text: `El total a pagar es $${totalNeto.toFixed(2)}. Su pedido será enviado a ${cliente.domicilio} en 24 HS.`,
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                localStorage.removeItem("carrito");
                localStorage.removeItem("cliente");
                localStorage.removeItem("esMayor");
                renderCarrito();
                totalProductos();
            });
        });
    });