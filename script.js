const inputs = document.querySelectorAll('input[type="number"]');

inputs.forEach(input => {
    input.addEventListener('input', (event) => {
        let valorIngresado = parseFloat(event.target.value);
        let valorMaximo = parseFloat(event.target.getAttribute('max'));

        if (valorIngresado < 0) {
            event.target.value = 0;
        } 
        else if (valorMaximo && valorIngresado > valorMaximo) {
            event.target.value = valorMaximo;
        }

        calcularNotas();
    });
});

function calcularNotas() {
    let v_gf1 = document.getElementById('gf1').value;
    let v_gp1 = document.getElementById('gp1').value;
    let v_ex1 = document.getElementById('ex1').value;
    
    let v_gf2 = document.getElementById('gf2').value;
    let v_gp2 = document.getElementById('gp2').value;
    let v_ex2 = document.getElementById('ex2').value;

    let gf1 = parseFloat(v_gf1) || 0;
    let gp1 = parseFloat(v_gp1) || 0;
    let ex1 = parseFloat(v_ex1) || 0;
    
    let gf2 = parseFloat(v_gf2) || 0;
    let gp2 = parseFloat(v_gp2) || 0;
    let ex2 = parseFloat(v_ex2) || 0;

    let prom1 = (gf1 * 0.33) + (gp1 * 0.33) + (ex1 * 0.34); 
    let prom2 = (gf2 * 0.33) + (gp2 * 0.33) + (ex2 * 0.34);

    document.getElementById('prom1').innerText = (v_gf1 !== "" || v_gp1 !== "" || v_ex1 !== "") ? prom1.toFixed(2) : "0.00";
    document.getElementById('prom2').innerText = (v_gf2 !== "" || v_gp2 !== "" || v_ex2 !== "") ? prom2.toFixed(2) : "0.00";

    let promSemestre = (prom1 + prom2) / 2;

    const promSemestreElement = document.getElementById('prom-semestre');
    const recupElement = document.getElementById('nota-recuperacion');
    
    let todasVacias = (v_gf1 === "" && v_gp1 === "" && v_ex1 === "" && v_gf2 === "" && v_gp2 === "" && v_ex2 === "");
    let todasLlenas = (v_gf1 !== "" && v_gp1 !== "" && v_ex1 !== "" && v_gf2 !== "" && v_gp2 !== "" && v_ex2 !== "");

    if (todasVacias) {
        promSemestreElement.innerText = "---";
        promSemestreElement.style.color = "#888888";
        
        recupElement.innerText = "Ingrese sus notas";
        recupElement.style.color = "#888888";
        
    } else if (!todasLlenas) {
        promSemestreElement.innerText = "En espera...";
        promSemestreElement.style.color = "#888888";
        
        recupElement.innerText = "Faltan notas por ingresar";
        recupElement.style.color = "#888888";
        
    } else {
        promSemestreElement.innerText = promSemestre.toFixed(2);
        promSemestreElement.style.color = "#4caf50";
        
        let recuperacion = 0;

        if (promSemestre < 7 && promSemestre >= 3) {
            recuperacion = (7 - (0.4 * promSemestre)) / 0.6;
        }

        if (promSemestre >= 7) {
            recupElement.innerText = "Aprobado";
            recupElement.style.color = "#4caf50"; 
        } else if (promSemestre < 3) {
            recupElement.innerText = "Reprobado (Prom. < 3)";
            recupElement.style.color = "#f44336"; 
        } else if (recuperacion > 10) {
            recupElement.innerText = "Reprobado (Req. > 10)";
            recupElement.style.color = "#f44336"; 
        } else {
            recupElement.innerText = recuperacion.toFixed(2);
            recupElement.style.color = "#ff9800"; 
        }
    }
}

calcularNotas();

const musicBtn = document.getElementById('music-btn');
const bgMusic = document.getElementById('bg-music');
let isPlaying = false;
let primeraInteraccion = false;

bgMusic.volume = 0.3; 

document.body.addEventListener('click', (event) => {
    if (!primeraInteraccion && event.target.id !== 'music-btn') {
        bgMusic.play().then(() => {
            isPlaying = true;
            primeraInteraccion = true;
            
            musicBtn.innerText = "Pausar Musica";
            musicBtn.style.backgroundColor = "#4da6ff";
            musicBtn.style.color = "#000";
        }).catch(error => {
            console.log(error);
        });
    }
});

musicBtn.addEventListener('click', () => {
    primeraInteraccion = true; 
    
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.innerText = "Reproducir Musica";
        musicBtn.style.backgroundColor = "rgba(30, 30, 30, 0.7)";
        musicBtn.style.color = "#4da6ff";
    } else {
        bgMusic.play();
        musicBtn.innerText = "Pausar Musica";
        musicBtn.style.backgroundColor = "#4da6ff";
        musicBtn.style.color = "#000";
    }
    isPlaying = !isPlaying;
});