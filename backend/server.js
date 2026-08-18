const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

app.get("/", (req, res) => {
  res.json({
    message: "BugLens AI Backend is running!",
  });
});

app.post("/api/analyze", async (req, res) => {
  try {
    const { title, description, environment } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        error: "Bug title and description are required.",
      });
    }

    const prompt = `
You are BugLens AI, an expert software debugging assistant.

Analyze the following bug report.

Bug Title:
${title}

Bug Description:
${description}

Environment:
${environment || "Not provided"}

Return ONLY valid JSON using exactly this structure:

{
  "summary": "Short explanation of the issue",
  "severity": "Low | Medium | High | Critical",
  "category": "Frontend | Backend | Database | API | Authentication | Infrastructure | Other",
  "probableCause": "Most likely cause",
  "debuggingSteps": [
    "Step 1",
    "Step 2",
    "Step 3"
  ],
  "recommendedAction": "What the developer should do next",
  "confidence": 0
}

Do not invent information.
Use the bug report to make a practical and concise analysis.
`;

    const response = await client.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const aiText = response.choices[0].message.content;

    let result;

    try {
      result = JSON.parse(aiText);
    } catch (error) {
      return res.status(500).json({
        error: "AI returned an invalid JSON response.",
        raw: aiText,
      });
    }

    res.json(result);

  } catch (error) {
    console.error("AI Error:", error);

    res.status(500).json({
      error:
        error.message ||
        "Something went wrong while analyzing the bug.",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `BugLens AI backend running on http://localhost:${PORT}`
  );
});