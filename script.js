const albums = {
    1: {
        title: "Path-Fit",
        media: [
            {
                type: "video",
                src: "https://streamable.com/2hsuzg",
                caption: "Path-Fit Exercise Activity"
            },

        ]
    },
    2: {
        title: "NSTP",
        media: [
            {
                type: "image",
                src: "https://live.staticflickr.com/65535/54937404604_77569b2418_b.jpg",
                caption: "Discussing emotional intelligence"
            },
            {
                type: "image",
                src: "https://live.staticflickr.com/65535/54937463035_6095d4c434_b.jpg",
                caption: "Need to sumbit to get a attendance :P"
            },
            {
                type: "image",
                src: "https://live.staticflickr.com/65535/54937357063_35bda04626_b.jpg",
                caption: "NSTP ACTIVITY GATHERING"
            }
        ]
    },
    3: {
        title: "First Semester Orientation",
        media: [
            {
                type: "image",
                src: "https://live.staticflickr.com/65535/54937404594_631436b4fa_b.jpg",
                caption: "First Semester Orientation"
            },

        ]
    },
    4: {
        title: "Feur Sub",
        media: [
            {
                type: "image",
                src: "https://live.staticflickr.com/65535/54937404549_6870a1c316_b.jpg",
                caption: "Feur Sub First On-Site"
            },
            {
                type: "image",
                src: "https://live.staticflickr.com/65535/54937357023_bd02f11e1e_b.jpg",
                caption: "Feur Sub First Online Class"
            },

        ]
    },
    5: {
        title: "Sinag Tams Event",
        media: [
            {
                type: "image",
                src: "https://live.staticflickr.com/65535/54937404639_5e44e7bc86_b.jpg",
                caption: "Sinag Tams Teams"
            },
            {
                type: "image",
                src: "https://live.staticflickr.com/65535/54937404629_b3c5001856_b.jpg",
                caption: "Sinag Tams Emcees"
            },
            {
                type: "image",
                src: "https://live.staticflickr.com/65535/54937151861_5afd2bc0c9_b.jpg",
                caption: "Our Representatives Muse&Escort"
            }
        ]
    },
    6: {
        title: "Friends & Social Life",
        media: [
            {
                type: "image",
                src: "https://live.staticflickr.com/65535/54937463015_fcba374b83_b.jpg",
                caption: ":p"
            },


        ]
    }
};

// DOM elements
const modal = document.getElementById('albumModal');
const modalTitle = document.getElementById('modalTitle');
const sliderTrack = document.getElementById('sliderTrack');
const sliderDots = document.getElementById('sliderDots');
const mediaCaption = document.getElementById('mediaCaption');
const closeBtn = document.querySelector('.close-btn');
const prevMediaBtn = document.getElementById('prevMediaBtn');
const nextMediaBtn = document.getElementById('nextMediaBtn');
const prevAlbumBtn = document.getElementById('prevAlbumBtn');
const nextAlbumBtn = document.getElementById('nextAlbumBtn');
const homeBtn = document.getElementById('homeBtn');
const albumCards = document.querySelectorAll('.album-card');

// Current album state
let currentAlbumId = null;
let currentSlideIndex = 0;

// Open modal with album content
function openAlbum(albumId) {
    currentAlbumId = albumId;
    currentSlideIndex = 0;
    const album = albums[albumId];
    
    if (!album) return;
    
    // Set modal title
    modalTitle.textContent = album.title;
    
    // Clear previous slides and dots
    sliderTrack.innerHTML = '';
    sliderDots.innerHTML = '';
    
    // Add slides and dots
    album.media.forEach((item, index) => {
        // Create slide
        const slide = document.createElement('div');
        slide.className = 'slide';
        
        if (item.type === 'image') {
            slide.innerHTML = `<img src="${item.src}" alt="${item.caption}">`;
        } else if (item.type === 'video') {
            slide.innerHTML = `
                <div style="position:relative;padding-top:56.25%;">
                    <iframe src="${item.src}" frameborder="0" allowfullscreen 
                            style="position:absolute;top:0;left:0;width:100%;height:100%;">
                    </iframe>
                </div>
            `;
        }
        
        sliderTrack.appendChild(slide);
        
        // Create dot
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('data-index', index);
        dot.addEventListener('click', () => goToSlide(index));
        sliderDots.appendChild(dot);
    });
    
    // Update caption
    updateCaption();
    
    // Show modal with animation
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Update slide position
function updateSliderPosition() {
    sliderTrack.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    
    // Update active dot
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlideIndex);
    });
    
    updateCaption();
}

// Update media caption
function updateCaption() {
    const album = albums[currentAlbumId];
    if (album && album.media[currentSlideIndex]) {
        mediaCaption.textContent = album.media[currentSlideIndex].caption;
    }
}

// Navigate to specific slide
function goToSlide(index) {
    const album = albums[currentAlbumId];
    if (!album) return;
    
    currentSlideIndex = index;
    if (currentSlideIndex < 0) {
        currentSlideIndex = album.media.length - 1;
    } else if (currentSlideIndex >= album.media.length) {
        currentSlideIndex = 0;
    }
    
    updateSliderPosition();
}

// Navigate to next slide
function nextSlide() {
    const album = albums[currentAlbumId];
    if (!album) return;
    
    currentSlideIndex = (currentSlideIndex + 1) % album.media.length;
    updateSliderPosition();
}

// Navigate to previous slide
function prevSlide() {
    const album = albums[currentAlbumId];
    if (!album) return;
    
    currentSlideIndex = (currentSlideIndex - 1 + album.media.length) % album.media.length;
    updateSliderPosition();
}

// Navigate to next album
function nextAlbum() {
    if (currentAlbumId === null) return;
    
    const albumIds = Object.keys(albums);
    const currentIndex = albumIds.indexOf(currentAlbumId.toString());
    const nextIndex = (currentIndex + 1) % albumIds.length;
    
    openAlbum(albumIds[nextIndex]);
}

// Navigate to previous album
function prevAlbum() {
    if (currentAlbumId === null) return;
    
    const albumIds = Object.keys(albums);
    const currentIndex = albumIds.indexOf(currentAlbumId.toString());
    const prevIndex = (currentIndex - 1 + albumIds.length) % albumIds.length;
    
    openAlbum(albumIds[prevIndex]);
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    currentAlbumId = null;
    currentSlideIndex = 0;
}

// Event listeners
albumCards.forEach(card => {
    card.addEventListener('click', () => {
        const albumId = card.getAttribute('data-album-id');
        openAlbum(albumId);
    });
});

closeBtn.addEventListener('click', closeModal);
prevMediaBtn.addEventListener('click', prevSlide);
nextMediaBtn.addEventListener('click', nextSlide);
prevAlbumBtn.addEventListener('click', prevAlbum);
nextAlbumBtn.addEventListener('click', nextAlbum);
homeBtn.addEventListener('click', closeModal);

// Close modal when clicking outside content
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'block') {
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowUp') {
            prevAlbum();
        } else if (e.key === 'ArrowDown') {
            nextAlbum();
        }
    }
});

// Touch swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

sliderTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

sliderTrack.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
        nextSlide();
    } else if (touchEndX > touchStartX + swipeThreshold) {
        prevSlide();
    }

}
