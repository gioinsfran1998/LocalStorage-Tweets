// Variables

const listaTweets = document.getElementById('lista-tweets');



// Event Listeners

eventListeners();

function eventListeners() {

    // Cuando se envía el formulario
    document.querySelector('#formulario').addEventListener('submit',
        agregarTweet);

    // Borrar Tweets
    listaTweets.addEventListener('click', borrarTweet);

    //Contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);


}

// Funciones

// Añadir tweet del formulario
function agregarTweet(e) {
    e.preventDefault();

    // leer el valor del textarea
    const tweet = document.getElementById('tweet').value;

    console.log(tweet);

    // crear boton de elminar 
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';

    // crear elemento y añadirle el contenido a la lista
    const li = document.createElement('li');
    li.innerText = tweet;
    // añade el botón de borrar al tweet
    li.appendChild(botonBorrar);
    // añade el tweet a la lista
    listaTweets.appendChild(li);
    // Añadir al LS
    agregarTweetLocalStorage(tweet);

    // Limpia el formulario
    document.getElementById('formulario').reset();




}

// Elimina el Tweet del DOM
function borrarTweet(e) {
    e.preventDefault();

    if (e.target.className === 'borrar-tweet') {
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);


    }


}

// Mostrar datos de LocalStorage en la lista
function localStorageListo() {
    let tweets;

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet) {
        // crear boton de elminar 
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';

        // crear elemento y añadirle el contenido a la lista
        const li = document.createElement('li');
        li.innerText = tweet;
        // añade el botón de borrar al tweet
        li.appendChild(botonBorrar);
        // añade el tweet a la lista
        listaTweets.appendChild(li);

    });

}

// Agrega el Tweet al LS
function agregarTweetLocalStorage(tweet) {

    let tweets;
    tweets = obtenerTweetsLocalStorage();

    // Añadir el nuevo tweet
    tweets.push(tweet);

    //convertir de string a arreglo para local storage
    localStorage.setItem('tweets', JSON.stringify(tweets))

}

//Comprobar  que haya elementos en lS, retorna un arreglo
function obtenerTweetsLocalStorage() {
    let tweets;

    //Revisamos los valores del local storage
    if (localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }

    return tweets;

}

// Eliminar tweet de LS
function borrarTweetLocalStorage(tweet) {
    let tweets, tweetBorrar;
    //elimina la x del tweet
    tweetBorrar = tweet.substring(0, tweet.length - 1);
    console.log(tweet);
    console.log(tweetBorrar);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index) {
        if (tweetBorrar === tweet) {
            tweets.splice(index, 1);
        }
    })
    localStorage.setItem('tweets', JSON.stringify(tweets));
    console.log(tweets);
};