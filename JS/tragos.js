document.addEventListener('DOMContentLoaded', () => {
    const tragosContainer = document.getElementById('tragos-container');
    const apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

    async function obtenerTragos() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (data.drinks) {
                mostrarTragos(data.drinks);
            } else {
                tragosContainer.innerHTML = '<p>No se encuentran bebidas disponibles.</p>';
            }
        } catch (error) {
            console.error('Error al obtener los tragos:', error);
            tragosContainer.innerHTML = '<p>Error al cargar las bebidas.</p>';
        }
    }

    function mostrarTragos(tragos) {
        let contenidoHTML = '';
        tragos.forEach(trago => {
            const nombreTrago = trago.strDrink || 'Nombre del trago no disponible';
            const imagenTrago = trago.strDrinkThumb || './img/default-drink.png';
            const instrucciones = trago.strInstructions || 'Instrucciones no disponibles';

            contenidoHTML += `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <img src="${imagenTrago}" class="card-img-top" alt="${nombreTrago}">
                        <div class="card-body">
                            <h5 class="card-title">${nombreTrago}</h5>
                            <p class="card-text"><strong>Ingredientes:</strong></p>
                            <ul>
                                ${getIngredientes(trago).map(ingrediente => `<li>${ingrediente}</li>`).join('')}
                            </ul>
                            <p class="card-text"><strong>Instrucciones:</strong></p>
                            <p>${instrucciones}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        tragosContainer.innerHTML = contenidoHTML;
    }

    function getIngredientes(trago) {
        const ingredientes = [];
        for (let i = 1; i <= 15; i++) {
            const ingrediente = trago[`strIngredient${i}`];
            const medida = trago[`strMeasure${i}`];
            if (ingrediente) {
                ingredientes.push(medida ? `${ingrediente} (${medida})` : ingrediente);
            }
        }
        return ingredientes.length > 0 ? ingredientes : ['Ingredientes no disponibles'];
    }
    obtenerTragos();
});

