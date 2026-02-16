        // Mobile Menu Toggle
        document.addEventListener('DOMContentLoaded', function() {
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const navMenu = document.querySelector('.nav-menu');
            
            if (mobileMenuBtn) {
                mobileMenuBtn.addEventListener('click', function() {
                    navMenu.classList.toggle('active');
                    // Change icon
                    const icon = mobileMenuBtn.querySelector('i');
                    if (icon.classList.contains('fa-bars')) {
                        icon.classList.remove('fa-bars');
                        icon.classList.add('fa-times');
                    } else {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                });
            }
            
            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!event.target.closest('.nav-menu') && !event.target.closest('#mobileMenuBtn') && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
            
            // Contact Form Handling
            const contactForm = document.getElementById('contact-form');
            const formMessage = document.getElementById('form-message');
            
            if (contactForm) {
                contactForm.addEventListener('submit', async function(e) {
                    e.preventDefault();
                    
                    // Clear previous messages
                    clearErrors();
                    hideMessage();
                    
                    // Validate form
                    if (!validateForm()) {
                        return;
                    }
                    
                    // Show loading state
                    const submitBtn = contactForm.querySelector('.form-submit');
                    const submitText = submitBtn.querySelector('.submit-text');
                    const loadingSpinner = submitBtn.querySelector('.loading-spinner');
                    
                    submitText.style.display = 'none';
                    loadingSpinner.style.display = 'inline';
                    submitBtn.disabled = true;
                    
                    // Simulate form submission (replace with actual API call)
                    try {
                        await simulateFormSubmission();
                        
                        // Show success message
                        showMessage('Thank you for your message! We will get back to you soon.', 'success');
                        
                        // Reset form
                        contactForm.reset();
                    } catch (error) {
                        // Show error message
                        showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
                    } finally {
                        // Reset button state
                        submitText.style.display = 'inline';
                        loadingSpinner.style.display = 'none';
                        submitBtn.disabled = false;
                    }
                });
                
                // Form validation on input
                const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
                inputs.forEach(input => {
                    input.addEventListener('blur', function() {
                        validateField(this);
                    });
                    
                    input.addEventListener('input', function() {
                        clearError(this);
                    });
                });
            }
            
            // Form validation functions
            function validateForm() {
                let isValid = true;
                const requiredFields = contactForm.querySelectorAll('[required]');
                
                requiredFields.forEach(field => {
                    if (!validateField(field)) {
                        isValid = false;
                    }
                });
                
                return isValid;
            }
            
            function validateField(field) {
                const value = field.value.trim();
                const errorElement = document.getElementById(`${field.id}-error`);
                
                if (!value) {
                    showError(field, 'This field is required');
                    return false;
                }
                
                if (field.type === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        showError(field, 'Please enter a valid email address');
                        return false;
                    }
                }
                
                clearError(field);
                return true;
            }
            
            function showError(field, message) {
                const errorElement = document.getElementById(`${field.id}-error`);
                if (errorElement) {
                    errorElement.textContent = message;
                    errorElement.style.color = '#e74c3c';
                    errorElement.style.fontSize = '0.8rem';
                    errorElement.style.marginTop = '5px';
                    field.style.borderColor = '#e74c3c';
                }
            }
            
            function clearError(field) {
                const errorElement = document.getElementById(`${field.id}-error`);
                if (errorElement) {
                    errorElement.textContent = '';
                    field.style.borderColor = '';
                }
            }
            
            function clearErrors() {
                const errorMessages = contactForm.querySelectorAll('.error-message');
                errorMessages.forEach(el => el.textContent = '');
                
                const inputs = contactForm.querySelectorAll('input, textarea');
                inputs.forEach(input => input.style.borderColor = '');
            }
            
            function showMessage(message, type) {
                formMessage.textContent = message;
                formMessage.className = `form-message ${type}`;
                formMessage.style.display = 'block';
                
                // Scroll to message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Auto-hide message after 5 seconds
                setTimeout(hideMessage, 5000);
            }
            
            function hideMessage() {
                formMessage.style.display = 'none';
            }
            
            // Simulate form submission (replace with actual fetch/AJAX call)
            function simulateFormSubmission() {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        // Simulate random success (90% success rate for demo)
                        Math.random() > 0.1 ? resolve() : reject();
                    }, 1500);
                });
            }
            
            // Smooth scroll for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 100,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Fade-in animation on scroll
            const fadeElements = document.querySelectorAll('.fade-in');
            
            const fadeInOnScroll = () => {
                fadeElements.forEach(element => {
                    const elementTop = element.getBoundingClientRect().top;
                    const elementVisible = 150;
                    
                    if (elementTop < window.innerHeight - elementVisible) {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }
                });
            };
            
            // Set initial state for fade elements
            fadeElements.forEach(element => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            });
            
            // Run once on load
            fadeInOnScroll();
            
            // Run on scroll
            window.addEventListener('scroll', fadeInOnScroll);
            
            // Google Maps enhancement
            const mapContainer = document.querySelector('.map-container');
            if (mapContainer) {
                mapContainer.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-5px)';
                    this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
                });
                
                mapContainer.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                });
            }
            
            // Add animation to form submission button
            const submitButton = document.querySelector('.form-submit');
            if (submitButton) {
                submitButton.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-2px) scale(1.02)';
                });
                
                submitButton.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            }
        });