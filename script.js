document.getElementById("explainBtn").addEventListener("click", () => {
  const concept = document.getElementById("concept").value.trim();
  const style = document.getElementById("style").value;
  const output = document.getElementById("responseBox");

  if (!concept) {
    output.textContent = "⚠️ Please enter a concept to explain.";
    return;
  }

  output.textContent = "🤖 Thinking...";

  fetch("https://226e4566-3051-4936-a852-c16cc60b308e-00-1toij3m4uawqh.pike.replit.dev", {
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
