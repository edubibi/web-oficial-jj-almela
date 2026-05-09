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

// 3. Lógica de Videografía Dinámica (Álbumes)
const videoData = {
    memories: {
        title: "01 Memories",
        videos: [
            { title: "Una vida sin ti", thumb: "assets/images/CARATULAS ALMELA VIDEOS ANTERIORES/01UNA-VIDA-SIN-TI--1000.jpg", link: "#" },
            { title: "Tres encuentros", thumb: "assets/images/CARATULAS ALMELA VIDEOS ANTERIORES/02TRES-ENCUENTROS-1000.jpg", link: "#" }
        ]
    },
    spain: {
        title: "02 NS: Spain",
        videos: [
            { title: "Mediterráneo", thumb: "assets/images/CARATULAS ALMELA VIDEOS ANTERIORES/06MEDITERRANEO-1000.jpg", link: "#" },
            { title: "Sierra de Gúdar", thumb: "assets/images/CARATULAS ALMELA VIDEOS ANTERIORES/08SIERRA-DE-GUDAR-1000.jpg", link: "#" }
        ]
    },
    chillout: {
        title: "03 Chillout: SWEET",
        videos: [
            { title: "Boavista Magic", thumb: "assets/images/CARATULAS ALMELA VIDEOS ANTERIORES/00BOAVISTA-MAGIC-1000.jpg", link: "#" },
            { title: "Desert Route", thumb: "assets/images/CARATULAS ALMELA VIDEOS ANTERIORES/09DESET-ROUTE-caratula-YTube.jpg", link: "#" }
        ]
    },
    jazz: {
        title: "04 JAZZ",
        videos: [
            { title: "Buscándote", thumb: "assets/images/CARATULAS ALMELA VIDEOS ANTERIORES/03BUSCANDOTE-caratula-YTube.jpg", link: "#" },
            { title: "Mi calle y tú", thumb: "assets/images/CARATULAS ALMELA VIDEOS ANTERIORES/04MI-CALLE-Y-TU-caratula-YTube.jpg", link: "#" }
        ]
    },
    classic: {
        title: "05 CLASSIC 1",
        videos: [
            { title: "Et Maintenant", thumb: "assets/images/CARATULAS ALMELA VIDEOS ANTERIORES/12ETMaintenant--caratula-YOUTUBE.jpg", link: "#" },
            { title: "Andanzas de Rocinante", thumb: "assets/images/CARATULAS ALMELA VIDEOS ANTERIORES/10ANDANZAS-DE-ROCINANTE-caratula-YTube.jpg", link: "#" }
        ]
    },
    world: {
        title: "06 WORLD SONGS",
        videos: [
            { title: "Sin Fronteras", thumb: "assets/images/CARATULAS ALMELA VIDEOS ANTERIORES/07SIN-FRONTERAS-Caratula--youtube.jpg", link: "#" },
            { title: "Prisionero", thumb: "assets/images/CARATULAS ALMELA VIDEOS ANTERIORES/11PRISIONERO-caratula--youtube.jpg", link: "#" }
        ]
    }
};

function showVideos(albumKey) {
    const container = document.getElementById('video-playlist-container');
    const grid = document.getElementById('video-display-grid');
    const title = document.getElementById('playlist-title');
    
    const album = videoData[albumKey];
    if (!album) return;

    // Actualizar título y limpiar grid
    title.innerText = album.title;
    grid.innerHTML = '';

    // Inyectar vídeos
    album.videos.forEach(vid => {
        const card = document.createElement('div');
        card.className = 'mini-video-card';
        card.innerHTML = `
            <img src="${vid.thumb}" alt="${vid.title}">
            <div class="mini-video-info">${vid.title}</div>
            <div class="play-overlay"><i class="fas fa-play"></i></div>
        `;
        card.onclick = () => window.open(vid.link, '_blank');
        grid.appendChild(card);
    });

    // Mostrar contenedor con scroll suave
    container.style.display = 'block';
    setTimeout(() => {
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

function closePlaylist() {
    const container = document.getElementById('video-playlist-container');
    container.style.display = 'none';
}

// 4. Función para desplegables de Colaboraciones
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
