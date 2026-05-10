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

// 5. Lógica del Reproductor de Audio Elegante
const audioData = {
    memories: {
        title: "Memories",
        cover: "assets/images/some-memories-portada-sección.jpg",
        tracks: [
            { title: "Tres Encuentros", src: "assets/audio/SOME MEMORIES LP/01Tres Encuentros.mp3" },
            { title: "Boavista Magic", src: "assets/audio/SOME MEMORIES LP/02Boavista Magic.mp3" },
            { title: "Buscándote", src: "assets/audio/SOME MEMORIES LP/03Buscándote.mp3" },
            { title: "Una Vida Sin Ti", src: "assets/audio/SOME MEMORIES LP/04Una Vida Sin Ti.mp3" },
            { title: "Mi Calle y Tu", src: "assets/audio/SOME MEMORIES LP/05Mi Calle y Tu.mp3" },
            { title: "Matar al Ángel", src: "assets/audio/SOME MEMORIES LP/06Matar al Ángel.mp3" },
            { title: "No Se por Que Te Perdí", src: "assets/audio/SOME MEMORIES LP/07No Se por Que Te Perdí.mp3" }
        ]
    },
    ninety: {
        title: "NS: Spain",
        cover: "assets/images/PORTADAS DISCOS/NONETY SPAIN.png",
        tracks: [
            { title: "Mediterráneo", src: "assets/audio/NINETY/01Mediterraneo (J.M.Serrat).mp3" },
            { title: "Yo soy aquel", src: "assets/audio/NINETY/02Yo soy aquel.mp3" },
            { title: "Resistiré", src: "assets/audio/NINETY/03Resistiré.mp3" },
            { title: "La vida sigue igual", src: "assets/audio/NINETY/04La vida sigue igual.mp3" },
            { title: "Corazón partío", src: "assets/audio/NINETY/05Corazón partío.mp3" },
            { title: "Aquellas pequeñas cosas", src: "assets/audio/NINETY/06Aquellas pequeñas cosas.mp3" },
            { title: "Yo canto", src: "assets/audio/NINETY/07Yo canto.mp3" },
            { title: "Te quiero", src: "assets/audio/NINETY/08Te quiero.mp3" },
            { title: "Mi gran noche", src: "assets/audio/NINETY/09Mi gran noche.mp3" }
        ]
    },
    chillout: {
        title: "Chillout: SWEET",
        cover: "assets/images/PORTADAS DISCOS/Chillout SWEET.png",
        tracks: [
            { title: "Sin Fronteras", src: "assets/audio/CHILLOUT SWEET LP/01Sin Fronteras (DropOut).mp3" },
            { title: "Another day", src: "assets/audio/CHILLOUT SWEET LP/02Another day.mp3" },
            { title: "Sierra Gudar", src: "assets/audio/CHILLOUT SWEET LP/03Sierra Gudar.mp3" },
            { title: "Andanzas de Rocinante", src: "assets/audio/CHILLOUT SWEET LP/04Andanzas de Rocinante.mp3" },
            { title: "Chill below zero", src: "assets/audio/CHILLOUT SWEET LP/05Chill below zero.mp3" },
            { title: "Main Memory", src: "assets/audio/CHILLOUT SWEET LP/06Main Memory.mp3" },
            { title: "Long road", src: "assets/audio/CHILLOUT SWEET LP/07Long road.mp3" },
            { title: "Desert Route", src: "assets/audio/CHILLOUT SWEET LP/08Desert Route.mp3" },
            { title: "Estación de paso", src: "assets/audio/CHILLOUT SWEET LP/09Estación_de_paso.mp3" },
            { title: "Faxe", src: "assets/audio/CHILLOUT SWEET LP/10Faxe.mp3" },
            { title: "Mucho mas que amigo", src: "assets/audio/CHILLOUT SWEET LP/11Mucho mas que amigo.mp3" },
            { title: "Pincelada Andaluza", src: "assets/audio/CHILLOUT SWEET LP/12Pincelada Andaluza.mp3" },
            { title: "Ahead", src: "assets/audio/CHILLOUT SWEET LP/13Ahead.mp3" },
            { title: "Otros niños", src: "assets/audio/CHILLOUT SWEET LP/14Otros niños (SDown).mp3" },
            { title: "Sendero a mi cabaña", src: "assets/audio/CHILLOUT SWEET LP/15Sendero a mi cabaña.mp3" },
            { title: "Buscandote Cold", src: "assets/audio/CHILLOUT SWEET LP/16Buscandote_ Cold.mp3" }
        ]
    },
    jazz: {
        title: "JAZZ",
        cover: "assets/images/PORTADAS DISCOS/JAZZ OR NOT TO BE.png",
        tracks: [
            { title: "Prisionero", src: "assets/audio/JAZZ OR NOT TO BE/1.Prisionero.mp3" },
            { title: "Dos encuentros", src: "assets/audio/JAZZ OR NOT TO BE/2.Dos encuentros.mp3" },
            { title: "Una idea", src: "assets/audio/JAZZ OR NOT TO BE/3.Una idea.mp3" },
            { title: "Mirador", src: "assets/audio/JAZZ OR NOT TO BE/4.Mirador.mp3" },
            { title: "Matar al Ángel", src: "assets/audio/JAZZ OR NOT TO BE/5.Matar al Ángel.mp3" },
            { title: "Perseguido bajo el puente", src: "assets/audio/JAZZ OR NOT TO BE/6.Perseguido bajo el puente.mp3" },
            { title: "Vuelvo, vivo en soledad", src: "assets/audio/JAZZ OR NOT TO BE/7.Vuelvo, vivo en soledad.mp3" },
            { title: "Boavista Magic", src: "assets/audio/JAZZ OR NOT TO BE/8.Boavista Magic.mp3" },
            { title: "Ruta 50", src: "assets/audio/JAZZ OR NOT TO BE/9.Ruta 50.mp3" },
            { title: "El perfil de tu cuerpo", src: "assets/audio/JAZZ OR NOT TO BE/10.El perfil de tu cuerpo.mp3" },
            { title: "Sendero a mi cabaña", src: "assets/audio/JAZZ OR NOT TO BE/11.Sendero a mi cabaña.mp3" }
        ]
    },
    classic: {
        title: "CLASSIC 1",
        cover: "assets/images/PORTADAS DISCOS/CLASIC.png",
        tracks: [
            { title: "Fue una despedida", src: "assets/audio/PENSAMIENTOS SINFÓNICOS/01Fue una despedida.mp3" },
            { title: "Perdido en mi habitación", src: "assets/audio/PENSAMIENTOS SINFÓNICOS/02Perdido en mi habitación.mp3" },
            { title: "Pensamientos", src: "assets/audio/PENSAMIENTOS SINFÓNICOS/03Pensamientos.mp3" },
            { title: "Hasta siempre...", src: "assets/audio/PENSAMIENTOS SINFÓNICOS/04Hasta siempre...mp3" },
            { title: "Daños de guerra", src: "assets/audio/PENSAMIENTOS SINFÓNICOS/05Daños de guerra.mp3" },
            { title: "Sinfonía nº3 de BRAHMS", src: "assets/audio/PENSAMIENTOS SINFÓNICOS/06Sinfonía nº3 de BRAHMS.mp3" },
            { title: "Gótico para Harp y Cuarteto", src: "assets/audio/PENSAMIENTOS SINFÓNICOS/07Gótico para Harp y Cuarteto.mp3" },
            { title: "Cuatro rosas", src: "assets/audio/PENSAMIENTOS SINFÓNICOS/08Cuatro rosas.mp3" },
            { title: "Ella, entre tu y yo", src: "assets/audio/PENSAMIENTOS SINFÓNICOS/09Ella, entre tu y yo.mp3" },
            { title: "Crónica de una vida", src: "assets/audio/PENSAMIENTOS SINFÓNICOS/10Crónica de una vida.mp3" },
            { title: "Testigo único", src: "assets/audio/PENSAMIENTOS SINFÓNICOS/11Testígo único.mp3" }
        ]
    },
    aeswing: {
        title: "AESWING",
        cover: "assets/audio/AESWING/aeswing track COVERS 4 YOU.jpg",
        tracks: [
            { title: "After the love has gone", src: "assets/audio/AESWING/After the love has gone_ AEswing.mp3" },
            { title: "Georgy Porgy", src: "assets/audio/AESWING/Georgy Porgy.mp3" },
            { title: "just the way you are", src: "assets/audio/AESWING/just the way you are.mp3" },
            { title: "Nothing you can do", src: "assets/audio/AESWING/Nothing you can do.mp3" },
            { title: "People gotta move", src: "assets/audio/AESWING/People gotta move.mp3" },
            { title: "Rikki dont lose that number", src: "assets/audio/AESWING/Rikki dont lose that number.mp3" }
        ]
    },
    world: {
        title: "WORLD SONGS",
        cover: "assets/images/PORTADAS DISCOS/WORLDS-SONGS.jpg",
        tracks: [
            { title: "Dime cuando", src: "assets/audio/WORLD SONG ALMELA/01Dime cuando.mp3" },
            { title: "Che será", src: "assets/audio/WORLD SONG ALMELA/02Che será.mp3" },
            { title: "Just the way you are", src: "assets/audio/WORLD SONG ALMELA/03Just the way you are.mp3" },
            { title: "Chanter pour Ceux", src: "assets/audio/WORLD SONG ALMELA/04Chanter pour Ceux.mp3" },
            { title: "Georgy porgy", src: "assets/audio/WORLD SONG ALMELA/05Georgy porgy.mp3" },
            { title: "Only you", src: "assets/audio/WORLD SONG ALMELA/06Only you.mp3" },
            { title: "After the love has gone", src: "assets/audio/WORLD SONG ALMELA/07After the love has gone.mp3" },
            { title: "Cést si bon", src: "assets/audio/WORLD SONG ALMELA/08Cést si bon.mp3" }
        ]
    }
};

