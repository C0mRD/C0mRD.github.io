document.addEventListener('DOMContentLoaded', function() {

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if the link is internal (starts with #)
            if (this.hash !== "") {
                e.preventDefault(); // Prevent default anchor click behavior

                const hash = this.hash;
                const targetElement = document.querySelector(hash);

                if (targetElement) {
                    // Get header height to offset scroll position
                    const header = document.querySelector('header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });

                    // Close mobile menu if open after clicking a link
                    const menu = document.querySelector('.nav-links');
                    if (menu.classList.contains('active')) {
                         menu.classList.remove('active');
                    }
                }
            }
        });
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-links');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

});