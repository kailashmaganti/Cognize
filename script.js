document.addEventListener("DOMContentLoaded", () => {
  const explainBtn = document.getElementById("explainBtn");
  const listenBtn = document.getElementById("listenBtn");
  const quizBtn = document.getElementById("quizBtn");
  const conceptInput = document.getElementById("concept");
  const styleSelect = document.getElementById("style");
  const responseBox = document.getElementById("responseBox");
  const quizBox = document.getElementById("quizBox");

  explainBtn.addEventListener("click", async () => {
    const concept = conceptInput.value.trim();
    const style = styleSelect.value;

    if (!concept) {
      responseBox.innerHTML = "❗ Please enter a concept to explain.";
      return;
    }

    responseBox.innerHTML = "💬 Asking AI... Please wait.";
    quizBox.innerHTML = ""; // Clear quiz when explaining again

    try {
      const response = await fetch("http://magantikailash.page.gd/explain.php", {
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

  quizBtn.addEventListener("click", async () => {
    const concept = conceptInput.value.trim();
    if (!concept) {
      quizBox.innerHTML = "❗ Please enter a concept before quizzing.";
      return;
    }

    quizBox.innerHTML = "📚 Generating quiz...";

    try {
      const response = await fetch("https://226e4566-3051-4936-a852-c16cc60b308e-00-1toij3m4uawqh.pike.replit.dev/quiz.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ concept })
      });

      const result = await response.json();
      quizBox.innerHTML = `<strong>Quiz Time:</strong><br>${result.generations[0].text.trim().replace(/\n/g, "<br>")}`;
    } catch (error) {
      console.error(error);
      quizBox.innerHTML = "❌ Couldn't fetch quiz from AI.";
    }
  });
});

