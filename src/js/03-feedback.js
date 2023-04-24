//Importación de paquetes
import throttle from 'lodash.throttle';

//Acceso al elemento DOM
const values = document.querySelector('.feedback-form');
const childrens = values.children;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Adicion de selectores de clase a los elementos del formulario
for (let element of childrens) {
    if (element.firstElementChild != null) {
        element.firstElementChild.classList.add(`feedback-form__${element.firstElementChild.getAttribute('name')}`);
    } else {
        element.classList.add(`feedback-form__${element.getAttribute('type')}`);
    };

};

// Obtencion de las referencias de clase de los selectores del formulario
const [emailSelector, messageSelector, btnSelector] = values.querySelectorAll('.feedback-form__email, .feedback-form__message, .feedback-form__submit');


//Objeto de inicio de valores
let formValues = {
    email: "fakemail@fake.com",
    message: "new001",
};

// Fijacion de los valores guardados en localStorage en el formulario
const formValueSaved = localStorage.getItem("feedback-form-state");
const feedback = JSON.parse(formValueSaved);
if (formValueSaved != null) {
    emailSelector.value = feedback.email;
    messageSelector.value = feedback.message;
};

// Funcion callback que guarda los valores en localStorage
const setFormValues = () => {
    formValues = { email: emailSelector.value, message: messageSelector.value };
    localStorage.setItem('feedback-form-state', JSON.stringify(formValues));
};

// Funcion que borra los valores del localStorage y muestra en consola
const removePrintFormValues = (event) => {
    if (emailRegex.test(emailSelector.value)) {        
        event.preventDefault();
        console.log(formValues);
        emailSelector.value = '';
        messageSelector.value = ''; 
        localStorage.removeItem('feedback-form-state');
    } else {
        alert('El correo no tiene formato adecuado')
    };
};


//Evento input que dispara la funcion callback cada que se teclea
values.addEventListener('input', throttle(setFormValues, 500) );
//Evento que dispara la funcion callback al hacer click
btnSelector.addEventListener('click', removePrintFormValues);



