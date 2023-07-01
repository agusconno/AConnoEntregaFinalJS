const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const popContainer = document.getElementById("pop-container");
const cantidadShop = document.getElementById("cantidadShop");

let carrito = [];


  productos.forEach((product) => {
    const content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
      <img src="${product.img}">
      <h3>${product.nombre}</h3>
      <p class="price">${product.precio} $</p>
      
    `;

    shopContent.append(content);

    const comprar = document.createElement("button");
    comprar.innerText = "comprar";
    comprar.className = "comprar";

    content.append(comprar);

    comprar.addEventListener("click", () => {
    const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id); 
    console.log(repeat);

    if (repeat == true){
      carrito.map((produ) => {
        if(produ.id === product.id){
          produ.cantidad++;
        }
      });
    } else {
      carrito.push({
        id: product.id,
        img: product.img,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: product.cantidad,
  });
    }
        
    console.log(carrito);
    carritoContador ();
  });
});
 

  guardarCarritoEnLocalStorage();


function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

 const pintarCarrito = () => {
  popContainer.innerHTML = "";
  popContainer.style.display = "flex";
  const popHeader = document.createElement("div");
  popHeader.className = "pop-header";
  popHeader.innerHTML = `
    <h1 class="pop-header-titulo">Carrito</h1>
  `;
  popContainer.append(popHeader);

  const popButton = document.createElement("h1");
  popButton.innerText = "❌";
  popButton.className = "pop-header-button";

  popButton.addEventListener("click", () => {
    popContainer.style.display = "none";
  });

  popHeader.append(popButton);

  carrito.forEach((product) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
      <img src="${product.img}">
      <h3>${product.nombre}</h3>
      <p>${product.precio}</p>
      <p>Cantidad: ${product.cantidad}</p>
    `;
    popContainer.append(carritoContent);
    console.log(carrito.length);

    let eliminar = document.createElement ("span");
    eliminar.innerText = "❎";
    eliminar.className ="deleteProduct";
    carritoContent.append(eliminar);

    eliminar.addEventListener("click", eliminarProducto);

  });



  const total = carrito.reduce((acc, el) => acc + el.precio, 0);
  const totalShopping = document.createElement("div");
  totalShopping.className = "total-shopping";
  totalShopping.innerHTML = `total a pagar: ${total} $`;
  popContainer.append(totalShopping);
};

verCarrito.addEventListener ("click", pintarCarrito);

const eliminarProducto = () => {
  const foundId = carrito.find((element) => element.id);
  carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
  });
  carritoContador ();
  pintarCarrito();
};

const carritoContador = () => {
  cantidadShop.style.display = "block",
  cantidadShop.innerText = carrito.length;
}


