const OpenAI = require("openai");
const dotenv = require("dotenv");

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

async function listModels() {
  try {
    const models = await client.models.list();

    console.log("Available Groq models:");

    for (const model of models.data) {
      console.log(model.id);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

listModels();