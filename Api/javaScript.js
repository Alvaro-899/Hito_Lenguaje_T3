function obtenerProvincias() {
    fetch('https://www.el-tiempo.net/api/json/v2/provincias')
        .then(response => response.json())
        .then(data => procesarProvincias(data))
        .catch(error => console.error('Error al obtener provincias:', error));
}

function procesarProvincias(data) {
    const provinciasLista = document.getElementById('provincias-lista');

    data.provincias.forEach(provincia => {
        const comunidad = provincia.COMUNIDAD_CIUDAD_AUTONOMA;
        const nombreProvincia = provincia.NOMBRE_PROVINCIA;
        const capital = provincia.CAPITAL_PROVINCIA;

        // Crear elemento de lista
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

        // Contenido del elemento de lista
        listItem.innerHTML = `
            <div>
                <h5>${nombreProvincia}</h5>
                <p class="mb-0">${comunidad}</p>
            </div>
            <span class="badge badge-primary badge-pill">${capital}</span>
        `;

        // Agregar elemento de lista al contenedor
        provinciasLista.appendChild(listItem);
    });
}

obtenerProvincias();
