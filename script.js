// Page Navigation System
let currentPage = 'home';

// Initialize page navigation
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeEpisodes();
    initializeForms();
});

function initializeNavigation() {
    // Add click event listeners to navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            showPage(page);
        });
    });
    
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageName + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageName;
        
        // Update navigation active state
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-page="${pageName}"]`).classList.add('active');
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Initialize page-specific functionality
        if (pageName === 'episodes') {
            renderEpisodes();
        }
    }
}

// Episodes Data and Management
const episodesData = [
    {
        id: 15,
        title: "Understanding Digital Consent Laws",
        description: "In this episode, we explore the evolving landscape of digital consent laws and how they protect individuals from online harassment and exploitation.",
        date: "March 15, 2024",
        duration: "45 min",
        category: "legal-advice",
        tags: ["Legal Advice", "Digital Rights"],
        featured: true,
        downloads: "12.5K"
    },
    {
        id: 14,
        title: "Survivor Stories: Finding Strength",
        description: "Hear powerful stories from survivors who have overcome digital harassment and found ways to rebuild their lives.",
        date: "March 8, 2024",
        duration: "38 min",
        category: "survivor-stories",
        tags: ["Survivor Stories", "Healing"],
        downloads: "9.2K"
    },
    {
        id: 13,
        title: "Preventing Online Harassment",
        description: "Practical tips and strategies for protecting yourself and others from digital harassment and maintaining online safety.",
        date: "March 1, 2024",
        duration: "42 min",
        category: "prevention",
        tags: ["Prevention", "Digital Safety"],
        downloads: "11.8K"
    },
    {
        id: 12,
        title: "Legal Remedies for Digital Harassment",
        description: "Understanding your legal options when facing online harassment, including restraining orders and criminal charges.",
        date: "February 22, 2024",
        duration: "50 min",
        category: "legal-advice",
        tags: ["Legal Advice", "Remedies"],
        downloads: "15.3K"
    },
    {
        id: 11,
        title: "Platform Accountability and User Rights",
        description: "Examining how social media platforms handle harassment reports and what users can do to protect themselves.",
        date: "February 15, 2024",
        duration: "35 min",
        category: "digital-harassment",
        tags: ["Digital Harassment", "Platform Policy"],
        downloads: "8.7K"
    },
    {
        id: 10,
        title: "Supporting Survivors: A Community Approach",
        description: "How communities, families, and friends can better support survivors of digital harassment and consent violations.",
        date: "February 8, 2024",
        duration: "40 min",
        category: "survivor-stories",
        tags: ["Support", "Community"],
        downloads: "10.1K"
    },
    {
        id: 9,
        title: "Digital Evidence Collection",
        description: "A comprehensive guide on how to properly collect and preserve digital evidence for legal proceedings.",
        date: "February 1, 2024",
        duration: "47 min",
        category: "legal-advice",
        tags: ["Legal Advice", "Evidence"],
        downloads: "13.6K"
    },
    {
        id: 8,
        title: "Cyberstalking: Recognition and Response",
        description: "Understanding the signs of cyberstalking and effective strategies for protection and legal recourse.",
        date: "January 25, 2024",
        duration: "43 min",
        category: "digital-harassment",
        tags: ["Digital Harassment", "Cyberstalking"],
        downloads: "12.9K"
    }
];

let filteredEpisodes = episodesData;
let displayedEpisodes = 6;

function initializeEpisodes() {
    // Search functionality
    const searchInput = document.getElementById('episodeSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            filterEpisodes(searchTerm);
        });
    }
    
    // Category filter
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function(e) {
            const category = e.target.value;
            const searchTerm = document.getElementById('episodeSearch').value.toLowerCase();
            filterEpisodes(searchTerm, category);
        });
    }
}

function filterEpisodes(searchTerm = '', category = 'all') {
    filteredEpisodes = episodesData.filter(episode => {
        const matchesSearch = episode.title.toLowerCase().includes(searchTerm) ||
                            episode.description.toLowerCase().includes(searchTerm) ||
                            episode.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        
        const matchesCategory = category === 'all' || episode.category === category;
        
        return matchesSearch && matchesCategory;
    });
    
    displayedEpisodes = 6;
    renderEpisodes();
    updateEpisodeStats();
}

function renderEpisodes() {
    const episodesGrid = document.getElementById('episodesGrid');
    if (!episodesGrid) return;
    
    episodesGrid.innerHTML = '';
    
    const episodesToShow = filteredEpisodes.slice(0, displayedEpisodes);
    
    episodesToShow.forEach(episode => {
        const episodeCard = document.createElement('article');
        episodeCard.className = `episode-card ${episode.featured ? 'featured' : ''}`;
        episodeCard.innerHTML = `
            <div class="episode-image">
                <div class="episode-placeholder">
                    <i class="fas fa-headphones"></i>
                </div>
                <div class="play-overlay">
                    <button class="play-btn" onclick="playEpisode(${episode.id})">
                        <i class="fas fa-play"></i>
                    </button>
                </div>
            </div>
            <div class="episode-content">
                <div class="episode-header">
                    <span class="episode-number">Episode ${episode.id}</span>
                    <span class="episode-category">${episode.tags[0]}</span>
                </div>
                <h3 class="episode-title">${episode.title}</h3>
                <p class="episode-description">${episode.description}</p>
                <div class="episode-meta">
                    <span><i class="fas fa-calendar"></i> ${episode.date}</span>
                    <span><i class="fas fa-clock"></i> ${episode.duration}</span>
                    <span><i class="fas fa-download"></i> ${episode.downloads}</span>
                </div>
            </div>
        `;
        episodesGrid.appendChild(episodeCard);
    });
    
    // Update load more button
    const loadMoreBtn = document.querySelector('.load-more');
    if (loadMoreBtn) {
        if (filteredEpisodes.length <= displayedEpisodes) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }
}

function updateEpisodeStats() {
    const episodeCount = document.getElementById('episodeCount');
    if (episodeCount) {
        episodeCount.textContent = filteredEpisodes.length;
    }
}

function loadMoreEpisodes() {
    displayedEpisodes += 6;
    renderEpisodes();
}

// Audio Player Functionality
let isPlaying = false;
let currentTime = 0;
const totalTime = 2723; // 45:23 in seconds
let progressInterval;

function togglePlay() {
    const playBtns = document.querySelectorAll('.play-btn i');
    
    if (isPlaying) {
        playBtns.forEach(btn => btn.className = 'fas fa-play');
        isPlaying = false;
        clearInterval(progressInterval);
    } else {
        playBtns.forEach(btn => btn.className = 'fas fa-pause');
        isPlaying = true;
        simulateProgress();
    }
}

function simulateProgress() {
    progressInterval = setInterval(() => {
        if (isPlaying && currentTime < totalTime) {
            currentTime += 1;
            updateProgressBar();
        } else if (currentTime >= totalTime) {
            isPlaying = false;
            currentTime = 0;
            const playBtns = document.querySelectorAll('.play-btn i');
            playBtns.forEach(btn => btn.className = 'fas fa-play');
            updateProgressBar();
            clearInterval(progressInterval);
        }
    }, 1000);
}

function updateProgressBar() {
    const progress = document.getElementById('progress');
    const currentTimeSpan = document.getElementById('currentTime');
    
    if (progress && currentTimeSpan) {
        const percentage = (currentTime / totalTime) * 100;
        progress.style.width = percentage + '%';
        
        const minutes = Math.floor(currentTime / 60);
        const seconds = currentTime % 60;
        currentTimeSpan.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

function playEpisode(episodeId) {
    console.log(`Playing episode ${episodeId}`);
    togglePlay();
}

function playLatestEpisode() {
    showPage('episodes');
    setTimeout(() => {
        togglePlay();
    }, 500);
}

// Contact Form Management
function initializeForms() {
    // General form
    const generalForm = document.getElementById('generalForm');
    if (generalForm) {
        generalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            this.reset();
        });
    }
    
    // Confidential form
    const confidentialForm = document.getElementById('confidentialForm');
    if (confidentialForm) {
        confidentialForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Your confidential submission has been received securely.', 'success');
            this.reset();
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                showNotification('Thank you for subscribing!', 'success');
                this.reset();
            }
        });
    }
}

function showTab(tabName) {
    // Remove active class from all tabs and forms
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.contact-form').forEach(form => form.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding form
    event.target.classList.add('active');
    document.getElementById(tabName + 'Form').classList.add('active');
}

// Notification System
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4ecdc4' : '#ff6b6b'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Utility Functions
function shareEpisode(episodeId) {
    if (navigator.share) {
        navigator.share({
            title: 'Beyond Consent Podcast',
            text: 'Check out this episode!',
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        showNotification('Episode link copied to clipboard!', 'success');
    }
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    }
});

// Responsive Menu Handling
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.querySelector('.nav-menu').classList.remove('active');
    }
});