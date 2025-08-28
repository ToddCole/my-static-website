// Anti Histamine Diet - Interactive Elements

document.addEventListener('DOMContentLoaded', function() {
    console.log('Welcome to The Anti Histamine Diet - Your Guide to Low-Histamine Living!');
    
    // Initialize Meal Database
    initializeMealDatabase();

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Newsletter Form Handling
    const newsletterForms = document.querySelectorAll('.newsletter-form, .footer-newsletter');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (validateEmail(email)) {
                showNotification('Thank you for subscribing! Welcome to The Anti Histamine Diet.', 'success');
                this.querySelector('input[type="email"]').value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    });

    // Blog Card Hover Effects with Performance Optimization
    const blogCards = document.querySelectorAll('.blog-card');
    
    // Intersection Observer for performance
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    blogCards.forEach(card => {
        cardObserver.observe(card);
        
        // Add click functionality for blog cards
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            showNotification(`Opening article: "${title}"`, 'info');
            // In a real blog, this would navigate to the full article
        });
    });

    // Smooth Scrolling for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar Background Change on Scroll
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }

        // Hide navbar on scroll down, show on scroll up
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }, { passive: true });

    // Reading Progress Indicator
    const progressBar = createProgressBar();
    
    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = (window.scrollY / documentHeight) * 100;
        progressBar.style.width = Math.min(scrolled, 100) + '%';
    }, { passive: true });

    // Initialize AOS (Animate On Scroll) alternative
    initScrollAnimations();

    // Contact Form Validation (for contact page)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const name = document.getElementById('name')?.value;
            const email = document.getElementById('email')?.value;
            const message = document.getElementById('message')?.value;

            if (!name || !email || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }

            if (!validateEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate form submission
            showNotification(`Thank you ${name}! Your message has been sent successfully.`, 'success');
            contactForm.reset();
        });
    }
});

