document.addEventListener('DOMContentLoaded', function() {
    // Ensure toolsData is loaded (it should be if tools-data.js is included before main.js)
    if (typeof toolsData === 'undefined') {
        console.error('toolsData is not loaded. Make sure tools-data.js is included before main.js');
        return;
    }

    const categories = {}; // To group tools by category

    toolsData.forEach(tool => {
        if (!categories[tool.category]) {
            categories[tool.category] = [];
        }
        categories[tool.category].push(tool);
    });

    renderTools(toolsData); // Initially render all tools

    const searchInput = document.getElementById('tool-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const filteredTools = toolsData.filter(tool =>
                tool.name.toLowerCase().includes(searchTerm) ||
                tool.description.toLowerCase().includes(searchTerm) ||
                (tool.keywords && tool.keywords.some(kw => kw.toLowerCase().includes(searchTerm)))
            );
            renderTools(filteredTools);
        });
    }
});

function renderTools(toolsToRender) {
    // Clear existing tools from all category sections
    document.querySelectorAll('.tools-grid').forEach(grid => grid.innerHTML = '');

    // Create category sections if they don't exist dynamically or use pre-defined ones
    // For simplicity, let's assume sections exist as defined in index.html
    // e.g., <section id="image-tools-section"><h2>Image Tools</h2><div class="tools-grid" id="image-tools-grid"></div></section>

    toolsToRender.forEach(tool => {
        const toolCard = `
            <div class="col-md-4 col-sm-6 mb-3"> {/* Bootstrap grid classes */}
                <div class="card tool-card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${tool.name}</h5>
                        <p class="card-text">${tool.description}</p>
                        <a href="${tool.path}" class="btn btn-primary">Open Tool</a>
                    </div>
                </div>
            </div>
        `;
        // Find the correct grid for the tool's category
        // For a more dynamic approach, you might create category sections on the fly
        // For now, let's use a simplified approach assuming sections are in index.html
        // and their IDs match a sanitized version of the category name.
        const categoryId = tool.category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and') + '-grid';
        const categoryGrid = document.getElementById(categoryId);

        if (categoryGrid) {
            categoryGrid.insertAdjacentHTML('beforeend', toolCard);
        } else {
            // Fallback: if specific category grid not found, append to a general tools container
            // This part needs to be aligned with how you structure your index.html categories
            // For a simpler start, you might have one large grid and filter,
            // or ensure all category sections exist in index.html
            console.warn(`Category grid for "${tool.category}" (ID: ${categoryId}) not found. Tool "${tool.name}" not displayed in specific category.`);
            // Example: create a generic tools container if one doesn't exist
            let genericGrid = document.getElementById('all-tools-grid');
            if (!genericGrid) {
                const mainContent = document.querySelector('main') || document.body; // Adjust selector
                mainContent.insertAdjacentHTML('beforeend', '<h2>All Tools</h2><div class="row" id="all-tools-grid"></div>');
                genericGrid = document.getElementById('all-tools-grid');
            }
            if (genericGrid) {
               genericGrid.insertAdjacentHTML('beforeend', toolCard);
            }
        }
    });

    // If you want to display category headers only if there are tools for them after filtering:
    // You'd iterate through your category sections and hide/show them based on whether their .tools-grid has children.
}

// Call in index.html after toolsData.js and main.js are loaded
// <script src="js/tools-data.js"></script>
// <script src="js/main.js"></script>