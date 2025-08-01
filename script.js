document.getElementById("explainBtn").addEventListener("click", () => {
  const concept = document.getElementById("concept").value.trim();
  const style = document.getElementById("style").value;
  const output = document.getElementById("responseBox");

  if (!concept) {
    output.textContent = "⚠️ Please enter a concept to explain.";
    return;
  }

  output.textContent = "🤖 Thinking...";

  fetch("https://YOUR-BACKEND-URL/explain.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ concept, style })
  })
    .then(res => res.json())
    .then(data => {
      output.textContent = data.generations[0].text.trim();
    })
    .catch(() => {
      output.textContent = "❌ Oops! Couldn't fetch response from AI.";
    });
});
