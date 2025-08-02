document.getElementById('explain-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const concept = document.getElementById('concept').value;
  const style = document.getElementById('style').value;
  const responseBox = document.getElementById('response');

  responseBox.innerHTML = "💬 Waiting for input...";

  const payload = {
    concept: concept,
    style: style
  };

  try {
    const response = await fetch('https://226e4566-3051-4936-a852-c16cc60b308e-00-1toij3m4uawqh.pike.replit.dev/explain.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (data.generations && data.generations.length > 0) {
      responseBox.innerHTML = `<strong>🤖 AI Explanation:</strong><br>${data.generations[0].text}`;
    } else {
      responseBox.innerHTML = "⚠️ Oops! Couldn't fetch a valid response.";
    }

  } catch (error) {
    console.error(error);
    responseBox.innerHTML = "❌ Error: Couldn't fetch response from AI.";
  }
});
