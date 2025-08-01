document.getElementById("explainBtn").addEventListener("click", () => {
  const concept = document.getElementById("concept").value.trim();
  const style = document.getElementById("style").value;
  const output = document.getElementById("responseBox");

  if (!concept) {
    output.textContent = "Please enter a concept to learn.";
    return;
  }

  output.textContent = "🤖 Thinking...";

  setTimeout(() => {
    const responses = {
      simple: `“${concept}” means something that can be simply understood as a basic rule or principle. It focuses on the core idea without complexity.`,
      example: `Let’s explain “${concept}” through an example: Imagine you’re... (example-based explanation).`,
      analogy: `“${concept}” is like a ... (analogy). Think of it as similar to something you already know.`,
      visual: `Picture “${concept}” like a diagram: elements flowing from one side to another, interacting visually.`,
      step: `Let’s break “${concept}” down step-by-step: Step 1 – Understand the basics... Step 2 – Connect it to real use.`,
    };

    output.textContent = responses[style] || "Explanation style not recognized.";
  }, 800);
});
