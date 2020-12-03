const btnEmpezar = document.getElementById('idBtnStart');
const board = document.getElementById('idGameBoard');
const modal = document.getElementById('idPopUp');
const ultimoLvl = 10;

//div Opciones

const opt1 = document.getElementById('opt1');
const opt2 = document.getElementById('opt2');
const opt3 = document.getElementById('opt3');
const opt4 = document.getElementById('opt4');

class Juego {
    constructor() {
        
        this.inicializar = this.inicializar.bind(this);
        this.inicializar();
        this.crearSecuencia();

        setTimeout(() => {
            this.sigueinteNivel();
        }, 1000);
        
    }

    inicializar() {
        this.elegirColor = this.elegirColor.bind(this);
        btnEmpezar.classList.add('btnStart--hidden');
        board.classList.add('gameBoard--active');
        this.level = 1;
        this.colores = {
            celeste: opt1,
            violeta: opt2,
            verde: opt3,
            naranja: opt4
        }
    }

    crearSecuencia() {
        this.secuencia = new Array(ultimoLvl).fill(0).map(n => Math.floor(Math.random() * 4));
    }

    sigueinteNivel() {
        this.subNivel = 0;
        this.iluminarSeciencia();
        this.agregarEventpClick();
    }

    transformarNaC(numero){
        switch (numero){
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'verde'
            case 3:
                return 'naranja'
        }
    }

    transformarCaN(color){
        switch (color){
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'verde':
                return 2
            case 'naranja':
                return 3
        }
    }

    iluminarSeciencia(){
        for(let i= 0; i < this.level; i++){
            const color = this.transformarNaC(this.secuencia[i]);
            const NumSecuencia = this.secuencia[i];
            setTimeout(() => this.iluminarColor(color,NumSecuencia), 1000 * i);
            //debugger
        }
    }

    iluminarColor(color, numberC) {
        var nc = numberC + 1;
        this.colores[color].classList.add('color' + nc + '--light');
        setTimeout(() => this.apagarColor(color, numberC), 700);
    }

    apagarColor(color, numberC) {
        var nc = numberC + 1;
        this.colores[color].classList.remove('color' + nc + '--light');
    }

    agregarEventpClick() {
        this.colores.celeste.addEventListener('click', this.elegirColor);
        this.colores.naranja.addEventListener('click', this.elegirColor);
        this.colores.verde.addEventListener('click', this.elegirColor);
        this.colores.violeta.addEventListener('click', this.elegirColor);
    }

    eliminarEventosClic() {
        this.colores.celeste.removeEventListener('click', this.elegirColor);
        this.colores.naranja.removeEventListener('click', this.elegirColor);
        this.colores.verde.removeEventListener('click', this.elegirColor);
        this.colores.violeta.removeEventListener('click', this.elegirColor);
    }

    elegirColor(ev) {
        //debugger
        const nombreColor = ev.target.dataset.color;
        const numColor = this.transformarCaN(nombreColor);
        this.iluminarColor(nombreColor, numColor);
        if(numColor === this.secuencia[this.subNivel]){
            this.subNivel++
            if(this.level === this.subNivel){
                this.level++
                this.eliminarEventosClic();
                //debugger
                if(this.level === (ultimoLvl + 1)){
                    this.ganoElJuego();
                }
                else{
                    setTimeout(this.sigueinteNivel.bind(this), 1500);
                }

            }
        }
        else{
            this.perdioElJuego();
        }
    }

    perdioElJuego(){
        modal.firstElementChild.children[0].src = '../img/Icon-popUp-error.svg';
        modal.firstElementChild.children[1].innerText = 'Lo Lamento Perdiste';
        modal.firstElementChild.children[2].innerText = 'Intentalo de nuevo';
        modal.classList.add('popUp--open');
        console.log('Perdio');
        this.eliminarEventosClic();
    }
    ganoElJuego() {
        modal.firstElementChild.children[0].src = '../img/Icon-popUp-info.svg';
        modal.firstElementChild.children[1].innerText = 'Felicidades Ganaste';
        modal.firstElementChild.children[2].innerText = 'Juga de nuevo';
        modal.classList.add('popUp--open');
        console.log('gano');
        this.eliminarEventosClic();
    }
}

function empezarJuego(){
    window.juego = new Juego();
}

function reiniciarJuego(){
    btnEmpezar.classList.remove('btnStart--hidden');
    modal.classList.remove('popUp--open');
}