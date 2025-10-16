/*

1. Pediremos las películas de Star Wars y pintaremos una gráfica de líneas en la que podamos ver cada una de las películas:
    - En el eje X el nombre de la película
    - En el eje Y año de publicación

**API ENDPOINT --> https://swapi.info/api/films**

*/

async function starWarsFilms() {
    try {
        // Busca y extrae los datos de las películas de Star Wars
        const filmsResponse = await fetch("https://swapi.info/api/films");
        const filmsData = await filmsResponse.json();    
        
        // Verificación 1 (Buena práctica)
        if (!filmsResponse.ok) {
            throw new Error(`Error HTTP: ${filmsResponse.status} - ${filmsResponse.statusText}`);
        }

        // Extrae y devuelve los nombres y años de las películas utilizando ".map"
        const filmsName = filmsData.map(film => film.title);
        const filmsYear = filmsData.map(film => {
            // "new Date" crea un objeto "Date" del que se podrá extraer el año
            const dateComplet = new Date(film.release_date);
            // Extrae sólo el año de la fecha utilizando ".getFullYear()"
            const dateYear = dateComplet.getFullYear();
            return dateYear;
        });

        console.log("Películas:", filmsName);
        console.log("Años de estreno:", filmsYear);

        // Crea la gráfica
        var data = {
            labels: filmsName,
            series: [filmsYear]
        };

        var options = {
            width: 800,
            height: 400,
            axisY: {
                onlyInteger: true, // => Devuelve sólo números enteros
                type: Chartist.FixedScaleAxis,
                low: 1970, // => Año mínimo a mostrar
                high: 2020, // => Año máximo a mostrar
                ticks: filmsYear, // => Muestra sólo los años en los que se han estrenado películas
            }
        };

        // Devuelve el resultado en una gráfica        
        return new Chartist.Line('#ct-chart', data, options);
                
    } catch (error) {
        console.log(`Error: ${error.stack}`);
        return null;
    }
}

// Llamar a la función
starWarsFilms();


/*  
2. Pediremos los personajes de Star Wars y pintaremos una gráfica de barras en la que podamos ver:
    - En el eje X el nombre del personaje
    - En el eje Y el número de películas en las que ha participado.

**API ENDPOINT --> https://swapi.info/api/people**

*/

async function starWarsPeople() {
    try {
        // Busca y extrae los datos de los personajes de Star Wars
        const peopleResponse = await fetch("https://swapi.info/api/people");
        const peopleData = await peopleResponse.json();    
        
        // Verificación 1 (Buena práctica)
        if (!peopleResponse.ok) {
            throw new Error(`Error HTTP: ${peopleResponse.status} - ${peopleResponse.statusText}`);
        }

        // Limita los personajes a los 10 primeros
            // ".slice()" es un método que recorta un array y devuelve una parte de el => peopleData.slice(inicio, fin)
        const limitedPeople = peopleData.slice(0, 10); // => Empieza en el índice 0 y termina en el 10 (incluye el 0, pero no el 10)

        // Extrae y devuelve los nombres y número de películas utilizando ".map"
        const peopleName = limitedPeople.map(person => person.name);
        const filmsNumber = limitedPeople.map(person => person.films.length);

        console.log("Nombres de personajes:", peopleName);
        console.log("Número de películas:", filmsNumber);

        // Crea la gráfica
        var data = {
            labels: peopleName,
            series: [filmsNumber]
        };

        var options = {
            width: 800,
            height: 400,
            axisY: {
                onlyInteger: true,
            }
        };

        // Devuelve el resultado en una gráfica        
        return new Chartist.Bar('#ct-chart-2', data, options);
                
    } catch (error) {
        console.log(`Error: ${error.stack}`);
        return null;
    }
}

// Llamar a la función
starWarsPeople();