// script.js
async function generateImage() {
    const prompt = document.getElementById('prompt').value;
    const imageContainer = document.getElementById('image-container');

    // API Key और Endpoint (यहां आपको अपना API Key डालना होगा)
    const apiKey = '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'; // OpenAI या किसी अन्य AI API का API Key
    const apiUrl = 'https://api.openai.com/v1/images/generations'; // OpenAI DALL-E Endpoint

    // API को डेटा भेजें
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                prompt: prompt,
                n: 1, // एक इमेज जनरेट करें
                size: '1024x1024' // इमेज का साइज
            })
        });

        const data = await response.json();
        if (data.data && data.data[0].url) {
            // इमेज को वेबसाइट पर दिखाएं
            const imageUrl = data.data[0].url;
            imageContainer.innerHTML = `<img src="${imageUrl}" alt="Generated Image">`;
        } else {
            imageContainer.innerHTML = '<p>इमेज जनरेट करने में त्रुटि हुई। कृपया पुनः प्रयास करें।</p>';
        }
    } catch (error) {
        console.error('त्रुटि:', error);
        imageContainer.innerHTML = '<p>त्रुटि हुई। कृपया बाद में पुनः प्रयास करें।</p>';
    }
}
