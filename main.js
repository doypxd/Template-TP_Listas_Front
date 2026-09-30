
let comidas = [];

/*
    Cargar comidas en memoria desde el JSON
*/
fetch('./data/comidas.json')        // Ruta al archivo JSON
.then(response => response.json())  // Convertir la respuesta en JSON
.then(data => {                     // Aquí tienes acceso al JSON en formato de objeto JS
  console.log('Comidas cargadas desde JSON:');
  comidas = data;                   // Asignar el JSON a la variable comidas
  console.log(comidas);
  renderizarComidas();
})
.catch(error => {                   // Manejo de errores al leer el archivo JSON
  console.error('Error al leer el archivo JSON:', error);
})


const container = document.getElementById('comidaContainer');
const nuevoItem = document.getElementById('agregarComida');

function renderizarComidas() {
  let htmlInterior = "";
  for (const comida of comidas) {
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
  } else {
    alert("Escribi bien los ingredientes, separados por comas.");
  };

});