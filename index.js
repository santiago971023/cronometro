
const btn_pause = document.getElementById('pause');
const btn_detener = document.getElementById('detener');
const btn_play = document.getElementById('play');
const segundero = document.getElementById('segundero');
const display = document.getElementById('display');

let segundos,
    idInterval,
    tiempoInicio = null;

let diferenciaDeTiempo = 0;


//Inicializamos el display en 0
display.textContent = "00:00.0";



// Agregar 0 si hace falta

const agregarCero = valor => {
    if(valor<10){
        return "0" + valor;
    }else{
        return "" + valor;
    }
}




//  MOVER O NO EL SEGUNDERO
function empezar_segundero(){
    segundero.style.animationPlayState="running";
}
function detener_segundero(){
    segundero.style.animationPlayState="paused";
}

btn_play.addEventListener('click',()=>{
    empezar_segundero();
})

btn_pause.addEventListener('click',()=>{
    detener_segundero();
})


//   CONVERTIR MILISEGUNDOS a SEGUNDOS Y MINUTOS
const milisegundosAMinutosYSegundos = (milisegundos) => {
    const minutos = parseInt(milisegundos / 60000);
    milisegundos -= minutos * 60000;
    segundos = milisegundos / 1000;
    return `${agregarCero(minutos)}:${agregarCero(segundos.toFixed(2))}`;
}



//    OBTENER LA HORA

const iniciar = () => {
    //obtengo la hora
    const ahora = new Date();
    //Se obtiene el valor del tiempo de inicio (la diferencia de tiempo nos va a servir para la pausa)
    tiempoInicio = new Date(ahora.getTime() - diferenciaDeTiempo);
    clearInterval(idInterval);
    // Llamamos a actualizar cada 100 milisegundos para que muestre la variable resta, la cual es una resta entre un Date de Ahora y el tiempo de inicio (mommento en el cual se empezó a contar el tiempo)
    idInterval = setInterval(actualizar, 100);
    
}



// Esta función lo único que hace es calcular la diferencia de tiempo entre el ahora, menos el tiempo de inicio
const actualizar = () => {
    const ahora = new Date();  //Creo variable con el ahora
    const resta = ahora.getTime() - tiempoInicio.getTime();  //Resto el momento inicial al ahora
    display.textContent = milisegundosAMinutosYSegundos(resta);   //Y en el display (elemento HTML) agrego texto por medio de una función y muestro el resultado de la diferencia
    segundero.style.animation = "rotation 60s linear infinite";
}


const pausar = () => {
    diferenciaDeTiempo = new Date() - tiempoInicio.getTime();
    clearInterval(idInterval);
}

const detener = () => {
    
    clearInterval(idInterval)
    diferenciaDeTiempo = 0;
    display.textContent = "00:00.0";
    segundero.style.transform = 'rotate(-90deg) translate(125px)';
    segundero.style.animation = 'none'
    

    
}







btn_play.addEventListener('click', ()=> {
    iniciar();
    actualizar();
    
    btn_play.style.zIndex = "-1";
    
})

btn_pause.addEventListener('click',()=>{
    pausar();
    btn_play.style.zIndex = "0";
})



btn_detener.addEventListener('click',()=>{
    detener_segundero();
    detener();
    btn_play.style.zIndex = "0";
    
})


