document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('text-input');
    const wordCountEl = document.getElementById('word-count');
    const charCountEl = document.getElementById('char-count');
    const charNoSpaceCountEl = document.getElementById('char-no-space-count');
    const clearButton = document.getElementById('clear-button');

    function updateCounts() {
        const text = textInput.value;

        // Word count (simple split by space, can be improved for punctuation)
        const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
        wordCountEl.textContent = words;

        // Character count (including spaces)
        charCountEl.textContent = text.length;

        // Character count (excluding spaces)
        charNoSpaceCountEl.textContent = text.replace(/\s/g, '').length;
    }

    if (textInput) {
        textInput.addEventListener('input', updateCounts);
    }

    if (clearButton) {
        clearButton.addEventListener('click', () => {
            textInput.value = '';
            updateCounts();
        });
    }

    // Initial count if there's pre-filled text (e.g. from browser cache)
    if (textInput && textInput.value) {
        updateCounts();
    }
});