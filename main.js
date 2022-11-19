//Inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 30;
let tiempoRegresivo = null;

//apuntando a documento HTML
let mostrarMovimientos = document.getElementById('movimientos')
let mostarAciertos = document.getElementById('aciertos')
let mostrarTiempo = document.getElementById('t-restante')

let winAudio = new Audio('./sounds/win.wav');
let loseAudio = new Audio('./sounds/lose.wav');
let clickAudio = new Audio('./sounds/click.wav');
let rightAudio = new Audio('./sounds/right.wav');
let wrongAudio = new Audio('./sounds/wrong.wav');

//generacion de numeros aleatoreos
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort( ()=>{return Math.random() -0.5});
console.log(numeros);

//Funciones
function contarTiempo(){
  tiempoRegresivo = setInterval(()=>{
    timer--;
    mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
    if(timer == 0){
      clearInterval(tiempoRegresivo)
      bloquearTarjetas(numeros);
      loseAudio.play();
    }
  },1000)
}

function bloquearTarjetas(){
  for(let i = 0; i<=15; i++){
    tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = `<img src="./img/${numeros[i]}.png" alt>`;
    tarjetaBloqueada.disabled = true;
  }
}

//Funcion principal
function destapar(id){

if(temporizador == false){
  contarTiempo();
  temporizador = true;
}

  tarjetasDestapadas++;
  
  if(tarjetasDestapadas == 1){
    //mostrar el primer numero
    tarjeta1 = document.getElementById(id);
    primerResultado = numeros[id];
    tarjeta1.innerHTML = `<img src="./img/${primerResultado}.png" alt>`;
    clickAudio.play();

    //Desabilitar primer boton
    tarjeta1.disabled = true;
  }else if(tarjetasDestapadas == 2){
    //mostrar segundo numero
    tarjeta2 = document.getElementById(id);
    segundoResultado = numeros[id]
    tarjeta2.innerHTML = `<img src="./img/${segundoResultado}.png" alt>`;

    //desabilitar segundo numero
    tarjeta2.disabled = true;

    //incrementar movimientos
    movimientos++;
    mostrarMovimientos.innerHTML = `movimientos: ${movimientos}`

    if(primerResultado == segundoResultado){
      //Encerar contador tarjetas destapadas
      tarjetasDestapadas = 0;

      //Aumentar aciertos
      aciertos++;
      mostarAciertos.innerHTML = `Aciertos: ${aciertos}`;
      rightAudio.play();

      if(aciertos == 8){
        winAudio.play();
        clearInterval(tiempoRegresivo)
        mostarAciertos.innerHTML = `Aciertos: ${aciertos} 😱`;
        mostrarTiempo.innerHTML = `Sorprendente 🎉 sólo te demoraste ${timerInicial - timer} segundos 🥳`
        mostrarMovimientos.innerHTML =  `movimientos: ${movimientos} 🤟😎`
      }
    }else{
      wrongAudio.play();
      //Monstar momentaneamente valores y volver a tapar
      setTimeout(()=>{
        tarjeta1.innerHTML = '   '
        tarjeta2.innerHTML = '   '
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasDestapadas = 0;
      },800);
    }
  }
}

//Boton de reinicio
let refresh = document.getElementById('refresh');
refresh.addEventListener('click', _ => {
            location.reload();
})
