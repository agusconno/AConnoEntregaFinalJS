const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const popContainer = document.getElementById("pop-container");

const productos = [
  {
    id: 1,
    nombre: "IT",
    precio: 2000,
    img: "./asset/img/IT.jpg",
  },
  {
    id: 2,
    nombre:"Actividad Paranormal",
    precio: 2500,
    img: './asset/img/Actividad Paranormal.jpg',
},

{
    id: 3,
    nombre:"Cementerio de Animales",
    precio: 3500,
    img: './asset/img/Cementerio de Animales.jpg',
},
{
    id: 5,
    nombre:"El juego del miedo",
    precio: 1500,
    img: './asset/img/El juego del miedo.jpg',
},
{
    id: 6,
    nombre:"La bruja de blair",
    precio: 2000,
    img: './asset/img/La bruja de blair.jpg',
},
{
    id: 7,
    nombre:"Los extraños",
    precio: 4000,
    img: './asset/img/Los extraños.jpg',
},
{
    id: 8,
    nombre:"Psicosis",
    precio: 3500,
    img: './asset/img/Psicosis.jpg',
},
];

let carrito = [];

function renderizarProductos() {
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
      agregarAlCarrito(product);
    });
  });
}

function agregarAlCarrito(producto) {
  carrito.push({
    id: producto.id,
    img: producto.img,
    nombre: producto.nombre,
    precio: producto.precio,
  });
  console.log(carrito);
  guardarCarritoEnLocalStorage();
}

function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarCarrito() {
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
    const carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
      <img src="${product.img}">
      <h3>${product.nombre}</h3>
      <p>${product.precio}</p>
    `;
    popContainer.append(carritoContent);
  });

  const total = carrito.reduce((acc, el) => acc + el.precio, 0);
  const totalShopping = document.createElement("div");
  totalShopping.className = "total-shopping";
  totalShopping.innerHTML = `total a pagar: ${total} $`;
  popContainer.append(totalShopping);
}

verCarrito.addEventListener("click", mostrarCarrito);

renderizarProductos();
