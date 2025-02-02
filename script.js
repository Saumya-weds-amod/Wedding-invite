window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    const content = document.getElementById('content');
    const images = document.querySelectorAll('.animation-img');
    const gallerySection = document.querySelector('.gallery-section');
    const animationMusic = document.getElementById('animationMusic');
    const partyMusic = document.getElementById('partyMusic');
    const blessingsButton = document.getElementById('blessings-button');
    let animationStarted = false; // Track if animation has started
    let currentIndex = 0;

    // Ensure user interaction enables audio playback
    // document.body.addEventListener('click', () => {
    //     animationMusic.play().catch(() => {
    //         console.log('User interaction needed to start music.');
    //     });
    // });
    // Wait for user interaction to start the animation and music
    document.body.addEventListener('click', startAnimationOnce);

    function startAnimationOnce() {
        if (animationStarted) return; // Ensure animation starts only once
        animationStarted = true;

        // Hide the preloader and show content
        preloader.style.display = 'none';
        content.style.display = 'block';
        document.body.style.overflow = 'auto'; // Enable scrolling

        // Play animation music
        animationMusic.play().catch(() => {
            console.log('Audio playback failed due to browser restrictions.');
        });

        // Start the image animation
        showNextImage();
    }
    
    // Function to show images one by one
    function showNextImage() {
        if (currentIndex > 0) {
            images[currentIndex - 1].style.opacity = '0';
            images[currentIndex - 1].style.transform = 'scale(0.8)';
        }

        images[currentIndex].style.opacity = '1';
        images[currentIndex].style.transform = 'scale(1)';

        currentIndex++;

        if (currentIndex < images.length) {
            setTimeout(showNextImage, 4000); // Delay before showing the next image
        } else {
            // After all images are shown, ensure the animation area disappears
            setTimeout(() => {
                document.querySelector('.animation-area').style.display = 'none';
                gallerySection.classList.remove('d-none'); // Show the gallery section
            }, 3000);
        }
    }

    // Show preloader for 4 seconds, then reveal content
    // setTimeout(() => {
    //     preloader.style.display = 'none'; // Hide preloader
    //     content.style.display = 'block'; // Show the main content
    //     document.body.style.overflow = 'auto'; // Enable scrolling after the preloader

    //     // Attempt to play animation music after preloader
    //     animationMusic.play().catch(() => {
    //         console.log('User interaction required for audio playback.');
    //     });

    //     // Start the animation images after the preloader finishes
    //     showNextImage();
    // }, 4000); // Preloader duration (4 seconds)

    blessingsButton.addEventListener('click', () => {
        createPartyPopperEffect();
        animationMusic.pause();
        animationMusic.currentTime = 0;
        partyMusic.play().catch(() => {
            alert('Please enable audio to hear the blessings music.');
        });
    });

    // Party popper animation effect
    function createPartyPopperEffect() {
        const popperContainer = document.createElement('div');
        popperContainer.classList.add('party-popper');
        document.body.appendChild(popperContainer);

        for (let i = 0; i < 100; i++) {
            const petal = document.createElement('div');
            petal.classList.add('petal');
            petal.style.left = Math.random() * 100 + 'vw';
            petal.style.animationDelay = Math.random() * 2 + 's';
            popperContainer.appendChild(petal);
        }

        // Remove the popper container after 5 seconds
        setTimeout(() => {
            popperContainer.remove();
        }, 15000);
    }
});

// Enlarge image on click
function enlargeImage(image) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    lightboxImage.src = image.src;
    lightbox.style.display = 'flex';
}

// Close lightbox
function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}
