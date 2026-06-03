// Obtener todos los inputs
const inputs = document.querySelectorAll('input[type="number"]');

// Agregar evento para vigilar lo que se escribe
inputs.forEach(input => {
    input.addEventListener('input', (event) => {
        let valorIngresado = parseFloat(event.target.value);
        let valorMaximo = parseFloat(event.target.getAttribute('max'));

        // 1. Evitar números negativos
        if (valorIngresado < 0) {
            event.target.value = 0;
        } 
        // 2. Evitar que se pasen del límite máximo (10)
        else if (valorMaximo && valorIngresado > valorMaximo) {
            event.target.value = valorMaximo;
        }

        // Llamar a la función de cálculo
        calcularNotas();
    });
});

function calcularNotas() {
    // Leer valores como texto para saber exactamente si la casilla está vacía
    let v_gf1 = document.getElementById('gf1').value;
    let v_gp1 = document.getElementById('gp1').value;
    let v_ex1 = document.getElementById('ex1').value;
    
    let v_gf2 = document.getElementById('gf2').value;
    let v_gp2 = document.getElementById('gp2').value;
    let v_ex2 = document.getElementById('ex2').value;

    // Convertir a números para hacer las matemáticas (si está vacío, asume 0 para la suma)
    let gf1 = parseFloat(v_gf1) || 0;
    let gp1 = parseFloat(v_gp1) || 0;
    let ex1 = parseFloat(v_ex1) || 0;
    
    let gf2 = parseFloat(v_gf2) || 0;
    let gp2 = parseFloat(v_gp2) || 0;
    let ex2 = parseFloat(v_ex2) || 0;

    // FÓRMULA 1: Promedio parciales
    let prom1 = (gf1 * 0.33) + (gp1 * 0.33) + (ex1 * 0.34); 
    let prom2 = (gf2 * 0.33) + (gp2 * 0.33) + (ex2 * 0.34);

    // FÓRMULA 2: Promedio semestre
    let promSemestre = (prom1 + prom2) / 2;

    // Actualizar la interfaz de los promedios con 2 decimales
    document.getElementById('prom1').innerText = prom1.toFixed(2);
    document.getElementById('prom2').innerText = prom2.toFixed(2);
    document.getElementById('prom-semestre').innerText = promSemestre.toFixed(2);
    
    // LÓGICA DE RECUPERACIÓN (Manejo de Estados)
    const recupElement = document.getElementById('nota-recuperacion');
    
    // Verificar los estados de los casilleros
    let todasVacias = (v_gf1 === "" && v_gp1 === "" && v_ex1 === "" && v_gf2 === "" && v_gp2 === "" && v_ex2 === "");
    let todasLlenas = (v_gf1 !== "" && v_gp1 !== "" && v_ex1 !== "" && v_gf2 !== "" && v_gp2 !== "" && v_ex2 !== "");

    if (todasVacias) {
        // ESTADO 1: El usuario acaba de entrar a la página y no ha escrito nada
        recupElement.innerText = "Ingrese sus notas";
        recupElement.style.color = "#888888"; // Gris
        
    } else if (!todasLlenas) {
        // ESTADO 2: El usuario empezó a escribir, pero dejó alguna casilla en blanco
        recupElement.innerText = "Faltan notas por ingresar";
        recupElement.style.color = "#888888"; // Gris
        
    } else {
        // ESTADO 3: Las 6 casillas tienen números. ¡A calcular la verdad!
        let recuperacion = 0;

        if (promSemestre < 7 && promSemestre >= 3) {
            recuperacion = (7 - (0.4 * promSemestre)) / 0.6;
        }

        if (promSemestre >= 7) {
            recupElement.innerText = "Aprobado";
            recupElement.style.color = "#4caf50"; // Verde
        } else if (promSemestre < 3) {
            recupElement.innerText = "Reprobado (Prom. < 3)";
            recupElement.style.color = "#f44336"; // Rojo
        } else if (recuperacion > 10) {
            recupElement.innerText = "Reprobado (Req. > 10)";
            recupElement.style.color = "#f44336"; // Rojo
        } else {
            recupElement.innerText = recuperacion.toFixed(2);
            recupElement.style.color = "#ff9800"; // Naranja
        }
    }
}

// Ejecutamos la función una vez apenas carga el script para que el mensaje inicial 
// sea "Ingrese sus notas" en lugar del "0.00" que está por defecto en el HTML.
calcularNotas();