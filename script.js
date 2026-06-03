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
    // 1er Parcial
    let gf1 = parseFloat(document.getElementById('gf1').value) || 0;
    let gp1 = parseFloat(document.getElementById('gp1').value) || 0;
    let ex1 = parseFloat(document.getElementById('ex1').value) || 0;
    
    // 2do Parcial
    let gf2 = parseFloat(document.getElementById('gf2').value) || 0;
    let gp2 = parseFloat(document.getElementById('gp2').value) || 0;
    let ex2 = parseFloat(document.getElementById('ex2').value) || 0;

    // FÓRMULA 1: Promedio parciales (Gestión formativa x 0.33 + Gestión práctica x 0.33 + Examen x 0.34)
    let prom1 = (gf1 * 0.33) + (gp1 * 0.33) + (ex1 * 0.34); 
    let prom2 = (gf2 * 0.33) + (gp2 * 0.33) + (ex2 * 0.34);

    // FÓRMULA 2: Promedio semestre ((Promedio 1er parcial + Promedio 2do parcial) / 2)
    let promSemestre = (prom1 + prom2) / 2;

    // FÓRMULA 3: Nota mínima recuperación ((7 - (0.4 * promedio semestre)) / 0.6)
    let recuperacion = 0;
    const recupElement = document.getElementById('nota-recuperacion');

    // Evaluamos si el promedio del semestre es menor a 7
    if (promSemestre < 7 && promSemestre >= 3) {
        recuperacion = (7 - (0.4 * promSemestre)) / 0.6;
    }

    // Actualizar la interfaz con 2 decimales
    document.getElementById('prom1').innerText = prom1.toFixed(2);
    document.getElementById('prom2').innerText = prom2.toFixed(2);
    document.getElementById('prom-semestre').innerText = promSemestre.toFixed(2);
    
    // Lógica visual para la nota de recuperación (Incluye la nueva regla del 3)
    if (promSemestre >= 7) {
        recupElement.innerText = "Aprobado";
        recupElement.style.color = "#4caf50"; // Verde
    } else if (promSemestre > 0 && promSemestre < 3) {
        recupElement.innerText = "Reprobado (Prom. < 3)";
        recupElement.style.color = "#f44336"; // Rojo (No alcanza el mínimo para recuperación)
    } else if (recuperacion > 10) {
        recupElement.innerText = "Reprobado (Req. > 10)";
        recupElement.style.color = "#f44336"; // Rojo (Matemáticamente imposible de alcanzar)
    } else if (recuperacion > 0) {
        recupElement.innerText = recuperacion.toFixed(2);
        recupElement.style.color = "#ff9800"; // Naranja
    } else {
        recupElement.innerText = "0.00";
        recupElement.style.color = "#ff9800"; // Naranja
    }
}