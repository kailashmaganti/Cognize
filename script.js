document.addEventListener("DOMContentLoaded", () => {
  const explainBtn = document.getElementById("explainBtn");
  const conceptInput = document.getElementById("concept");
  const styleSelect = document.getElementById("style");
  const responseBox = document.getElementById("responseBox");

  explainBtn.addEventListener("click", async () => {
    const concept = conceptInput.value.trim();
    const style = styleSelect.value;

    if (!concept) {
      responseBox.innerHTML = "❗ Please enter a concept to explain.";
      return;
    }

    responseBox.innerHTML = "⌛ Asking AI... Please wait.";

    try {
      const response = await fetch("https://YOUR-REPLIT-URL/explain.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ concept, style })
      });

      const result = await response.json();
      responseBox.innerHTML = `✅ <strong>Explanation:</strong> ${result.generations[0].text.trim()}`;
    } catch (error) {
      console.error(error);
      responseBox.innerHTML = "❌ Oops! Couldn't fetch response from AI.";
    }
  });
});
