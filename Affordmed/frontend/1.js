document.getElementById('shorten-form').addEventListener('submit', async function (e) {
  e.preventDefault(); // Prevent form from refreshing the page

  const longUrl = document.getElementById('long-url').value;
  const resultDiv = document.getElementById('result');
  const shortUrlAnchor = document.getElementById('short-url');

  try {
    const response = await fetch('http://localhost:8000/api/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ longUrl: longUrl })
    });

    if (!response.ok) {
      throw new Error('Failed to shorten URL');
    }

    const data = await response.json();

    // Assuming API returns: { shortUrl: "http://short.ly/abc123" }
    shortUrlAnchor.href = data.shortUrl;
    shortUrlAnchor.textContent = data.shortUrl;
    resultDiv.classList.remove('hidden');
  } catch (error) {
    alert('Error: ' + error.message);
    resultDiv.classList.add('hidden');
  }
});
