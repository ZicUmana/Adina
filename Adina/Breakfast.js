        // Mobile Menu Toggle
        document.addEventListener('DOMContentLoaded', function() {
            const menuToggle = document.querySelector('.menu-toggle');
            const mainNavigation = document.querySelector('.main-navigation');
            
            if (menuToggle) {
                menuToggle.addEventListener('click', function() {
                    mainNavigation.style.display = mainNavigation.style.display === 'block' ? 'none' : 'block';
                });
            }
            
            // Fade-in animation for menu items
            const menuItems = document.querySelectorAll('.menu-item');
            
            const fadeInOnScroll = () => {
                menuItems.forEach(item => {
                    const itemPosition = item.getBoundingClientRect().top;
                    const screenPosition = window.innerHeight / 1.2;
                    
                    if (itemPosition < screenPosition) {
                        item.classList.add('fade-in');
                    }
                });
            };
            
            // Initial check
            fadeInOnScroll();
            
            // Check on scroll
            window.addEventListener('scroll', fadeInOnScroll);
            
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
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
        });