
import html from './app.html?raw';

export const App = (elementId) =>{
// cuando la funcion app() se llama
    (()=>{
        const app = document.createElement ('div');
        app.innerHTML = html ;
        document.querySelector(elementId).append ( app );

    }) ();


}


