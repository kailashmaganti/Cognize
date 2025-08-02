document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("explain-form");
  const responseBox = document.getElementById("responseBox");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent page reload

    const concept = document.getElementById("concept").value.trim();
    const style = document.getElementById("style").value;

    if (!concept) {
      responseBox.innerHTML = "❗ Please enter a concept to explain.";
      return;
    }

    responseBox.innerHTML = "⏳ Generating explanation...";

    try {
      const response = await fetch("https://226e4566-3051-4936-a852-c16cc60b308e-00-1toij3m4uawqh.pike.replit.dev/explain.php", {, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ concept, style })
      });

      if (!response.ok) {
        throw new Error("AI service unreachable");
      }

      const result = await response.json();

      if (result.generations && result.generations[0].text) {
        responseBox.innerHTML = `<p>${result.generations[0].text.trim()}</p>`;
      } else {
        responseBox.innerHTML = "❌ Unexpected response format from AI.";
      }
    } catch (error) {
      console.error(error);
      responseBox.innerHTML = "❌ Oops! Couldn't fetch response from AI.";
    }
  });
});