let currentAudio = new Audio();
let currentAlbum = null;
let currentTrackIndex = 0;
let isPlaying = false;

// Elementos del DOM
const apModal = document.getElementById('audio-player-modal');
const apCover = document.getElementById('ap-cover');
const apAlbumTitle = document.getElementById('ap-album-title');
const apTrackTitle = document.getElementById('ap-track-title');
const apTracklist = document.getElementById('ap-tracklist');
const apPlayBtn = document.getElementById('ap-play-btn');
const apPlayIcon = apPlayBtn ? apPlayBtn.querySelector('i') : null;
const apProgressFill = document.getElementById('ap-progress-fill');
const apCurrentTime = document.getElementById('ap-current-time');
const apDuration = document.getElementById('ap-duration');

function openAudioPlayer(albumKey) {
    if (!apModal) return;
    
    currentAlbum = audioData[albumKey];
    if (!currentAlbum) return;

    // Poblar datos visuales
    apCover.src = currentAlbum.cover;
    apAlbumTitle.innerText = currentAlbum.title;
    
    // Crear lista de canciones
    apTracklist.innerHTML = '';
    currentAlbum.tracks.forEach((track, index) => {
        const li = document.createElement('li');
        li.className = 'ap-track-item';
        li.innerHTML = `
            <span class="ap-track-number">${String(index + 1).padStart(2, '0')}</span>
            <span class="ap-track-name">${track.title}</span>
        `;
        li.onclick = () => loadTrack(index, true);
        apTracklist.appendChild(li);
    });

    // Mostrar Modal
    apModal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Evitar scroll del fondo

    // Cargar la primera pista si no hay nada sonando
    if (currentAudio.src === "" || currentAudio.paused) {
        loadTrack(0, false);
    }
}

