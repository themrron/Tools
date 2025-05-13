document.addEventListener('DOMContentLoaded', function() {
    loadComponent('header.html', 'header-placeholder');
    loadComponent('footer.html', 'footer-placeholder');
});

function loadComponent(url, placeholderId) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const placeholder = document.getElementById(placeholderId);
            if (placeholder) {
                placeholder.innerHTML = data;
            } else {
                console.error(`Placeholder with ID '${placeholderId}' not found.`);
            }
        })
        .catch(error => console.error(`Could not load component ${url}:`, error));
}