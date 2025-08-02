document.addEventListener("DOMContentLoaded", () => {
  const explainBtn = document.getElementById("explainBtn");
  const listenBtn = document.getElementById("listenBtn");
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

    responseBox.innerHTML = "💬 Asking AI... Please wait.";

    try {
      const response = await fetch("https://226e4566-3051-4936-a852-c16cc60b308e-00-1toij3m4uawqh.pike.replit.dev/explain.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ concept, style })
      });

      const result = await response.json();
      responseBox.innerHTML = `<strong>Explanation:</strong> ${result.generations[0].text.trim()}`;
    } catch (error) {
      console.error(error);
      responseBox.innerHTML = "❌ Oops! Couldn't fetch response from AI.";
    }
  });

  listenBtn.addEventListener("click", () => {
    const explanation = responseBox.innerText;
    if (explanation) {
      const utterance = new SpeechSynthesisUtterance(explanation);
      utterance.lang = 'en-US';
      utterance.pitch = 1;
      utterance.rate = 1;
      utterance.volume = 1;
      speechSynthesis.speak(utterance);
    } else {
      alert("No explanation available to read.");
    }
  });
});