function closeAudioPlayer() {
    if (apModal) {
        apModal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Restaurar scroll
    }
}

function loadTrack(index, playImmediately = false) {
    currentTrackIndex = index;
    const track = currentAlbum.tracks[index];
    
    // Actualizar UI
    apTrackTitle.innerText = track.title;
    
    // Resaltar en la lista
    const items = apTracklist.querySelectorAll('.ap-track-item');
    items.forEach(item => item.classList.remove('active'));
    if(items[index]) items[index].classList.add('active');

    // Cargar audio
    const newSrc = encodeURI(track.src);
    // Solo cambiar el src si es una pista diferente para no cortar la actual si se reabre el modal
    if (!currentAudio.src.endsWith(newSrc)) {
        currentAudio.src = track.src;
        currentAudio.load();
        apProgressFill.style.width = '0%';
        apCurrentTime.innerText = '0:00';
    }

    if (playImmediately) {
        playAudio();
    } else {
        updatePlayButton(false);
    }
}

function togglePlay() {
    if (currentAudio.paused) {
        playAudio();
    } else {
        pauseAudio();
    }
}

function playAudio() {
    currentAudio.play().then(() => {
        isPlaying = true;
        updatePlayButton(true);
    }).catch(e => console.error("Error reproduciendo audio:", e));
}

function pauseAudio() {
    currentAudio.pause();
    isPlaying = false;
    updatePlayButton(false);
}

function updatePlayButton(playing) {
    if (apPlayIcon) {
        if (playing) {
            apPlayIcon.classList.remove('fa-play');
            apPlayIcon.classList.add('fa-pause');
        } else {
            apPlayIcon.classList.remove('fa-pause');
            apPlayIcon.classList.add('fa-play');
        }
    }
}

function nextTrack() {
    let nextIndex = currentTrackIndex + 1;
    if (nextIndex >= currentAlbum.tracks.length) {
        nextIndex = 0; // Volver al principio
    }
    loadTrack(nextIndex, true);
}

function prevTrack() {
    let prevIndex = currentTrackIndex - 1;
    if (prevIndex < 0) {
        prevIndex = currentAlbum.tracks.length - 1; // Ir al final
    }
    loadTrack(prevIndex, true);
}

// Eventos del Audio
if (currentAudio) {
    currentAudio.addEventListener('timeupdate', () => {
        if (!currentAudio.duration) return;
        
        // Actualizar barra
        const progressPercent = (currentAudio.currentTime / currentAudio.duration) * 100;
        apProgressFill.style.width = `${progressPercent}%`;
        
        // Actualizar tiempo actual
        apCurrentTime.innerText = formatTime(currentAudio.currentTime);
    });

    currentAudio.addEventListener('loadedmetadata', () => {
        apDuration.innerText = formatTime(currentAudio.duration);
    });

    // Auto-pasar a la siguiente canción al terminar
    currentAudio.addEventListener('ended', nextTrack);
}

// Hacer clic en la barra de progreso
function seekAudio(e) {
    const progressBar = document.getElementById('ap-progress-bar');
    const clickX = e.offsetX;
    const width = progressBar.clientWidth;
    const duration = currentAudio.duration;
    
    currentAudio.currentTime = (clickX / width) * duration;
}

// Utilidad para formatear segundos a MM:SS
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}
