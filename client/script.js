const tempButton = document.getElementById("bt_temp");
const voltButton = document.getElementById("bt_volt");
const medicionesButton = document.getElementById("bt_corri");

// Función para mostrar la hora y fecha
function mostrarFechaHora() {
    const timestamp = document.getElementById("timestamp");
    const ahora = new Date();
    const fechaHora = `${ahora.toLocaleDateString()} ${ahora.toLocaleTimeString()}`;
    timestamp.textContent = `Última acción: ${fechaHora}`;
}

// Actualizar las funciones de los botones para incluir mostrarFechaHora
function obtener_temperatura() {
    fetch('http://localhost:8000/temp')
        .then(res => {
            if (!res.ok) {
                throw new Error('Error en la solicitud');
            }
            return res.json();
        })
        .then(data => {
            document.getElementById("dato1").textContent = `${data.message} °C`;
        })
        .catch(error => {
            console.error("Error al obtener la temperatura:", error);
            document.getElementById("dato1").textContent = "No se pudo obtener la temperatura";
        })
        .finally(mostrarFechaHora); // Llamar a mostrarFechaHora
}

function obtener_voltaje() {
    fetch('http://localhost:8000/volt')
        .then(res => {
            if (!res.ok) {
                throw new Error('Error en la solicitud');
            }
            return res.json();
        })
        .then(data => {
            document.getElementById("dato2").textContent = `${data.message} V`;
        })
        .catch(error => {
            console.error("Error al obtener el voltaje:", error);
            document.getElementById("dato2").textContent = "No se pudo obtener el voltaje";
        })
        .finally(mostrarFechaHora); // Llamar a mostrarFechaHora
}

function obtener_corriente() {
    fetch('http://localhost:8000/corri')
        .then(res => {
            if (!res.ok) {
                throw new Error('Error en la solicitud');
            }
            return res.json();
        })
        .then(data => {
            document.getElementById("dato3").textContent = `${data.message} A`;
        })
        .catch(error => {
            console.error("Error al obtener el corriente:", error);
            document.getElementById("dato3").textContent = "No se pudo obtener el corriente";
        })
        .finally(mostrarFechaHora); // Llamar a mostrarFechaHora
}

// Asignar los eventos a los botones
tempButton.addEventListener("click", obtener_temperatura);
voltButton.addEventListener("click", obtener_voltaje);
medicionesButton.addEventListener("click", obtener_corriente);