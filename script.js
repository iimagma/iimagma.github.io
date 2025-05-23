// Data inicial: 14 de setembro de 2024, 14:21
const startDate = new Date('2024-09-13T14:21:00');

// Configuração do player de música
const audio = new Audio('background.mp3'); // Certifique-se de que o arquivo está na pasta correta
const playPauseBtn = document.getElementById('play-pause');
const volumeSlider = document.getElementById('volume');
const playIcon = playPauseBtn.querySelector('i');

let isPlaying = true;

// Função para iniciar a música
function playMusic() {
    audio.play().then(() => {
        isPlaying = true;
        playIcon.classList.replace('fa-play', 'fa-pause');
    }).catch(error => {
        console.log("Erro ao reproduzir áudio:", error);
    });
}

// Iniciar música quando a página carregar
window.addEventListener('load', () => {
    // Pequeno delay para garantir que tudo está carregado
    setTimeout(playMusic, 1000);
});

// Controles do player
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playIcon.classList.replace('fa-pause', 'fa-play');
    } else {
        playMusic();
    }
    isPlaying = !isPlaying;
});

volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value / 100;
});

// Array com todas as fotos
const fotos = [
    '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg',
    '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg',
    '21.jpg', '22.jpg', '23.jpg', '24.jpg', '25.jpg', '26.jpg', '27.jpg', '28.jpg', '29.jpg', '30.jpg',
    '31.jpg', '32.jpg', '33.jpg', '34.jpg', '35.jpg'
];

let currentIndex = 0;
const imageElement = document.getElementById('current-image');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const heartsContainer = document.querySelector('.hearts-container');

function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.classList.add('heart');
    
    // Posição aleatória na horizontal
    const left = Math.random() * 100;
    heart.style.left = `${left}%`;
    
    // Duração aleatória da animação
    const duration = Math.random() * 3 + 2;
    heart.style.animationDuration = `${duration}s`;
    
    heartsContainer.appendChild(heart);
    
    // Remover o coração após a animação
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Criar corações periodicamente por 6 segundos
const heartInterval = setInterval(createHeart, 300);

// Parar a criação de corações após 6 segundos
setTimeout(() => {
    clearInterval(heartInterval);
}, 6000);

function updateImage() {
    imageElement.src = `fotos/${fotos[currentIndex]}`;
    imageElement.alt = `Nossa Foto ${currentIndex + 1}`;
    
    // Atualizar estado dos botões
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === fotos.length - 1;
}

function updateTimeTogether() {
    const now = new Date();
    const difference = now - startDate;

    // Cálculo do tempo decorrido
    const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor((difference % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Atualizar o texto
    const timeText = document.getElementById('time-text');
    timeText.textContent = `Estamos juntos há ${years} ${years === 1 ? 'ano' : 'anos'}, ${months} ${months === 1 ? 'mês' : 'meses'}, ${days} ${days === 1 ? 'dia' : 'dias'}, ${hours} ${hours === 1 ? 'hora' : 'horas'}, ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'} e ${seconds} ${seconds === 1 ? 'segundo' : 'segundos'}`;
}

// Event listeners para os botões
prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateImage();
    }
});

nextButton.addEventListener('click', () => {
    if (currentIndex < fotos.length - 1) {
        currentIndex++;
        updateImage();
    }
});

// Atualizar o tempo a cada segundo
setInterval(updateTimeTogether, 1000);

// Inicializar
updateImage();
updateTimeTogether();

// Detectar tipo de dispositivo
function isMobileDevice() {
    return (window.innerWidth <= 768) || 
           (navigator.maxTouchPoints > 0) || 
           (navigator.msMaxTouchPoints > 0) ||
           (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}

// Ajustar interface baseado no dispositivo
function adjustInterfaceForDevice() {
    const isMobile = isMobileDevice();
    document.body.classList.toggle('mobile-device', isMobile);
    
    // Ajustar volume inicial em dispositivos móveis
    if (isMobile) {
        audio.volume = 0.7; // 70% do volume em mobile
        volumeSlider.value = 70;
    }
}

// Chamar ajuste quando a página carregar e quando redimensionar
window.addEventListener('load', adjustInterfaceForDevice);
window.addEventListener('resize', adjustInterfaceForDevice); 
