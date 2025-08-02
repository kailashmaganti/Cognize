const explainBtn = document.getElementById("explainBtn");
const responseBox = document.getElementById("responseBox");
const listenBtn = document.getElementById("listenBtn");

explainBtn.addEventListener("click", async () => {
  const concept = document.getElementById("concept").value.trim();
  const style = document.getElementById("style").value;

  if (!concept) {
    alert("Please enter a concept.");
    return;
  }

  responseBox.innerHTML = "⏳ Generating explanation...";

  try {
    const response = await fetch("https://226e4566-3051-4936-a852-c16cc60b308e-00-1toij3m4uawqh.pike.replit.dev/explain.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ concept, style })
    });

    const data = await response.json();

    if (data.generations && data.generations[0]) {
      responseBox.innerText = data.generations[0].text.trim();
    } else {
      responseBox.innerText = "❌ Oops! Couldn't fetch response from AI.";
    }
  } catch (err) {
    responseBox.innerText = "❌ An error occurred while connecting to the server.";
    console.error(err);
  }
});

// 🔊 Voice Explanation
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
