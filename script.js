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
    // Leer valores como texto para saber si los casilleros están vacíos
    let v_gf1 = document.getElementById('gf1').value;
    let v_gp1 = document.getElementById('gp1').value;
    let v_ex1 = document.getElementById('ex1').value;
    
    let v_gf2 = document.getElementById('gf2').value;
    let v_gp2 = document.getElementById('gp2').value;
    let v_ex2 = document.getElementById('ex2').value;

    // 1er Parcial - Convertir a números
    let gf1 = parseFloat(v_gf1) || 0;
    let gp1 = parseFloat(v_gp1) || 0;
    let ex1 = parseFloat(v_ex1) || 0;
    
    // 2do Parcial - Convertir a números
    let gf2 = parseFloat(v_gf2) || 0;
    let gp2 = parseFloat(v_gp2) || 0;
    let ex2 = parseFloat(v_ex2) || 0;

    // FÓRMULA 1: Promedio parciales
    let prom1 = (gf1 * 0.33) + (gp1 * 0.33) + (ex1 * 0.34); 
    let prom2 = (gf2 * 0.33) + (gp2 * 0.33) + (ex2 * 0.34);

    // FÓRMULA 2: Promedio semestre
    let promSemestre = (prom1 + prom2) / 2;

    // Actualizar la interfaz de promedios con 2 decimales
    document.getElementById('prom1').innerText = prom1.toFixed(2);
    document.getElementById('prom2').innerText = prom2.toFixed(2);
    document.getElementById('prom-semestre').innerText = promSemestre.toFixed(2);
    
    // LÓGICA DE RECUPERACIÓN
    const recupElement = document.getElementById('nota-recuperacion');
    
    // Nueva validación: Comprobar si al menos un campo del 2do parcial tiene datos
    let tieneDatosSegundoParcial = v_gf2 !== "" || v_gp2 !== "" || v_ex2 !== "";

    if (!tieneDatosSegundoParcial) {
        // Si no hay datos del 2do parcial, mostramos un mensaje neutro
        recupElement.innerText = "Faltan notas 2do Parcial";
        recupElement.style.color = "#888888"; // Color gris apagado
    } else {
        // Si YA HAY datos en el 2do parcial, aplicamos las fórmulas y reglas
        let recuperacion = 0;

        if (promSemestre < 7 && promSemestre >= 3) {
            recuperacion = (7 - (0.4 * promSemestre)) / 0.6;
        }

        if (promSemestre >= 7) {
            recupElement.innerText = "Aprobado";
            recupElement.style.color = "#4caf50"; // Verde
        } else if (promSemestre > 0 && promSemestre < 3) {
            recupElement.innerText = "Reprobado (Prom. < 3)";
            recupElement.style.color = "#f44336"; // Rojo
        } else if (recuperacion > 10) {
            recupElement.innerText = "Reprobado (Req. > 10)";
            recupElement.style.color = "#f44336"; // Rojo
        } else if (recuperacion > 0) {
            recupElement.innerText = recuperacion.toFixed(2);
            recupElement.style.color = "#ff9800"; // Naranja
        } else {
            recupElement.innerText = "0.00";
            recupElement.style.color = "#ff9800"; // Naranja
        }
    }
}