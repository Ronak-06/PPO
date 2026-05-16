const { Anthropic } = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = "You are a project management assistant. Be concise, professional, and actionable in all responses.";

const generateDescription = async (req, res) => {
  try {
    const { title, projectContext } = req.body;
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: [
        { role: "user", content: `Generate a concise task description for the task: "${title}". Project context: ${projectContext}` }
      ],
    });
    res.json({ description: response.content[0].text });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const suggestPriority = async (req, res) => {
  try {
    const { title, deadline } = req.body;
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 50,
      system: SYSTEM_PROMPT,
      messages: [
        { role: "user", content: `Suggest a priority (High, Medium, or Low) for the task: "${title}" with deadline: ${deadline}. Return only the priority level.` }
      ],
    });
    res.json({ priority: response.content[0].text.trim() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const smartSummary = async (req, res) => {
  try {
    const { projectName, tasks } = req.body;
    const taskSummary = tasks.map(t => `${t.title} (${t.status})`).join(', ');
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: [
        { role: "user", content: `Generate a smart weekly summary of project progress for project "${projectName}". Tasks: ${taskSummary}` }
      ],
    });
    res.json({ summary: response.content[0].text });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateDescription, suggestPriority, smartSummary };
