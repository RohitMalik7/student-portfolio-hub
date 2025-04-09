document.addEventListener('DOMContentLoaded', function() {
    // Navigation menu toggle for mobile
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Active link highlighting based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinksItems = document.querySelectorAll('.nav-links a:not(.btn)');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scroll animation for anchor links
    document.querySelectorAll('a[href="#signin"]').forEach(link => {
        link.addEventListener('click', function () {
            const signinSection = document.getElementById('signin');
            if (signinSection) {
                signinSection.style.display = 'block';
            }
        });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic form validation
            if (!name || !email || !subject || !message) {
                showFormMessage('Please fill in all fields', 'error');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For demonstration, we'll just show a success message
            showFormMessage('Your message has been sent. We\'ll get back to you soon!', 'success');
            contactForm.reset();
        });
    }
    
    // Function to show form submission messages
    function showFormMessage(message, type) {
        // Check if a message element already exists
        let messageElement = document.querySelector('.form-message');
        
        // If not, create a new one
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.className = 'form-message';
            contactForm.appendChild(messageElement);
        }
        
        // Set the message and styling
        messageElement.textContent = message;
        messageElement.className = `form-message ${type}`;
        
        // Add styles directly to the element
        messageElement.style.padding = '10px';
        messageElement.style.marginTop = '15px';
        messageElement.style.borderRadius = '5px';
        messageElement.style.fontWeight = '500';
        
        if (type === 'error') {
            messageElement.style.backgroundColor = '#ffebee';
            messageElement.style.color = '#c62828';
            messageElement.style.border = '1px solid #ef9a9a';
        } else {
            messageElement.style.backgroundColor = '#e8f5e9';
            messageElement.style.color = '#2e7d32';
            messageElement.style.border = '1px solid #a5d6a7';
        }
        
        // Auto-hide the message after 5 seconds
        setTimeout(() => {
            messageElement.style.opacity = '0';
            messageElement.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                messageElement.remove();
            }, 500);
        }, 5000);
    }
    
    // Video section placeholder handling
    const videoContainer = document.querySelector('.video-container iframe');
    if (videoContainer && videoContainer.getAttribute('src') === 'videos/sample-video.mp4') {
        // If video doesn't exist yet, show placeholder
        videoContainer.parentElement.innerHTML = `
            <div style="background-color: #432818; color: white; height: 100%; width: 100%; 
                        display: flex; align-items: center; justify-content: center; position: absolute;
                        top: 0; left: 0; border-radius: 10px;">
                <div style="text-align: center; padding: 20px;">
                    <div style="font-size: 3rem; margin-bottom: 10px;">📹</div>
                    <p>Video Introduction Demo</p>
                </div>
            </div>
        `;
    }
});