

// MENU BUTTON FOR NAV BAR

   const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const topNav = document.querySelector(".top-nav");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    topNav.classList.toggle("menu-open");
  });





// ------------------------------------








// "fake" activity to keep the iframe active in memory.

 const iframe = document.getElementById('myFrame');

  // Send a "keep-alive" ping every 15 seconds
  setInterval(() => {
    if (iframe.contentWindow) {
      iframe.contentWindow.postMessage("keep-alive", "*");
    }
  }, 15000);

// ------------------------------------


/**
 * Toggles the pause state of the gallery animation on click.
 * @param {HTMLElement} card - The card element that was clicked.
 */
function toggleGallery(card) {
    card.classList.toggle('paused');
}

/**
 * Loads content for the full-page gallery using Google Drive API.
 */
async function loadGoogleDriveGallery() {
    const container = document.getElementById('full-gallery-container');
    const loader = document.getElementById('gallery-loader');
    if (!container || !loader) return;

    // --- IMPORTANT: REPLACE WITH YOUR CREDENTIALS ---
    const apiKey = 'YOUR_DRIVE_API_KEY'; // Replace with your actual API Key
    const folderId = '1rOhMcIIlw66A-Td0c2o6W5r3qQfVKoOn'; // Replace with your public folder's ID
    // ---------------------------------------------

    if (apiKey === 'YOUR_DRIVE_API_KEY' || folderId === '1rOhMcIIlw66A-Td0c2o6W5r3qQfVKoOn') {
        loader.textContent = 'API Key and Folder ID have not been set. Please get them from the API Guide.';
        return;
    }

    const apiUrl = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`API request failed: ${response.status}`);
        const data = await response.json();
        
        loader.style.display = 'none';

        if (data.files && data.files.length > 0) {
            data.files.forEach(file => {
                if (file.mimeType.startsWith('image/')) {
                    const img = document.createElement('img');
                    img.src = `https://drive.google.com/uc?export=view&id=${file.id}`;
                    img.alt = file.name;
                    img.onerror = () => img.src = 'https://placehold.co/400x225/cccccc/000000?text=Image+Error';
                    img.onclick = () => showImageInModal(img.src);
                    container.appendChild(img);
                }
            });
        } else {
            container.innerHTML = '<p>No images found in the specified folder.</p>';
        }
    } catch (error) {
        console.error('Error fetching from Google Drive API:', error);
        loader.textContent = 'Failed to load images from Google Drive. Check console for errors.';
    }
}

/**
 * Displays an image in a full-screen modal.
 * @param {string} src - The source URL of the image to display.
 */
function showImageInModal(src) {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    if (modal && modalImage) {
        modalImage.src = src;
        modal.classList.add('visible');
    }
}

/**
 * Hides the full-screen image modal.
 */
function hideImageModal() {
    const modal = document.getElementById('image-modal');
    if (modal) {
        modal.classList.remove('visible');
    }
}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ---------------------------------------------
    
    
    
    
    
    
    
    
    
    
    
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
        document.querySelectorAll('header div a').forEach(link => {
            link.classList.remove('active');
        });
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // Load the home page by default when the application starts
    document.addEventListener('DOMContentLoaded', () => {
        const homeLink = document.querySelector('header div a');
        loadPage('home.html', homeLink);
    });
