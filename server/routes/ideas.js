const express = require("express");
const axios = require("axios");
const router = express.Router();

// POST /api/ideas
router.post("/", async (req, res) => {
  const { query } = req.body;

  if (!query) return res.status(400).json({ error: "Query is required." });

  try {
    // Example: AI API integration (e.g., OpenAI or Hugging Face)
    const response = await axios.post(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        prompt: `Generate 3 unique app ideas based on the query: "${query}"`,
        max_tokens: 100,
        n: 1,
        stop: null,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const ideas = response.data.choices[0].text
      .trim()
      .split("\n")
      .filter(Boolean);
    res.json({ ideas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate ideas." });
  }
});

module.exports = router;
