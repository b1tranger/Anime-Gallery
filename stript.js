
    /**
     * Toggles the pause state of the gallery animation on click.
     * @param {HTMLElement} card - The card element that was clicked.
     */
    function toggleGallery(card) {
        card.classList.toggle('paused');
    }

    /**
     * Fetches an HTML file and loads its content into the <main> element.
     * @param {string} pageUrl - The URL of the HTML file to load.
     * @param {HTMLElement} clickedLink - The navigation link element that was clicked.
     */
    async function loadPage(pageUrl, clickedLink) {
        const mainContent = document.getElementById('main-content');
        mainContent.classList.add('loading');
        
        try {
            const response = await fetch(pageUrl);
            if (!response.ok) {
                // This error will likely happen when running from a local file.
                // We provide fallback content here.
                throw new Error(`Page not found or blocked by browser security: ${pageUrl}`);
            }
            const content = await response.text();
            
            setTimeout(() => {
                mainContent.innerHTML = content;
                mainContent.classList.remove('loading');
                updateActiveLink(clickedLink);
            }, 300);

        } catch (error) {
            console.error('Error loading page:', error);
            // Handle cases where fetch fails (e.g., local file access)
            let fallbackContent = `<section class="content-section"><h2>Error</h2><p>Sorry, the requested page could not be loaded. Please try running this from a web server.</p></section>`;
            if (pageUrl === 'about.html') {
                fallbackContent = `<section class="content-section"><h2>About This Gallery</h2><p>This is a demo gallery.</p></section>`;
            } else if (pageUrl === 'contact.html') {
                fallbackContent = `<section class="content-section"><h2>Contact</h2><p>Contact info would go here.</p></section>`;
            }

            setTimeout(() => {
                mainContent.innerHTML = fallbackContent;
                mainContent.classList.remove('loading');
                updateActiveLink(clickedLink);
            }, 300);
        }
    }

    /**
     * Updates which navigation link is styled as 'active'.
     * @param {HTMLElement} activeLink - The link that should be marked as active.
     */
    function updateActiveLink(activeLink) {
        document.querySelectorAll('header div nav a').forEach(link => {
            link.classList.remove('active');
        });
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // Load the home page by default when the application starts
    document.addEventListener('DOMContentLoaded', () => {
        const homeLink = document.querySelector('header div nav a');
        loadPage('home.html', homeLink);
    });
