// Seleccionamos todos los campos de entrada de tipo numérico
const inputs = document.querySelectorAll('input[type="number"]');

// Asignamos un evento a cada campo para monitorear lo que el usuario escribe
inputs.forEach(input => {
    input.addEventListener('input', (event) => {
        let valorIngresado = parseFloat(event.target.value);
        let valorMaximo = parseFloat(event.target.getAttribute('max'));

        // Bloqueo 1: Evitar que se escriban números negativos
        if (valorIngresado < 0) {
            event.target.value = 0;
        } 
        // Bloqueo 2: Evitar que el número exceda el límite definido en el HTML (10)
        else if (valorMaximo && valorIngresado > valorMaximo) {
            event.target.value = valorMaximo;
        }

        // Ejecutar los cálculos matemáticos tras cualquier cambio
        calcularNotas();
    });
});

// Funcion principal que realiza todos los cálculos
function calcularNotas() {
    // 1. Lectura de campos del Primer Parcial como texto
    let v_gf1 = document.getElementById('gf1').value;
    let v_gp1 = document.getElementById('gp1').value;
    let v_ex1 = document.getElementById('ex1').value;
    
    // 2. Lectura de campos del Segundo Parcial como texto
    let v_gf2 = document.getElementById('gf2').value;
    let v_gp2 = document.getElementById('gp2').value;
    let v_ex2 = document.getElementById('ex2').value;

    // Convertir el texto a números para poder realizar operaciones (Asume 0 si está vacío)
    let gf1 = parseFloat(v_gf1) || 0;
    let gp1 = parseFloat(v_gp1) || 0;
    let ex1 = parseFloat(v_ex1) || 0;
    
    let gf2 = parseFloat(v_gf2) || 0;
    let gp2 = parseFloat(v_gp2) || 0;
    let ex2 = parseFloat(v_ex2) || 0;

    // FÓRMULA DE PARCIALES: Aplicar porcentajes oficiales (33%, 33%, 34%)
    let prom1 = (gf1 * 0.33) + (gp1 * 0.33) + (ex1 * 0.34); 
    let prom2 = (gf2 * 0.33) + (gp2 * 0.33) + (ex2 * 0.34);

    // Actualizar visualmente los parciales en tiempo real solo si tienen datos
    document.getElementById('prom1').innerText = (v_gf1 !== "" || v_gp1 !== "" || v_ex1 !== "") ? prom1.toFixed(2) : "0.00";
    document.getElementById('prom2').innerText = (v_gf2 !== "" || v_gp2 !== "" || v_ex2 !== "") ? prom2.toFixed(2) : "0.00";

    // FÓRMULA DE SEMESTRE: Promedio de los dos parciales
    let promSemestre = (prom1 + prom2) / 2;

    // Referencias a los elementos HTML de los resultados finales
    const promSemestreElement = document.getElementById('prom-semestre');
    const recupElement = document.getElementById('nota-recuperacion');
    
    // Comprobar si las casillas están completamente vacías o completamente llenas
    let todasVacias = (v_gf1 === "" && v_gp1 === "" && v_ex1 === "" && v_gf2 === "" && v_gp2 === "" && v_ex2 === "");
    let todasLlenas = (v_gf1 !== "" && v_gp1 !== "" && v_ex1 !== "" && v_gf2 !== "" && v_gp2 !== "" && v_ex2 !== "");

    // GESTIÓN DE ESTADOS VISUALES
    if (todasVacias) {
        // Estado inicial de la página
        promSemestreElement.innerText = "---";
        promSemestreElement.style.color = "#888888";
        
        recupElement.innerText = "Ingrese sus notas";
        recupElement.style.color = "#888888";
        
    } else if (!todasLlenas) {
        // Estado intermedio: Faltan datos para un resultado preciso
        promSemestreElement.innerText = "En espera...";
        promSemestreElement.style.color = "#888888";
        
        recupElement.innerText = "Faltan notas por ingresar";
        recupElement.style.color = "#888888";
        
    } else {
        // Estado final: Los 6 campos tienen información, se muestra el promedio y se evalúa la recuperación
        promSemestreElement.innerText = promSemestre.toFixed(2);
        promSemestreElement.style.color = "#4caf50";
        
        let recuperacion = 0;

        // Regla: Solo hay recuperación si el promedio es igual o mayor a 3, y menor a 7
        if (promSemestre < 7 && promSemestre >= 3) {
            recuperacion = (7 - (0.4 * promSemestre)) / 0.6;
        }

        // Mostrar los veredictos finales según el promedio alcanzado
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

// Inicializar la interfaz vacía al cargar la página por primera vez
calcularNotas();

// --- LÓGICA DE REPRODUCCIÓN DE MÚSICA ---
const musicBtn = document.getElementById('music-btn');
const bgMusic = document.getElementById('bg-music');
let isPlaying = false;
let primeraInteraccion = false;

// Configurar música como sonido de fondo sutil (30% de volumen)
bgMusic.volume = 0.3; 

// Evento: Reproducir automáticamente al hacer clic en cualquier parte de la página
document.body.addEventListener('click', (event) => {
    // Solo se activa si es el primer clic y si no se hizo clic sobre el botón mismo
    if (!primeraInteraccion && event.target.id !== 'music-btn') {
        bgMusic.play().then(() => {
            isPlaying = true;
            primeraInteraccion = true;
            
            // Cambiar la etiqueta y el color del botón visualmente
            musicBtn.innerText = "Pausar Musica";
            musicBtn.style.backgroundColor = "#4da6ff";
            musicBtn.style.color = "#000";
        }).catch(error => {
            console.log(error); // Evita que la consola marque un error si el navegador bloquea el audio
        });
    }
});

// Evento: Control manual mediante el botón de música
musicBtn.addEventListener('click', () => {
    primeraInteraccion = true; // Registramos que el usuario ya interactuó
    
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
    // Invertir el estado de reproducción
    isPlaying = !isPlaying;
});