// Helper Functions

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
        color: 'white',
        padding: '15px 20px',
        borderRadius: '10px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        zIndex: '10000',
        minWidth: '300px',
        transform: 'translateX(350px)',
        transition: 'transform 0.3s ease',
        fontFamily: 'Inter, sans-serif'
    });

    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
    `;

    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);

    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        removeNotification(notification);
    }, 5000);

    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(350px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'info': default: return 'fa-info-circle';
    }
}

function createProgressBar() {
    const progressContainer = document.createElement('div');
    progressContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: rgba(37, 99, 235, 0.1);
        z-index: 10001;
    `;

    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        height: 100%;
        background: linear-gradient(90deg, #2563eb, #7c3aed);
        width: 0%;
        transition: width 0.3s ease;
    `;

    progressContainer.appendChild(progressBar);
    document.body.appendChild(progressContainer);
    
    return progressBar;
}

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.blog-card, .section-header, .hero-content');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        element.style.cssText += `
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        `;
        animationObserver.observe(element);
    });
}

// Performance optimizations
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Lazy load non-critical features
        console.log('Anti Histamine Diet: Non-critical features loaded');
    });
}

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(registrationError => console.log('SW registration failed'));
    });
}

// Meal Database Functionality
let mealsData = [];

async function initializeMealDatabase() {
    try {
        // Determine the correct path based on current page location
        const path = window.location.pathname.includes('/pages/') ? '../data/meals.json' : 'data/meals.json';
        const response = await fetch(path);
        mealsData = await response.json();
        console.log(`Loaded ${mealsData.length} meals from database`);
        
        // Check if we're on a meals page and display them
        const mealsContainer = document.getElementById('meals-container');
        if (mealsContainer) {
            displayMeals(mealsData);
            initializeMealFilters();
        }
    } catch (error) {
        console.error('Error loading meals database:', error);
        showNotification('Unable to load meal database. Please refresh the page.', 'error');
    }
}

function displayMeals(meals, containerId = 'meals-container') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = meals.map(meal => createMealCard(meal)).join('');
    
    // Add click handlers to meal cards
    container.querySelectorAll('.meal-card').forEach(card => {
        card.addEventListener('click', function() {
            const mealId = this.dataset.mealId;
            const meal = mealsData.find(m => m.id === mealId);
            if (meal) {
                showMealDetails(meal);
            }
        });
    });
}

function createMealCard(meal) {
    return `
        <article class="meal-card" data-meal-id="${meal.id}" data-category="${meal.category.toLowerCase()}" data-histamine="${meal.histamineLevel.toLowerCase()}">
            <div class="meal-image">
                <img src="${meal.image}" alt="${meal.title}" loading="lazy">
                <div class="meal-category">${meal.category}</div>
                <div class="meal-histamine-level ${meal.histamineLevel.toLowerCase()}">${meal.histamineLevel} Histamine</div>
            </div>
            <div class="meal-content">
                <h3>${meal.title}</h3>
                <p class="meal-description">${meal.instructions[0].substring(0, 100)}...</p>
                <div class="meal-meta">
                    <div class="meal-time">
                        <i class="fas fa-clock"></i>
                        <span>${parseInt(meal.prepTime) + parseInt(meal.cookTime)} min total</span>
                    </div>
                    <div class="meal-servings">
                        <i class="fas fa-users"></i>
                        <span>Serves ${meal.servings}</span>
                    </div>
                    <div class="meal-calories">
                        <i class="fas fa-fire"></i>
                        <span>${meal.nutrition.calories} cal</span>
                    </div>
                </div>
                <div class="meal-tags">
                    ${meal.tags.slice(0, 3).map(tag => `<span class="meal-tag">${tag}</span>`).join('')}
                </div>
                <div class="meal-author">
                    <span>By ${meal.author}</span>
                </div>
            </div>
        </article>
    `;
}

function showMealDetails(meal) {
    const modal = createMealModal(meal);
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.meal-modal-content').style.transform = 'translateY(0)';
    }, 10);
    
    // Close handlers
    modal.querySelector('.meal-modal-close').addEventListener('click', closeMealModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeMealModal();
    });
}

function createMealModal(meal) {
    const modal = document.createElement('div');
    modal.className = 'meal-modal';
    modal.innerHTML = `
        <div class="meal-modal-content">
            <div class="meal-modal-header">
                <h2>${meal.title}</h2>
                <button class="meal-modal-close">&times;</button>
            </div>
            <div class="meal-modal-body">
                <div class="meal-modal-image">
                    <img src="${meal.image}" alt="${meal.title}">
                    <div class="meal-modal-badges">
                        <span class="badge category-badge">${meal.category}</span>
                        <span class="badge histamine-badge ${meal.histamineLevel.toLowerCase()}">${meal.histamineLevel} Histamine</span>
                    </div>
                </div>
                <div class="meal-modal-info">
                    <div class="meal-quick-stats">
                        <div class="stat">
                            <i class="fas fa-clock"></i>
                            <div>
                                <strong>Total Time</strong>
                                <span>${parseInt(meal.prepTime) + parseInt(meal.cookTime)} minutes</span>
                            </div>
                        </div>
                        <div class="stat">
                            <i class="fas fa-users"></i>
                            <div>
                                <strong>Servings</strong>
                                <span>${meal.servings}</span>
                            </div>
                        </div>
                        <div class="stat">
                            <i class="fas fa-fire"></i>
                            <div>
                                <strong>Calories</strong>
                                <span>${meal.nutrition.calories}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="meal-ingredients">
                        <h3>Ingredients</h3>
                        <ul>
                            ${meal.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="meal-instructions">
                        <h3>Instructions</h3>
                        <ol>
                            ${meal.instructions.map((step, index) => `<li><span class="step-number">${index + 1}</span>${step}</li>`).join('')}
                        </ol>
                    </div>
                    
                    <div class="meal-nutrition">
                        <h3>Nutrition Facts</h3>
                        <div class="nutrition-grid">
                            <div class="nutrition-item">
                                <strong>${meal.nutrition.calories}</strong>
                                <span>Calories</span>
                            </div>
                            <div class="nutrition-item">
                                <strong>${meal.nutrition.protein}</strong>
                                <span>Protein</span>
                            </div>
                            <div class="nutrition-item">
                                <strong>${meal.nutrition.carbs}</strong>
                                <span>Carbs</span>
                            </div>
                            <div class="nutrition-item">
                                <strong>${meal.nutrition.fat}</strong>
                                <span>Fat</span>
                            </div>
                            <div class="nutrition-item">
                                <strong>${meal.nutrition.fiber}</strong>
                                <span>Fiber</span>
                            </div>
                        </div>
                    </div>
                    
                    ${meal.notes ? `
                        <div class="meal-notes">
                            <h3>Notes</h3>
                            <p>${meal.notes}</p>
                        </div>
                    ` : ''}
                    
                    <div class="meal-tags-full">
                        ${meal.tags.map(tag => `<span class="meal-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
        overflow-y: auto;
        padding: 20px;
        box-sizing: border-box;
    `;
    
    return modal;
}

function closeMealModal() {
    const modal = document.querySelector('.meal-modal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function initializeMealFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const histamineFilter = document.getElementById('histamine-filter');
    const searchInput = document.getElementById('meal-search');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterMeals);
    }
    
    if (histamineFilter) {
        histamineFilter.addEventListener('change', filterMeals);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(filterMeals, 300));
    }
}

function filterMeals() {
    const categoryFilter = document.getElementById('category-filter');
    const histamineFilter = document.getElementById('histamine-filter');
    const searchInput = document.getElementById('meal-search');
    
    const categoryValue = categoryFilter?.value || 'all';
    const histamineValue = histamineFilter?.value || 'all';
    const searchValue = searchInput?.value.toLowerCase() || '';
    
    let filteredMeals = mealsData.filter(meal => {
        const matchesCategory = categoryValue === 'all' || meal.category.toLowerCase() === categoryValue;
        const matchesHistamine = histamineValue === 'all' || meal.histamineLevel.toLowerCase() === histamineValue;
        const matchesSearch = searchValue === '' || 
            meal.title.toLowerCase().includes(searchValue) ||
            meal.ingredients.some(ing => ing.toLowerCase().includes(searchValue)) ||
            meal.tags.some(tag => tag.toLowerCase().includes(searchValue));
        
        return matchesCategory && matchesHistamine && matchesSearch;
    });
    
    displayMeals(filteredMeals);
    
    // Update results count
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
        resultsCount.textContent = `${filteredMeals.length} recipe${filteredMeals.length !== 1 ? 's' : ''} found`;
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for global access if needed
window.mealDatabase = {
    displayMeals,
    filterMeals,
    showMealDetails,
    getMeals: () => mealsData
};