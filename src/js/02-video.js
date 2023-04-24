//Importación de paquetes
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

//Acceso al elemnto DOM
const iframe = document.querySelector('iframe');
//Instancia de la libreria viome/player
const player = new Player(iframe);
//Obtención del tiempo actual de la reproducción del video en el local storage
const playTime = localStorage.getItem("videoplayer-current-time");

//Control del errores de reproducción del video
player.setCurrentTime(playTime).then().catch((error) => {
    switch (error.name) {
        case 'RangeError':
            console.log('the time was less than 0 or greater than the video’s duration');
            break;

        default:
            console.log('some other error occurred');
            break;
    }
});

//Función que guarda el tiempo actual de reproduccíon del video en el local storage
player.on('timeupdate', throttle(() => {
    player.getCurrentTime().then((seconds) => {
        localStorage.setItem("videoplayer-current-time", seconds)
    }).catch((error) => {
        console.log('Ha ocurrido un error!');
    });
}, 1000));
