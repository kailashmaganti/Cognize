<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Cognize – Personalized AI Learning</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="container">
    <header>
      <h1>Cognize</h1>
      <p class="tagline">Your Personalized AI Learning Companion</p>
    </header>

    <main class="card">
      <form id="explain-form">
        <label for="concept">🧠 What concept do you want to understand?</label><br />
        <input type="text" id="concept" placeholder="e.g. Quantum Entanglement" required /><br /><br />

        <label for="style">🎯 Choose your explanation style:</label><br />
        <select id="style">
          <option value="simple">Simple Explanation</option>
          <option value="example">Example-based</option>
          <option value="analogy">Analogy</option>
          <option value="visual">Visual Description</option>
          <option value="step">Step-by-Step</option>
        </select><br /><br />

        <button id="explainBtn" type="submit">🔍 Explain Concept</button>
      </form>

      <div id="responseBox" class="response">💬 Waiting for input...</div>
    </main>

    <footer>
      <p>© 2025 Cognize by Kailash — Built with 🤍</p>
    </footer>
  </div>

  <script src="script.js"></script>
</body>
</html>
