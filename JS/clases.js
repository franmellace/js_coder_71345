class Cliente {
    constructor(nombre, edad, domicilio, dni) {
        this.nombre = nombre;
        this.edad = edad;
        this.domicilio = domicilio;
        this.dni = dni;
    }
}

class Producto {
    constructor(id, nombre, precio,img) {
        this.id = id;
        this.nombre = nombre;
        this.precio =precio;
        this.img=img;
    }
}

class Cupon {
    constructor(codigo, descuento) {
        this.codigo = codigo;
        this.descuento = descuento;
    }
}

class ItemComprado {
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }
}

class Carrito {
    constructor(items, cupon) {
        this.items = items;
        this.cupon = cupon;
    }

    obtenerTotalBruto() {
        return this.items.reduce((acc, itemProducto) => acc + itemProducto.producto.precio * itemProducto.cantidad, 0)
    }
    obtenerTotalNeto(){
        return this.obtenerTotalBruto() - this.obtenerTotalBruto() * this.cupon.descuento
    }
}



