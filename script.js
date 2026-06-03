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
    // Leer valores como texto
    let v_gf1 = document.getElementById('gf1').value;
    let v_gp1 = document.getElementById('gp1').value;
    let v_ex1 = document.getElementById('ex1').value;
    
    let v_gf2 = document.getElementById('gf2').value;
    let v_gp2 = document.getElementById('gp2').value;
    let v_ex2 = document.getElementById('ex2').value;

    // Convertir a números
    let gf1 = parseFloat(v_gf1) || 0;
    let gp1 = parseFloat(v_gp1) || 0;
    let ex1 = parseFloat(v_ex1) || 0;
    
    let gf2 = parseFloat(v_gf2) || 0;
    let gp2 = parseFloat(v_gp2) || 0;
    let ex2 = parseFloat(v_ex2) || 0;

    // FÓRMULA 1: Promedio parciales
    let prom1 = (gf1 * 0.33) + (gp1 * 0.33) + (ex1 * 0.34); 
    let prom2 = (gf2 * 0.33) + (gp2 * 0.33) + (ex2 * 0.34);

    // Los promedios parciales sí se pueden mostrar inmediatamente (si hay al menos un dato en su parcial)
    document.getElementById('prom1').innerText = (v_gf1 !== "" || v_gp1 !== "" || v_ex1 !== "") ? prom1.toFixed(2) : "0.00";
    document.getElementById('prom2').innerText = (v_gf2 !== "" || v_gp2 !== "" || v_ex2 !== "") ? prom2.toFixed(2) : "0.00";

    // FÓRMULA 2: Promedio semestre
    let promSemestre = (prom1 + prom2) / 2;

    // Elementos del DOM para los resultados finales
    const promSemestreElement = document.getElementById('prom-semestre');
    const recupElement = document.getElementById('nota-recuperacion');
    
    // Verificar los estados de los casilleros
    let todasVacias = (v_gf1 === "" && v_gp1 === "" && v_ex1 === "" && v_gf2 === "" && v_gp2 === "" && v_ex2 === "");
    let todasLlenas = (v_gf1 !== "" && v_gp1 !== "" && v_ex1 !== "" && v_gf2 !== "" && v_gp2 !== "" && v_ex2 !== "");

    if (todasVacias) {
        // ESTADO 1: Todo vacío
        promSemestreElement.innerText = "---";
        promSemestreElement.style.color = "#888888";
        
        recupElement.innerText = "Ingrese sus notas";
        recupElement.style.color = "#888888";
        
    } else if (!todasLlenas) {
        // ESTADO 2: Incompleto
        promSemestreElement.innerText = "En espera...";
        promSemestreElement.style.color = "#888888";
        
        recupElement.innerText = "Faltan notas por ingresar";
        recupElement.style.color = "#888888";
        
    } else {
        // ESTADO 3: Todo lleno. Mostrar Promedio Semestre y Calcular Recuperación
        promSemestreElement.innerText = promSemestre.toFixed(2);
        promSemestreElement.style.color = "#4caf50"; // Verde para resaltar
        
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

// Ejecutar al inicio para aplicar el estado vacío
calcularNotas();