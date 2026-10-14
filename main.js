
let comidas = [];

/*
    Cargar comidas en memoria desde el JSON
*/
fetch('./data/comidas-extended.json')        // Ruta al archivo JSON
  .then(response => response.json())  // Convertir la respuesta en JSON
  .then(data => {                     // Aquí tienes acceso al JSON en formato de objeto JS
    console.log('Comidas cargadas desde JSON:');
    comidas = data;                   // Asignar el JSON a la variable comidas
    console.log(comidas);
    renderizarComidas();
    configurarCategorias();
    configurarProvincias();
  })
  .catch(error => {                   // Manejo de errores al leer el archivo JSON
    console.error('Error al leer el archivo JSON:', error);
  })


const container = document.getElementById('comidaContainer');
const nuevoItem = document.getElementById('agregarComida');
const categoria = document.getElementById('categoria');
const provincia = document.getElementById('provincia');
const buscar = document.getElementById('buscar')

function configurarCategorias() {
  let opciones = ['Todos']
  for (const comida of comidas) {
    if (!opciones.some((opcion) => opcion === comida.categoria)) {
      opciones.push(comida.categoria)
    };
  };
  categoria.innerHTML = ``;
  for (const opcion of opciones) {
    const nuevaOpcion = document.createElement('option');
    nuevaOpcion.value = opcion;
    if (opcion === 'Todos'){
      nuevaOpcion.text = 'Todas las categorias';
    } else {
      nuevaOpcion.text = opcion;

    }
    categoria.appendChild(nuevaOpcion);
  };
};
function configurarProvincias() {
  let opciones = ['Todos']
  for (const comida of comidas) {
    if (!opciones.some((opcion) => opcion === comida.provincia)) {
      opciones.push(comida.provincia)
    };
  };
  provincia.innerHTML = ``;
  for (const opcion of opciones) {
    const nuevaOpcion = document.createElement('option');
    nuevaOpcion.value = opcion;
    if (opcion === 'Todos'){
      nuevaOpcion.text = 'Todas las provincias';
    } else {
      nuevaOpcion.text = opcion;

    }
    provincia.appendChild(nuevaOpcion);
  };
};

function renderizarComidas() {
  const filtroCategoria = categoria.value;
  const filtroProvincia = provincia.value;

  let listaComidasRenderizar = comidas;
  if (!(filtroCategoria === "Todos")) {
    listaComidasRenderizar = listaComidasRenderizar.filter(comida => comida.categoria === filtroCategoria);
  };
  if (!(filtroProvincia === "Todos")) {
    listaComidasRenderizar = listaComidasRenderizar.filter(comida => comida.provincia === filtroProvincia);
  };
  if (buscar.value) {
    listaComidasRenderizar = listaComidasRenderizar.filter(comida => {
      const nombre = comida.nombre.toLowerCase()
      return nombre.includes(buscar.value.toLowerCase());
    });
  };
  let htmlInterior = "";
  for (const comida of listaComidasRenderizar) {
    let ingredientesHtml = "";
    for (const ingrediente of comida.ingredientes) {
      ingredientesHtml += `
      <span class="chip verde" title="Ingrediente">${ingrediente}</span>
      `;
    };
    htmlInterior += `
        <article class="card">
          <h1>${comida.nombre}</h1>
          <div class="row">
          <span class="chip azul" title="Categoria">${comida.categoria}</span>
          <span class="chip gris" title="Provincia">${comida.provincia}</span>
          </div>
          <h4 class="ingredientes">Ingredientes:</h4>
          <div class="row">
            ${ingredientesHtml}
          </div>
        </article>
    `;
  };
  container.innerHTML = htmlInterior;
};

nuevoItem.addEventListener("click", () => {
  const nombre = document.getElementById('inputNombre').value;
  const categoria = document.getElementById('inputCategoria').value;
  const provincia = document.getElementById('inputProvincia').value;
  const ingredientes = document.getElementById('inputIngredientes').value.split(',');

  if (typeof ingredientes === "object") {
    comidas.push({
      nombre: nombre,
      categoria: categoria,
      provincia: provincia,
      ingredientes: ingredientes
    });
    console.log(comidas);
    alert("Listo!");
    renderizarComidas();
    configurarCategorias();
  } else {
    alert("Escribi bien los ingredientes, separados por comas.");
  };
});

categoria.addEventListener("change", () => {
  renderizarComidas();
});
provincia.addEventListener("change", () => {
  renderizarComidas();
});
buscar.addEventListener("input", () => {
  renderizarComidas();
});