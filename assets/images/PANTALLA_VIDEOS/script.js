document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const btnLocal = document.getElementById('btn-local');
    const btnYoutube = document.getElementById('btn-youtube');
    const localControl = document.getElementById('local-control');
    const youtubeControl = document.getElementById('youtube-control');
    const videoUpload = document.getElementById('video-upload');
    const youtubeInput = document.getElementById('youtube-url');
    const btnLoadYt = document.getElementById('btn-load-yt');

    const localVideo = document.getElementById('local-video');
    const youtubeContainer = document.getElementById('youtube-player');
    const placeholder = document.querySelector('.placeholder-msg');

    const btnEmbed = document.getElementById('btn-embed');
    const modal = document.getElementById('embed-modal');
    const embedTextArea = document.getElementById('embed-code');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const btnCopy = document.getElementById('btn-copy');

    // State
    let currentMode = 'local'; // 'local' or 'youtube'

    // Tab Switching Logic
    btnLocal.addEventListener('click', () => {
        currentMode = 'local';
        btnLocal.classList.add('active');
        btnYoutube.classList.remove('active');
        localControl.classList.remove('hidden');
        youtubeControl.classList.add('hidden');
        resetPlayers();
    });

    btnYoutube.addEventListener('click', () => {
        currentMode = 'youtube';
        btnYoutube.classList.add('active');
        btnLocal.classList.remove('active');
        youtubeControl.classList.remove('hidden');
        localControl.classList.add('hidden');
        resetPlayers();
    });

    function resetPlayers() {
        localVideo.pause();
        localVideo.src = "";
        localVideo.classList.add('hidden');
        youtubeContainer.innerHTML = "";
        youtubeContainer.classList.add('hidden');
        placeholder.classList.remove('hidden');
    }

    // Local Video Handling
    videoUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            localVideo.src = url;
            localVideo.classList.remove('hidden');
            placeholder.classList.add('hidden');
            youtubeContainer.classList.add('hidden');
            localVideo.play();
        }
    });

    // YouTube Handling
    btnLoadYt.addEventListener('click', () => {
        const url = youtubeInput.value.trim();
        const videoId = extractYoutubeId(url);

        if (videoId) {
            youtubeContainer.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&origin=https://www.youtube.com" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
            youtubeContainer.classList.remove('hidden');
            placeholder.classList.add('hidden');
            localVideo.classList.add('hidden');
        } else {
            alert('Por favor, introduce un enlace de YouTube válido.');
        }
    });

    function extractYoutubeId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    // Embed Functionality
    btnEmbed.addEventListener('click', () => {
        let code = "";
        if (currentMode === 'youtube' && youtubeInput.value) {
            const videoId = extractYoutubeId(youtubeInput.value);
            code = `<!-- VidGlass - YouTube Embed -->
<style>
@keyframes vidglass-float { 0% { transform: translateY(0); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0); } }
</style>
<div style="background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 24px; padding: 20px; box-shadow: 0 8px 32px rgba(0,0,0,0.3); overflow: hidden; max-width: 900px; margin: 20px auto; animation: vidglass-float 6s ease-in-out infinite;">
    <div style="position: relative; padding-bottom: 56.25%; height: 0; border-radius: 12px; overflow: hidden;">
        <iframe src="https://www.youtube-nocookie.com/embed/${videoId}?origin=https://www.youtube.com" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
    </div>
</div>`;
        } else {
            code = `<!-- VidGlass - Local Video Embed -->
<style>
@keyframes vidglass-float { 0% { transform: translateY(0); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0); } }
</style>
<div style="background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 24px; padding: 20px; box-shadow: 0 8px 32px rgba(0,0,0,0.3); overflow: hidden; max-width: 900px; margin: 20px auto; animation: vidglass-float 6s ease-in-out infinite;">
    <video width="100%" controls style="border-radius: 12px; display: block;">
        <source src="TU_URL_DE_VIDEO_AQUI.mp4" type="video/mp4">
        Tu navegador no soporta el tag de video.
    </video>
</div>`;
        }

        embedTextArea.value = code;
        modal.classList.remove('hidden');
    });

    btnCloseModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    btnCopy.addEventListener('click', () => {
        embedTextArea.select();
        document.execCommand('copy');
        btnCopy.innerText = "¡Copiado!";
        setTimeout(() => { btnCopy.innerText = "Copiar Código"; }, 2000);
    });

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    });
});
