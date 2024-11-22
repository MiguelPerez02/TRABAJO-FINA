document.addEventListener("DOMContentLoaded", () => {
    const loadContent = async (url) => {
        try {
            const response = await fetch(url);
            
            if (!response.ok) throw new Error("No se pudo cargar el contenido.");
            
            const data = await response.text();
            document.querySelector('main').innerHTML = data;
            history.pushState(null, '', url);
        } catch (error) {
            console.error("Error al cargar el contenido:", error);
            document.querySelector('main').innerHTML = `<p>Error al cargar la página. Por favor, inténtelo más tarde.</p>`;
        }
    };

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const contentId = link.getAttribute('href').replace('.html', '');
            loadContent(`${contentId}.html`);
        });
    });

    window.addEventListener('popstate', () => {
        const page = window.location.pathname.split('/').pop();
        if (page) loadContent(page);
    });
});
