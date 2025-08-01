<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$apiKey = "YfYYyltPWR63LMwRWj2YN8BaFAF8QDRR3n56Amjt";
$input = json_decode(file_get_contents("php://input"), true);
$concept = $input['concept'];
$style = $input['style'];

$stylePrompt = match($style) {
  'simple' => "Explain in simple terms:",
  'example' => "Explain with an example:",
  'analogy' => "Explain using an analogy:",
  'visual' => "Describe visually:",
  'step' => "Explain step-by-step:",
  default => "Explain this:"
};

$fullPrompt = "$stylePrompt $concept";

$payload = json_encode([
  "model" => "command",
  "prompt" => $fullPrompt,
  "max_tokens" => 300,
  "temperature" => 0.7
]);

$ch = curl_init("https://api.cohere.ai/v1/generate");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  "Authorization: Bearer $apiKey",
  "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);

$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>
