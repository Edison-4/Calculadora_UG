// Obtener todos los inputs
const inputs = document.querySelectorAll('input[type="number"]');

// Agregar evento para que calcule automáticamente al escribir
inputs.forEach(input => {
    input.addEventListener('input', calcularNotas);
});

function calcularNotas() {
    // 1er Parcial - Obtener valores (si está vacío, asume 0)
    let gf1 = parseFloat(document.getElementById('gf1').value) || 0;
    let gp1 = parseFloat(document.getElementById('gp1').value) || 0;
    let ex1 = parseFloat(document.getElementById('ex1').value) || 0;
    
    // 2do Parcial - Obtener valores
    let gf2 = parseFloat(document.getElementById('gf2').value) || 0;
    let gp2 = parseFloat(document.getElementById('gp2').value) || 0;
    let ex2 = parseFloat(document.getElementById('ex2').value) || 0;

    // Calcular promedios de los parciales (Ajusta la fórmula si es promedio en lugar de suma)
    let prom1 = gf1*0.33 + gp1*0.33 + ex1*0.34; 
    let prom2 = gf2*0.33 + gp2*0.33 + ex2*0.34;

    // Calcular semestre (Suma de ambos parciales, asumiendo que se aprueba con 14 sobre 20)
    let promSemestre = (prom1 + prom2)/2;

    // Calcular nota mínima de recuperación
    // En tu Excel mencionas 11.666. Ajusta esta fórmula según la ley de la facultad.
    // Ejemplo ficticio: Si necesitas 14 para pasar, y el sistema penaliza algo:
    let recuperacion = 0;
    if (promSemestre < 14 && promSemestre > 0) {
        // Coloca aquí la fórmula exacta que usa el sistema de tu universidad
        recuperacion = (7-(0.4*promSemestre))/0.6; // Placeholder simple
    }

    // Actualizar la interfaz (el DOM)
    document.getElementById('prom1').innerText = prom1.toFixed(2);
    document.getElementById('prom2').innerText = prom2.toFixed(2);
    document.getElementById('prom-semestre').innerText = promSemestre.toFixed(2);
    document.getElementById('nota-recuperacion').innerText = recuperacion > 0 ? recuperacion.toFixed(2) : "recuperacion";
}