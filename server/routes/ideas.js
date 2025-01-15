import express from "express";
import axios from "axios";
import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config(); // Ensure dotenv is configured
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
console.log(process.env.OPENAI_API_KEY);
const router = express.Router();
// POST /api/ideas
router.post("/", async (req, res) => {
  const { query } = req.body;

  if (!query) return res.status(400).json({ error: "Query is required." });

  try {
    // Example: AI API integration (e.g., OpenAI or Hugging Face)
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Your job is to generate unique but brief ideas from user input.",
        },
        {
          role: "user",
          content: `Generate 3 unique ideas using upto 10 words based on the query: "${query}"`,
        },
        {
          role: "system",
          content:`3 Criteria:
                  1. Relevance: How well each idea aligns with the original user query.
                  2. Potential Impact: The significance or potential of each idea.
                  3. Feasibility: How easily the idea can be acted upon.
                  Score the given 3 ideas on a scale of 1 to 5 (1 being the highest) based on the criteria. Provide a single explanation for each idea that justifies the score by discussing how the idea aligns with these three criteria. Ensure the explanation is cohesive and concise.
                  Give the response in the following format:
                  [{ideaTitle: "...", ideaScore: 1-5, ideaExplanation: "..."},{...},{...}]`,
        },
      ],
    });

    // console.log(response.choices[0].message.content);

    res.json({ ideas: response.choices[0].message.content, query });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate ideas." });
  }
});

router.post("/explain", async (req, res) => {
  const { chosenIdeas, lastQuery } = req.body;
  console.log(chosenIdeas, lastQuery);

  if (!chosenIdeas)
    return res.status(400).json({
      error: "Please choose at least one idea to get explanation for.",
    });
  try {
    // Example: AI API integration (e.g., OpenAI or Hugging Face)
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Your job is to explain the selected ideas in depth and provide detailed insights with proper context.",
        },
        {
          role: "user",
          content: `Based on the query: "${lastQuery}", Explain these ideas in depth:: "${chosenIdeas}"`,
        },
      ],
    });
    // const ideas = response.choices[0].message.content
    // .replace(/\*/g, "")
    //   .trim()
    //   .split("\n")
    //   .filter(
    //     (line) => line.trim().startsWith("1.") || line.trim().startsWith("2.")
    //   );
    res.json(response.choices[0].message.content);
    // console.log(ideas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate ideas." });
  }
});

export default router;
// module.exports = router;
