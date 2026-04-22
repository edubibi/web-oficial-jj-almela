/**
 * JJ Almela - Music Player Logic
 * Handles multiple albums with glassmorphism UI
 */

const albums = {
    'alm-1': {
        title: 'Some Memories (ALM 1)',
        artist: 'JJ Almela',
        cover: 'assets/images/CARATULAS ALMELA VIDEOS ANTERIORES/00BOAVISTA-MAGIC-1000.jpg',
        tracks: [
            { title: "Tres Encuentros", file: "SOME MEMORIES LP/01Tres Encuentros.mp3" },
            { title: "Boavista Magic", file: "SOME MEMORIES LP/02Boavista Magic.mp3" },
            { title: "Buscándote", file: "SOME MEMORIES LP/03Buscándote.mp3" },
            { title: "Una Vida Sin Ti", file: "SOME MEMORIES LP/04Una Vida Sin Ti.mp3" },
            { title: "Mi Calle y Tu", file: "SOME MEMORIES LP/05Mi Calle y Tu.mp3" },
            { title: "Matar al Ángel", file: "SOME MEMORIES LP/06Matar al Ángel.mp3" },
            { title: "No Se por Que Te Perdí", file: "SOME MEMORIES LP/07No Se por Que Te Perdí.mp3" }
        ]
    },
    'alm-2': {
        title: 'Chillout Sweet (ALM 2)',
        artist: 'JJ Almela',
        cover: 'assets/images/chillout_sweet_cover.jpg',
        tracks: [
            { title: "Sin Fronteras", file: "CHILLOUT SWEET LP/01Sin Fronteras (DropOut).mp3" },
            { title: "Another day", file: "CHILLOUT SWEET LP/02Another day.mp3" },
            { title: "Sierra Gudar", file: "CHILLOUT SWEET LP/03Sierra Gudar.mp3" },
            { title: "Andanzas de Rocinante", file: "CHILLOUT SWEET LP/04Andanzas de Rocinante.mp3" },
            { title: "Chill below zero", file: "CHILLOUT SWEET LP/05Chill below zero.mp3" },
            { title: "Main Memory", file: "CHILLOUT SWEET LP/06Main Memory.mp3" },
            { title: "Long road", file: "CHILLOUT SWEET LP/07Long road.mp3" },
            { title: "Desert Route", file: "CHILLOUT SWEET LP/08Desert Route.mp3" },
            { title: "Estación de paso", file: "CHILLOUT SWEET LP/09Estación_de_paso.mp3" },
            { title: "Faxe", file: "CHILLOUT SWEET LP/10Faxe.mp3" },
            { title: "Mucho más que amigo", file: "CHILLOUT SWEET LP/11Mucho mas que amigo.mp3" },
            { title: "Pincelada andaluza", file: "CHILLOUT SWEET LP/12Pincelada Andaluza.mp3" },
            { title: "Adelante", file: "CHILLOUT SWEET LP/13Ahead.mp3" },
            { title: "Otros niños", file: "CHILLOUT SWEET LP/14Otros niños (SDown).mp3" },
            { title: "Sendero a mi cabaña", file: "CHILLOUT SWEET LP/15Sendero a mi cabaña.mp3" },
            { title: "Buscándote, cold", file: "CHILLOUT SWEET LP/16Buscandote_ Cold.mp3" }
        ]
    }
};

let currentAlbumId = null;
let currentTrackIndex = 0;
let isPlaying = false;
const audio = new Audio();

function initPlayer() {
    const playBtn = document.getElementById('playBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.querySelector('.progress-bar');
    const progressFill = document.getElementById('progressFill');

    if (playBtn) {
        playBtn.onclick = togglePlay;
    }

    if (prevBtn) {
        prevBtn.onclick = prevTrack;
    }

    if (nextBtn) {
        nextBtn.onclick = nextTrack;
    }

    if (progressBar) {
        progressBar.onclick = (e) => {
            const width = progressBar.clientWidth;
            const clickX = e.offsetX;
            if (audio.duration) {
                audio.currentTime = (clickX / width) * audio.duration;
            }
        };
    }

    audio.ontimeupdate = () => {
        if (audio.duration && progressFill) {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressFill.style.width = `${progress}%`;
            document.getElementById('currentTime').innerText = formatTime(audio.currentTime);
            document.getElementById('duration').innerText = formatTime(audio.duration);
        }
    };

    audio.onended = nextTrack;
}

function openAlbum(albumId) {
    currentAlbumId = albumId;
    currentTrackIndex = 0;
    const album = albums[albumId];
    
    // Update UI
    document.getElementById('currentAlbumTitle').innerText = album.title;
    document.getElementById('currentAlbumArt').src = album.cover;
    
    renderTracklist(albumId);
    loadTrack(0);
    
    // Show player panel
    document.getElementById('musicPlayerPanel').classList.add('active');
}

function renderTracklist(albumId) {
    const list = document.getElementById('trackListItems');
    list.innerHTML = '';
    albums[albumId].tracks.forEach((track, index) => {
        const li = document.createElement('li');
        li.className = 'track-item';
        li.innerHTML = `
            <span class="track-num">${(index + 1).toString().padStart(2, '0')}</span>
            <span class="track-name">${track.title}</span>
        `;
        li.onclick = () => {
            loadTrack(index);
            playTrack();
        };
        list.appendChild(li);
    });
}

function loadTrack(index) {
    currentTrackIndex = index;
    const track = albums[currentAlbumId].tracks[index];
    
    if (track.file) {
        audio.src = `assets/audio/${track.file}`;
    } else {
        // Placeholder for tracks without files
        audio.src = ''; 
    }
    
    document.getElementById('currentTrackTitle').innerText = track.title;
    
    // Update active class in list
    const items = document.querySelectorAll('.track-item');
    items.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
}

function togglePlay() {
    if (isPlaying) pauseTrack();
    else playTrack();
}

function playTrack() {
    if (!audio.src || audio.src.endsWith('undefined')) return;
    isPlaying = true;
    audio.play();
    document.getElementById('musicPlayerPanel').classList.add('playing');
    // Update icons if needed
}

function pauseTrack() {
    isPlaying = false;
    audio.pause();
    document.getElementById('musicPlayerPanel').classList.remove('playing');
}

function nextTrack() {
    const tracks = albums[currentAlbumId].tracks;
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) playTrack();
}

function prevTrack() {
    const tracks = albums[currentAlbumId].tracks;
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) playTrack();
}

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function closePlayer() {
    pauseTrack();
    document.getElementById('musicPlayerPanel').classList.remove('active');
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
    initPlayer();
});
