document.getElementById("explainBtn").addEventListener("click", () => {
  const concept = document.getElementById("concept").value.trim();
  const style = document.getElementById("style").value;
  const output = document.getElementById("responseBox");

  if (!concept) {
    output.textContent = "Please enter a concept.";
    return;
  }

  output.textContent = "Thinking... 🤔";

  // Temporary mock responses (replace with real AI later)
  setTimeout(() => {
    const styles = {
      simple: `The concept of "${concept}" means something basic explained in a simple way.`,
      example: `Imagine "${concept}" like this: Think of a real-life scenario...`,
      analogy: `"${concept}" is like a sponge absorbing water — it works similarly by...`,
      visual: `Picture "${concept}" as a diagram with forces pulling each other...`,
      step: `Step 1: Understand the base idea of "${concept}". Step 2: ...`,
    };
    output.textContent = styles[style] || "Explanation style not supported.";
  }, 1000);
});

