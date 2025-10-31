let active_escenario_filter = 'todos'; 
let active_dia_filter = 'todos';

const setActiveButton = (containerId, dataAttribute, value) => {
    const container = document.getElementById(containerId);
    if (container) {
        container.querySelectorAll('.btn-filtro').forEach(btn => {
            if (btn.getAttribute(dataAttribute) === value) {
                btn.classList.add('activo');
            } else {
                btn.classList.remove('activo');
            }
        });
    }
};

const horario_festival = [
    {
        artista: "Kraftwerk",
        escenario: "Principal", 
        hora_inicio: "18:00",
        hora_fin: "19:30",
        foto: "images/202444-Kraftwerk.jpg"
    },
    {
        artista: "Justice",
        escenario: "Principal", 
        hora_inicio: "20:00",
        hora_fin: "21:30",
        foto: "images/z10815673AMP,Justice.jpg"
    },
    {
        artista: "The Prodigy ",
        escenario: "Principal", 
        hora_inicio: "22:00",
        hora_fin: "23:59",
        foto: "images/IMG_0978.JPG"
    },
    {
        artista: "Hot Chip",
        escenario: "Secundario", 
        hora_inicio: "17:30",
        hora_fin: "19:00",
        foto: "images/IMG_0979.PNG"
    },
    {
        artista: "Calvin Harris",
        escenario: "Secundario", 
        hora_inicio: "19:30",
        hora_fin: "21:00",
        foto: "images/IMG_0980.WEBP"
    },
    {
        artista: "Depeche Mode",
        escenario: "Secundario", 
        hora_inicio: "21:30",
        hora_fin: "23:00",
        foto: "images/IMG_0981.WEBP"
    },
    {
        artista: "New Order",
        escenario: "Electrónico", 
        hora_inicio: "20:00",
        hora_fin: "22:00",
        foto: "images/IMG_0982.WEBP"
    },
    {
        artista: "The Chemical Brothers",
        escenario: "Electrónico", 
        hora_inicio: "22:30",
        hora_fin: "00:30",
        foto: "images/IMG_0983.JPG"
    },
    {
        artista: "The Weeknd",
        escenario: "Electrónico", 
        hora_inicio: "01:00",
        hora_fin: "03:00",
        foto: "images/IMG_0984.JPG"
    }
];



