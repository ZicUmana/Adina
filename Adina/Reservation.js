        // Mobile Menu Toggle
        document.addEventListener('DOMContentLoaded', function() {
            // Mobile Menu
            const menuToggle = document.getElementById('mobile-menu-toggle');
            const mobileMenu = document.getElementById('mobile-menu');
            const closeMenu = document.querySelector('.close-menu');
            
            if (menuToggle) {
                menuToggle.addEventListener('click', function() {
                    mobileMenu.classList.add('active');
                });
            }
            
            if (closeMenu) {
                closeMenu.addEventListener('click', function() {
                    mobileMenu.classList.remove('active');
                });
            }
            
            // Close mobile menu when clicking on a link
            const mobileLinks = mobileMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', function() {
                    mobileMenu.classList.remove('active');
                });
            });
            
            // Multi-step Form Logic
            const form = document.getElementById('reservation-form-element');
            const steps = document.querySelectorAll('.form-step');
            const progressSteps = document.querySelectorAll('.progress-step');
            const nextButtons = document.querySelectorAll('.btn-next');
            const prevButtons = document.querySelectorAll('.btn-prev');
            const submitButton = document.querySelector('.btn-submit');
            const summaryElement = document.getElementById('reservation-summary');
            const successMessage = document.getElementById('success-message');
            const newReservationBtn = document.getElementById('new-reservation-btn');
            
            let currentStep = 1;
            
            // Initialize form
            showStep(currentStep);
            updateProgressBar();
            
            // Next button click
            nextButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const nextStep = parseInt(this.dataset.next);
                    
                    // Validate current step before proceeding
                    if (validateStep(currentStep)) {
                        currentStep = nextStep;
                        showStep(currentStep);
                        updateProgressBar();
                    }
                });
            });
            
            // Previous button click
            prevButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const prevStep = parseInt(this.dataset.prev);
                    currentStep = prevStep;
                    showStep(currentStep);
                    updateProgressBar();
                });
            });
            
            // Form submission
            if (form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    if (validateStep(currentStep)) {
                        // Show summary
                        updateSummary();
                        
                        // Simulate form submission
                        setTimeout(function() {
                            form.style.display = 'none';
                            successMessage.style.display = 'block';
                            
                            // Scroll to success message
                            successMessage.scrollIntoView({ behavior: 'smooth' });
                        }, 1000);
                    }
                });
            }
            
            // New reservation button
            if (newReservationBtn) {
                newReservationBtn.addEventListener('click', function() {
                    // Reset form
                    form.reset();
                    currentStep = 1;
                    showStep(currentStep);
                    updateProgressBar();
                    
                    // Show form, hide success message
                    form.style.display = 'block';
                    successMessage.style.display = 'none';
                    
                    // Scroll to form
                    form.scrollIntoView({ behavior: 'smooth' });
                });
            }
            
            // Set minimum date for reservation (tomorrow)
            const dateInput = document.getElementById('reservation-date');
            if (dateInput) {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                dateInput.min = tomorrow.toISOString().split('T')[0];
                
                // Set default to tomorrow
                dateInput.value = tomorrow.toISOString().split('T')[0];
            }
            
            // Functions
            function showStep(stepNumber) {
                steps.forEach(step => {
                    step.classList.remove('active');
                    if (parseInt(step.dataset.step) === stepNumber) {
                        step.classList.add('active');
                    }
                });
            }
            
            function updateProgressBar() {
                progressSteps.forEach(step => {
                    step.classList.remove('active');
                    if (parseInt(step.dataset.step) <= currentStep) {
                        step.classList.add('active');
                    }
                });
            }
            
            function validateStep(step) {
                const currentStepElement = document.querySelector(`.form-step[data-step="${step}"]`);
                const inputs = currentStepElement.querySelectorAll('input[required], select[required]');
                
                let isValid = true;
                
                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        isValid = false;
                        highlightError(input);
                    } else {
                        removeError(input);
                    }
                    
                    // Email validation
                    if (input.type === 'email' && input.value.trim()) {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(input.value.trim())) {
                            isValid = false;
                            highlightError(input, 'Please enter a valid email address');
                        }
                    }
                    
                    // Phone validation
                    if (input.type === 'tel' && input.value.trim()) {
                        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                        const cleanPhone = input.value.trim().replace(/[\s\-\(\)]/g, '');
                        if (!phoneRegex.test(cleanPhone)) {
                            isValid = false;
                            highlightError(input, 'Please enter a valid phone number');
                        }
                    }
                });
                
                return isValid;
            }
            
            function highlightError(element, message = 'This field is required') {
                element.style.borderColor = '#ff4757';
                element.style.backgroundColor = 'rgba(255, 71, 87, 0.1)';
                
                // Remove existing error message
                const existingError = element.parentNode.querySelector('.error-message');
                if (existingError) {
                    existingError.remove();
                }
                
                // Add error message
                const errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                errorElement.style.color = '#ff4757';
                errorElement.style.fontSize = '0.8rem';
                errorElement.style.marginTop = '5px';
                errorElement.textContent = message;
                
                element.parentNode.appendChild(errorElement);
            }
            
            function removeError(element) {
                element.style.borderColor = '';
                element.style.backgroundColor = '';
                
                const errorElement = element.parentNode.querySelector('.error-message');
                if (errorElement) {
                    errorElement.remove();
                }
            }
            
            function updateSummary() {
                const formData = new FormData(form);
                let summaryHTML = '';
                
                // Format the date
                const date = new Date(formData.get('date'));
                const formattedDate = date.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                });
                
                // Format the time
                const time = formData.get('time');
                const formattedTime = formatTime(time);
                
                summaryHTML = `
                    <div class="summary-item">
                        <span class="summary-label">Date:</span>
                        <span class="summary-value">${formattedDate}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Time:</span>
                        <span class="summary-value">${formattedTime}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Guests:</span>
                        <span class="summary-value">${formData.get('party_size')} ${formData.get('party_size') === '1' ? 'person' : 'people'}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Name:</span>
                        <span class="summary-value">${formData.get('first_name')} ${formData.get('last_name')}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Email:</span>
                        <span class="summary-value">${formData.get('email')}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Phone:</span>
                        <span class="summary-value">${formatPhoneNumber(formData.get('phone'))}</span>
                    </div>
                `;
                
                if (formData.get('seating_preference') && formData.get('seating_preference') !== 'No preference') {
                    summaryHTML += `
                        <div class="summary-item">
                            <span class="summary-label">Seating Preference:</span>
                            <span class="summary-value">${formData.get('seating_preference')}</span>
                        </div>
                    `;
                }
                
                if (formData.get('special_requests')) {
                    summaryHTML += `
                        <div class="summary-item">
                            <span class="summary-label">Special Requests:</span>
                            <span class="summary-value">${formData.get('special_requests')}</span>
                        </div>
                    `;
                }
                
                summaryElement.innerHTML = summaryHTML;
            }
            
            function formatTime(time24) {
                if (!time24) return '';
                
                const [hours, minutes] = time24.split(':');
                const hour = parseInt(hours);
                const ampm = hour >= 12 ? 'PM' : 'AM';
                const hour12 = hour % 12 || 12;
                
                return `${hour12}:${minutes} ${ampm}`;
            }
            
            function formatPhoneNumber(phone) {
                // Simple phone formatting
                if (!phone) return '';
                
                // Remove all non-digits
                const cleaned = phone.replace(/\D/g, '');
                
                // Format based on length
                if (cleaned.length === 11) {
                    return cleaned.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
                } else if (cleaned.length === 10) {
                    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
                }
                
                return phone;
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
            
            // Add form field validation on blur
            const formFields = form.querySelectorAll('input, select, textarea');
            formFields.forEach(field => {
                field.addEventListener('blur', function() {
                    if (this.hasAttribute('required') && !this.value.trim()) {
                        highlightError(this);
                    } else {
                        removeError(this);
                    }
                });
            });
        });