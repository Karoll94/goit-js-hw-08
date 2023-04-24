import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { galleryItems } from './gallery-items.js';
console.log(galleryItems);

//Selector del contenedor de la galeria
const contGallery = document.querySelector('.gallery');

//Creación del marcado de la galeria
const galleryMarkup = 
galleryItems.map((item) => 
`<a class ="gallery__link" 
href = "${item.original}"> 
<img class ="gallery__image"
src ="${item.preview}" 
alt = "${item.description}">`).join("");

//Insertado y ordenado de las imagenes de la galeria
contGallery.insertAdjacentHTML("afterbegin", galleryMarkup);

//Creación del evento y se quita el comportamiento por
//defecto de abrir otra página al hacer click a una imagen de la galeria.
contGallery.addEventListener("click", (event) =>
event.preventDefault());

//Creación del efecto a través de la libraría SimpleLightbox
let lightbox = new SimpleLightbox('.gallery a', {
captionsData : 'alt',
captiosDelay : 250
})