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