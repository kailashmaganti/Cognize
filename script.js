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
    quizBox.innerHTML = "";

    try {
      const response = await fetch("https://226e4566-3051-4936-a852-c16cc60b308e-00-1toij3m4uawqh.pike.replit.dev/explain.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      const quizPrompt = `Create 3 multiple choice questions with 4 options each (A, B, C, D) and mark the correct option in parentheses like this: (Answer: B). Topic: ${concept}`;
      const response = await fetch("https://226e4566-3051-4936-a852-c16cc60b308e-00-1toij3m4uawqh.pike.replit.dev/explain.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ concept: quizPrompt, style: "simple" })
      });

      const result = await response.json();
      const rawText = result.generations[0].text.trim();

      const questions = rawText.split(/\n(?=\d+\.)/); // split by 1. 2. 3.

      let formHTML = `<strong>Quiz Time:</strong><form id="quizForm">`;
      questions.forEach((q, index) => {
        const questionMatch = q.match(/^\d+\.\s*(.*?)\n?/);
        const answerMatch = q.match(/\(Answer:\s*([A-D])\)/i);
        const options = q.match(/A\..*?\nB\..*?\nC\..*?\nD\..*?\n?/s);

        if (questionMatch && options && answerMatch) {
          formHTML += `<div class="question-block">
            <p><strong>${questionMatch[1]}</strong></p>`;

          ["A", "B", "C", "D"].forEach(letter => {
            const optionText = q.match(new RegExp(`${letter}\\.\\s*(.*?)(\\n|$)`));
            if (optionText) {
              formHTML += `
                <label>
                  <input type="radio" name="q${index}" value="${letter}" required />
                  ${letter}. ${optionText[1].trim()}
                </label><br>`;
            }
          });

          formHTML += `<input type="hidden" name="q${index}_answer" value="${answerMatch[1].toUpperCase()}" /></div><br>`;
        }
      });

      formHTML += `<button type="submit">✅ Submit Answers</button></form>`;
      quizBox.innerHTML = formHTML;

      document.getElementById("quizForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        let score = 0;
        let total = 0;

        for (let [key, value] of formData.entries()) {
          if (key.endsWith("_answer")) continue;
          const correct = formData.get(`${key}_answer`);
          total++;
          if (value === correct) score++;
        }

        quizBox.innerHTML += `<p><strong>✅ You scored ${score} out of ${total}!</strong></p>`;
      });

    } catch (error) {
      console.error(error);
      quizBox.innerHTML = "❌ Couldn't fetch quiz from AI.";
    }
  });
});
