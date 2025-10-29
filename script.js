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