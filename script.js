document.addEventListener('DOMContentLoaded', function() {
    // Desplazamiento suave para los enlaces de navegación
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Actualizar el año actual en el pie de página
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;

    // Opcional: Añadir una animación simple al desplazarse para las secciones
    const sections = document.querySelectorAll('.section');
    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            } else {
                entry.target.style.opacity = 0;
                entry.target.style.transform = 'translateY(20px)';
            }
        });
    }, options);

    sections.forEach(section => {
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        observer.observe(section);
    });
});

// Cierre automático del menú al hacer clic en un enlace (para móviles)
const menuToggle = document.getElementById('menu-toggle');
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        if (menuToggle.checked) {
            menuToggle.checked = false; // Desmarca el checkbox para cerrar el menú
        }
    });
});

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
const button = document.getElementById("form-button");

form.addEventListener("submit", async function(event) {
    event.preventDefault(); // Evita que la página se recargue
    
    const data = new FormData(event.target);
    
    // Cambiamos el estado del botón mientras envía
    button.disabled = true;
    button.textContent = "Enviando...";

    try {
        const response = await fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // ÉXITO
            status.innerHTML = "¡Gracias! Tu mensaje ha sido enviado correctamente.";
            status.style.color = "#28a745"; // Verde éxito
            form.reset(); // Limpia el formulario
        } else {
            // ERROR DEL SERVIDOR
            const errorData = await response.json();
            status.innerHTML = "Oops! Hubo un problema. Inténtalo de nuevo.";
            status.style.color = "#dc3545"; // Rojo error
        }
    } catch (error) {
        // ERROR DE RED
        status.innerHTML = "Error de conexión. Revisa tu internet.";
        status.style.color = "#dc3545";
    } finally {
        // Restauramos el botón
        button.disabled = false;
        button.textContent = "Enviar Mensaje";
    }
});