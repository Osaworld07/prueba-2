// URL de la API que deseas consultar
const API_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=10';

// Obtiene el contenedor donde se mostrarán los datos
const dataContainer = document.getElementById('data-container');

// Función asíncrona para cargar los datos de la API
async function loadDataFromAPI() {
    try {
        // 1. Realizar la petición HTTP con la función fetch
        const response = await fetch(API_URL);

        // Verificar si la respuesta fue exitosa (código 200)
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status}`);
        }

        // 2. Convertir la respuesta a formato JSON
        const data = await response.json();

        // 3. Limpiar el contenedor antes de mostrar los nuevos datos
        dataContainer.innerHTML = '';

        // 4. Recorrer los datos y crear elementos HTML para cada uno
        data.forEach(item => {
            // Creamos un div para cada "tarjeta" de dato
            const card = document.createElement('div');
            card.className = 'item-card';

            // Título (en este caso, el título de la tarea)
            const title = document.createElement('h3');
            title.textContent = item.title;

            // Estado (completado o pendiente)
            const status = document.createElement('p');
            const statusText = item.completed ? 'Estado: Completada ✅' : 'Estado: Pendiente 🕒';
            status.innerHTML = `<strong>${statusText}</strong>`;
            
            // Adjuntamos los elementos a la tarjeta
            card.appendChild(title);
            card.appendChild(status);

            // Adjuntamos la tarjeta al contenedor principal
            dataContainer.appendChild(card);
        });

    } catch (error) {
        // En caso de error, lo mostramos en el contenedor
        dataContainer.innerHTML = `<p style="color: red;">¡Error al cargar los datos! ${error.message}</p>`;
        console.error("Hubo un problema con la operación fetch:", error);
    }
}

// Llamar a la función para cargar los datos al iniciar la página
loadDataFromAPI();