// Lógica interactiva para la web de JJ Almela

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navegación animada al hacer scroll (Sticky Nav)
    const nav = document.querySelector('.main-nav');
    const menuToggle = document.getElementById('mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
        }
    });

    // 1.1 Lógica del menú móvil
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Cambiar icono si es necesario
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Cerrar menú al hacer click en un enlace (para móviles)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 2. Smooth Scrolling para los enlaces del menú
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for the fixed nav
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log("JJ Almela Web - Base interactiva cargada correctamente.");
});

// 3. Función para desplegables de Colaboraciones
function toggleDetails(targetId) {
    const panels = document.querySelectorAll('.colab-details-panel');
    const targetPanel = document.getElementById('panel-' + targetId);
    
    // Si el panel clicado ya está activo, lo cerramos
    if (targetPanel.classList.contains('active')) {
        targetPanel.classList.remove('active');
        return;
    }
    
    // Cerramos todos los paneles abiertos primero
    panels.forEach(p => p.classList.remove('active'));
    
    // Abrimos el panel deseado
    if (targetPanel) {
        targetPanel.classList.add('active');
        
        // Scroll suave hacia el panel abierto
        setTimeout(() => {
            targetPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
}
