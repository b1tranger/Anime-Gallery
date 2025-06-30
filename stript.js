
        // JavaScript is included here for a self-contained example
        
        /**
         * Fetches an HTML file and loads its content into the <main> element.
         * @param {string} page - The name of the page to load (e.g., 'home', 'about').
         * @param {HTMLElement} clickedLink - The navigation link element that was clicked.
         */
        async function loadPage(page, clickedLink) {
            const mainContent = document.getElementById('main-content');
            
            // Add a class to fade out the old content
            mainContent.classList.add('loading');

            try {
                // Fetch the content from the corresponding HTML file
                const response = await fetch(`${page}.html`);

                // Check if the page exists
                if (!response.ok) {
                    throw new Error(`Page not found: ${page}.html`);
                }

                const content = await response.text();
                
                // Wait for fade-out to complete before loading new content
                setTimeout(() => {
                    mainContent.innerHTML = content;
                    // Remove loading class to fade in new content
                    mainContent.classList.remove('loading');

                    // Update the active state on navigation links
                    updateActiveLink(clickedLink);
                }, 300); // This duration should match the CSS transition

            } catch (error) {
                console.error('Error loading page:', error);
                mainContent.innerHTML = `<div class="content-section"><h2>Error</h2><p>Sorry, the requested page could not be loaded.</p></div>`;
                mainContent.classList.remove('loading');
            }
        }

        /**
         * Updates which navigation link is styled as 'active'.
         * @param {HTMLElement} activeLink - The link that should be marked as active.
         */
        function updateActiveLink(activeLink) {
            // Remove 'active' class from all nav links
            document.querySelectorAll('header nav a').forEach(link => {
                link.classList.remove('active');
            });
            // Add 'active' class to the clicked link
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
        
        /**
         * Toggles the 'paused' class on a scrolling gallery to pause/resume the animation.
         * @param {HTMLElement} card - The card element that was clicked.
         */
        function toggleGallery(card) {
            const gallery = card.querySelector('.scrolling-gallery');
            if (gallery) {
                gallery.classList.toggle('paused');
            }
        }

        // Load the home page by default when the application starts
        document.addEventListener('DOMContentLoaded', () => {
            const homeLink = document.querySelector('header nav a');
            loadPage('home', homeLink);
        });

    