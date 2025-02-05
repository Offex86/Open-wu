async function generateImage() {
    const prompt = document.getElementById('prompt').value;
    const imageContainer = document.getElementById('image-container');

    if (!prompt) {
        imageContainer.innerHTML = '<p>Please enter a prompt!</p>';
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/generate-image', { // बैकएंड का URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });

        const data = await response.json();
        if (response.ok) {
            const imageUrl = data.imageUrl;
            imageContainer.innerHTML = `<img src="${imageUrl}" alt="Generated Image" style="max-width: 100%;">`;
        } else {
            imageContainer.innerHTML = `<p>Error: ${data.error}</p>`;
        }
    } catch (error) {
        console.error('Error:', error);
        imageContainer.innerHTML = '<p>Something went wrong. Please try again later.</p>';
    }
}