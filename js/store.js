/*---------------------------- MIS PRODUCTOS ----------------------------*/

// Productos almacenados en archivo JSON
const url = "js/productos.json";

fetch(url)
  .then(response => response.json())
  .then(data => {
    localStorage.setItem('stock', JSON.stringify(data.productos));
  })
  .catch(error => console.error(error));



// Enviar y devolver lista de productos del almacenamiento local
const productosAlmacenados = localStorage.getItem('stock');
const productos = JSON.parse(productosAlmacenados);


/*---------------------------- DOM DE LA TIENDA ----------------------------*/


// Selecciono el id "root" para renderizar mis productos
const shopProducts = document.querySelector('#root')

// Recorro mis productos y creo la card para cada item
productos.forEach((productos) => {
    let div = document.createElement('div');
    div.setAttribute('class', 'card-content');
    div.classList.add("all", `${productos.categoria}`); // le agrego la categoria al item para luego filtrar

    div.innerHTML = `
    <div id="${productos.id}">
        <img src= ${productos.thumbnail} alt="foto de ${productos.nombre}"></img>
        <div class="card-body">
        <h2 id="name">${productos.nombre}</h2>
        <p id="price">U$D: ${productos.price}</p>
        </div>
    </div>
    `;

    // Boton para agregar al carrito
    let comprar = document.createElement("button")
    let span1 = document.createElement("span")
    let span2 = document.createElement("span")

    span1.innerText = "Comprar";


    // Agrego los span para los estilos del boton
    comprar.className = "button";
    span1.setAttribute('class', 'button__text');
    span2.setAttribute('class', 'button__icon')

    span2.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg>
    `;

    comprar.append(span1, span2)

    div.append(comprar);
    shopProducts.append(div);

    comprar.addEventListener("click", () => {

        let textoOriginal = comprar.innerHTML;
        span1.innerText = "Agregado";

        const productoRepetido = carrito.some((productoRepe) => productoRepe.id === productos.id);

        if (productoRepetido) {
            carrito.map((prod) => {
                if (prod.id === productos.id) {
                    prod.cantidad++;
                }
            })

        } else
            carrito.push({
                id: productos.id,
                thumbnail: productos.thumbnail,
                nombre: productos.nombre,
                price: productos.price,
                cantidad: productos.cantidad,
            });

        //timeout para volver al texto original del boton, una vez agregado
        setTimeout(function () {
            comprar.innerHTML = textoOriginal;
        }, 3000);

        guardarCarrito();
        showCartItems()
        alertaAgregadoAlCarrito()
        renderizarPrecioTotal();
    })

})

const filterButtons = document.querySelectorAll('.filter-button');
const items = document.querySelectorAll('.all');

filterButtons.forEach(filterButton => {
    filterButton.addEventListener('click', () => {
        filterButtons.forEach(button => button.classList.remove("active"));
        filterButton.classList.add("active");
        const filter = filterButton.dataset.filter;
        items.forEach(item => {
            if (filter === 'all') {
                item.classList.remove("hidden");
            } else if (!item.classList.contains(filter)) {
                item.classList.add("hidden");
            } else {
                item.classList.remove("hidden");
            }
        });
    });
});




/*---------------------------- CARRITO DE COMPRAS ----------------------------*/

    /*-- SI EXISTE UN CARRITO, LO TRAIGO CON GET ITEM, SI NO, LO CREO ---*/
    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const guardarCarrito = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

/*-- Imprimir productos agregados al carrito en el dom --*/

const cartContent = document.getElementById('cartContainer')

function showCartItems() {
    cartContent.innerHTML = '';
    carrito.forEach((productos) => {
        let cartItem = document.createElement('div');
        cartItem.setAttribute('class', 'cart-container');
        cartItem.setAttribute('id', productos.id);
        cartItem.innerHTML = `
                <img src= ${productos.thumbnail} alt="foto de ${productos.nombre}"></img>
                <div class="card-body">
                    <h2 id="name">${productos.nombre}</h2>
                    <p id="price">USD: ${productos.price * productos.cantidad} | Cantidad: ${productos.cantidad} </p>  
                </div>`
            ;

        //boton para eliminar producto del carrito
        let eliminar = document.createElement("button");
        eliminar.innerText = "❌";

        cartItem.append(eliminar)
        cartContent.append(cartItem);

        eliminar.addEventListener("click", () => {

            const foundID = carrito.find((element) => element.id === productos.id);

            const productoRepetido = carrito.some((productoRepe) => productoRepe.id === productos.id);

            if (productoRepetido) {
                carrito.map((prod) => {
                    if (prod.id === productos.id) {
                        if (prod.cantidad != 1) {
                            prod.cantidad = prod.cantidad - 1;
                        } else  
                                carrito = carrito.filter((carritoID) => {
                                    return carritoID !== foundID;
                                });
                            
                    }
                })
            }
            renderizarPrecioTotal()
            alertaEliminadoDelCarrito()
            guardarCarrito();
            showCartItems();
        })
    })
}


showCartItems() // Ejecuto la funcion asi, si el usuario guardo algo en el carrito y recargó la pagina, los productos siguen apareciendo en el dom del carrito.

/*- Funciones para imprimir el precio total del carrito en pantalla --*/
function sumarTotalCarrito(carrito) {
    return carrito.reduce((total, producto) => {
        return total + producto.price * producto.cantidad;
    }, 0);
}

function renderizarPrecioTotal() {
    let precioTotalCarrito = document.getElementById('cartPrice');
    let totalCarrito = sumarTotalCarrito(carrito);
    precioTotalCarrito.innerHTML = `Total: $${totalCarrito}`;
}


/*---------------------------- MIS ALERTAS ----------------------------*/

// Producto pusheado al carrito
function alertaAgregadoAlCarrito() {
    Toastify({
        text: "Producto agregado al carrito!",
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: false,
        style: {
            background: "linear-gradient(0deg, #6bc2ff 0%, #6b91ff 100%)",
        },
    }).showToast();
}

// Producto eliminado del carrito
function alertaEliminadoDelCarrito() {
    Toastify({
        text: "Producto eliminado del carrito!",
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: false,
        style: {
            background: "linear-gradient(0deg, #a71414 0%, #f76464 100%)",
        },
    }).showToast();
}

/*---------------------------- DARK MODE ----------------------------*/

const toggleTheme = document.querySelector('#theme');
 toggleTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    toggleTheme.classList.toggle('dark');

 // Guardo el tema del usuario en el local
    if (document.body.classList.contains('dark')) {
        localStorage.setItem('dark-theme' , 'true')     
    }else {
    localStorage.setItem('dark-theme' , 'false')}

 })

 // Cargo el tema del usuario

 if (localStorage.getItem('dark-theme') === 'true') {
    document.body.classList.add('dark');
 } else {
    document.body.classList.remove('dark');
 }
