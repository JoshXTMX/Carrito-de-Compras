//variables

const carrito = document.querySelector ('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector ('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventListeners ();
function cargarEventListeners (){
    //Cuando agregas un curso presionando "agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso)

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
     articulosCarrito = [];
     limpiarHTML();
    })

}

//funciones
function agregarCurso (e){
    e.preventDefault();

    if( e.target.classList.contains('agregar-carrito')) {
    
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
     }
}

//Lee el contenido HTML al que le dimos Click y extrae la informacion del curso
function leerDatosCurso(curso){
    //console.log(cursoSeleccionado);
    
    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1

    }

    // Revisa si un elemento ya existe En el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if(existe) {
         // actualizamos la cantidad
         const cursos = articulosCarrito.map( curso => {
            if( curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //retorna el objeto actaulizado
            } else {
                return curso; //retorna los objetos que no son los duplicados
            }

       });
       articulosCarrito = [...cursos];
    }
    else {
      // Agrega elementos al arreglo de carrito
      articulosCarrito = [...articulosCarrito, infoCurso];
    }
    
  // agrega elementos al arreglo de carrito 
  articulosCarrito = [...articulosCarrito, infoCurso];

  console.log(articulosCarrito);

  carritoHTML();
}

// Muestra el carrito de compras en HTML

function carritoHTML(){
    //limpiar el HTML

    //Recorre el carrito y general el HTML

   articulosCarrito.forEach( curso => {
    const row = document.createElement('tr');
    row.innerHTML = `
       <td>
        <img src="${curso.imagen}" width="100" >
       </td>
       <td>${curso.titulo}</td>
       <td>${curso.precio}</td>
       <td>${curso.cantidad}</td>
       <td>
          <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
       </td>
      `;

      //Agrega el HTML del carrito en el Tbody
      contenedorCarrito.appendChild(row);
   });

}

//Elimina los cursos del tbody
function limpiarHTML() {
   // contenedorCarrito.innerHTML = '';

   while(contenedorCarrito.firstChild) {
         contenedorCarrito.removeChild(contenedorCarrito.firstChild);
   }
}