function mostrar_horario() { 
    const contenedor_html = document.getElementById("lista_actuaciones");
    const horario_filtrado = horario_festival.filter(actuacion => {
        const stageMatch = active_escenario_filter === 'todos' || actuacion.escenario === active_escenario_filter;
        const dayMatch = active_dia_filter === 'todos' || actuacion.dia === parseInt(active_dia_filter);
        return stageMatch && dayMatch;
    });

    
    let lista_actuaciones_html = '<div id="lineup-grid">'; 

    if (horario_filtrado.length === 0) {
        lista_actuaciones_html += `<p style="color: var(--color-error); text-align: center; grid-column: 1 / -1;">No se encontraron artistas que coincidan con los filtros seleccionados.</p>`;
    } else {
         horario_filtrado.forEach(actuacion => {
            lista_actuaciones_html += `
                <div class="artista-card">
                    <img src="${actuacion.foto}" alt="Foto del artista ${actuacion.artista}">
                    <h3>${actuacion.artista}</h3>
                    
                    <p class="escenario">Escenario: ${actuacion.escenario}</p> 
                    
                    <p class="horario">${actuacion.hora_inicio} - ${actuacion.hora_fin}</p>
                    <a href="#tickets" class="btn-cta small">¡Ver Ticket!</a>
                </div>
            `;
        });
    }
    
    lista_actuaciones_html += '</div>';

    if (contenedor_html) {
         contenedor_html.innerHTML = lista_actuaciones_html;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    
    const rootStyles = getComputedStyle(document.documentElement);
    const colorError = rootStyles.getPropertyValue('--color-error').trim(); 


setActiveButton('filtro-etapy', 'data-escenario', active_escenario_filter);
const filtroEtapy = document.getElementById('filtro-etapy');
if (filtroEtapy) {
    filtroEtapy.addEventListener('click', (e) => {
        if (!e.target.classList.contains('btn-filtro')) return;
        if (e.target.dataset.escenario) {
            active_escenario_filter = e.target.dataset.escenario; 
            setActiveButton('filtro-etapy', 'data-escenario', active_escenario_filter);
            mostrar_horario(); 
        }
    });
}

mostrar_horario(); 

    const menuToggle = document.getElementById('menu-toggle');
    const menuDesplegable = document.getElementById('menu-desplegable');

    if (menuToggle && menuDesplegable) {
        menuToggle.addEventListener('click', () => {
            menuDesplegable.classList.toggle('activo');
        });
        
        const enlaces = menuDesplegable.querySelectorAll('a');
        enlaces.forEach(enlace => {
            enlace.addEventListener('click', () => {
                menuDesplegable.classList.remove('activo');
            });
        });
    }

    const form = document.getElementById('formulario-reserva');
    const nombreInput = document.getElementById('nombre'); 
    const emailInput = document.getElementById('email');
    const emailConfirmInput = document.getElementById('email-confirm');
    const errorMessage = document.getElementById('error-message');
    const checkboxAcepto = document.getElementById('acepto');

    const resetErrorStyle = (input) => {
        input.style.borderColor = '';
        input.title = ''; 
    };

     const setErrorStyle = (input, message, color) => {
        input.style.borderColor = color;
        input.title = message;
    };

    nombreInput.addEventListener('input', () => {
        if (nombreInput.value.length >= 3) {
            resetErrorStyle(nombreInput);
        }
    });

    emailInput.addEventListener('input', () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
        if (emailRegex.test(emailInput.value)) {
            resetErrorStyle(emailInput);
        }
       
        if (emailInput.value === emailConfirmInput.value) {
            resetErrorStyle(emailConfirmInput);
        }
    });

    emailConfirmInput.addEventListener('input', () => {
        if (emailInput.value === emailConfirmInput.value) {
            resetErrorStyle(emailConfirmInput);
        }
    });

     if (form) { 
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            errorMessage.textContent = '';
            errorMessage.style.display = 'none';
            resetErrorStyle(nombreInput);
            resetErrorStyle(emailInput);
            resetErrorStyle(emailConfirmInput);
            
            let esValido = true;

            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
            
            
            if (nombreInput.value.length < 3) {
                esValido = false;
                setErrorStyle(nombreInput, 'El nombre debe tener al menos 3 caracteres.', colorError);
                errorMessage.textContent = 'ERROR: El nombre debe tener al menos 3 caracteres.';
            }

            if (!emailRegex.test(emailInput.value)) {
                esValido = false;
                setErrorStyle(emailInput, 'Formato de correo electrónico no válido.', colorError);
                if (esValido) errorMessage.textContent = 'ERROR: Formato de correo electrónico no válido.';
            } 

            if (emailInput.value !== emailConfirmInput.value) {
                esValido = false;
                setErrorStyle(emailConfirmInput, 'Los correos electrónicos no coinciden.', colorError);
                if (esValido) errorMessage.textContent = 'ERROR: Los correos electrónicos no coinciden.';
            } 
            
            if (!checkboxAcepto.checked) {
                esValido = false;
                if (esValido) errorMessage.textContent = 'ERROR: Debe aceptar los términos y condiciones.';
            }

            if (esValido) {
                alert('¡Reserva completada con éxito! Gracias por su reserva!');
                form.reset();
            } else {
                errorMessage.style.display = 'block';
            }
        });
    }

    const modalContainer = document.getElementById('modal-container');
    const btnCerrar = document.getElementById('cerrar-modal');
    const modalText = document.getElementById('modal-text');

    const btnAbrirFaq = document.getElementById('abrir-modal-faq');
    const btnAbrirVip = document.getElementById('abrir-modal-vip');

    function abrirModal(contenido) {
        if (modalText && modalContainer) {
            modalText.innerHTML = contenido;
            modalContainer.style.display = 'block';
        }
    }


    if(btnAbrirFaq) { 
        btnAbrirFaq.addEventListener('click', () => { 
            const contenidoFAQ = `
                <h4>Preguntas Frecuentes (FAQ)</h4>
                <p><strong>¿Cuándo y dónde es el festival?</strong> Del 15 al 17 de Agosto en el Movistar Arena en Madrid.</p>
                <p><strong>¿Se puede acampar?</strong> No, no se permite acampar. Consulte nuestra sección de alojamiento.</p>
                <p><strong>¿Hay comida vegana?</strong> Sí, tenemos múltiples opciones veganas y sin gluten.</p>
            `;
            abrirModal(contenidoFAQ);
        });
    }

    if(btnAbrirVip) { 
        btnAbrirVip.addEventListener('click', () => { 
            const contenidoVIP = `
                <h4>Información Abono VIP</h4>
                <p>El abono VIP incluye: Acceso prioritario, zona exclusiva con barra premium, baños privados y una bolsa de bienvenida con merchandising oficial.</p>
                <p>¡Disfruta del Festival PULSAR al máximo nivel!</p>
            `;
            abrirModal(contenidoVIP);
        });
    }


    if(btnCerrar) {
        btnCerrar.addEventListener('click', () => {
            modalContainer.style.display = 'none';
        });
    }

    if(modalContainer) {
        window.addEventListener('click', (event) => {
            if (event.target === modalContainer) {
                modalContainer.style.display = 'none';
            }
        });
    }
});

    





    

    

    