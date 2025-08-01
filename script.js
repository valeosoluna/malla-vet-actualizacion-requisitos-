document.addEventListener('DOMContentLoaded', () => {
    const ramos = document.querySelectorAll('.ramo');
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');
    const totalRamos = ramos.length;

    let ramosAprobados = new Set();
    const estadoCarrera = JSON.parse(localStorage.getItem('malla_veterinaria_estado')) || {};

    // Cargar estado guardado
    ramos.forEach(ramo => {
        const codigo = ramo.dataset.codigo;
        if (estadoCarrera[codigo] === 'aprobado') {
            ramo.classList.add('aprobado');
            ramosAprobados.add(codigo);
        }
    });

    // Actualizar estados iniciales
    updateRamosState();
    updateProgress();

    ramos.forEach(ramo => {
        ramo.addEventListener('click', () => {
            if (!ramo.classList.contains('bloqueado')) {
                const codigo = ramo.dataset.codigo;
                
                if (ramo.classList.contains('aprobado')) {
                    // Si ya está aprobado, lo desapruebo (para volver atrás)
                    ramo.classList.remove('aprobado');
                    ramosAprobados.delete(codigo);
                    delete estadoCarrera[codigo];
                } else {
                    // Si no está aprobado, lo apruebo
                    ramo.classList.add('aprobado');
                    ramosAprobados.add(codigo);
                    estadoCarrera[codigo] = 'aprobado';
                }

                // Guardar estado en el almacenamiento local
                localStorage.setItem('malla_veterinaria_estado', JSON.stringify(estadoCarrera));
                
                // Actualizar la malla y la barra de progreso
                updateRamosState();
                updateProgress();
            }
        });
    });

    function updateRamosState() {
        ramos.forEach(ramo => {
            const prerequisitosStr = ramo.dataset.prerequisitos;
            const prerequisitos = JSON.parse(prerequisitosStr);
            const isAprobado = ramo.classList.contains('aprobado');

            if (isAprobado) {
                ramo.classList.remove('bloqueado');
            } else {
                const tienePrerrequisitosPendientes = prerequisitos.some(prereq => !ramosAprobados.has(String(prereq)));
                if (tienePrerrequisitosPendientes) {
                    ramo.classList.add('bloqueado');
                } else {
                    ramo.classList.remove('bloqueado');
                }
            }
        });
    }

    function updateProgress() {
        const aprobados = ramosAprobados.size;
        const porcentaje = (aprobados / totalRamos) * 100;
        const faltan = totalRamos - aprobados;

        progressBar.style.width = `${porcentaje}%`;
        progressText.textContent = `${porcentaje.toFixed(2)}% completado - Faltan ${faltan} ramos`;
    }
});
