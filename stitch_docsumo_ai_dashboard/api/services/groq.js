const Groq = require('groq-sdk');

let groq;
function getGroq() {
  if (!groq) {
    groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return groq;
}

const FORMAT_PROMPTS = {
  'Executive Bullet Points': 'Provide a concise summary using clear, scannable bullet points that highlight the most critical executive-level information.',
  '1-Paragraph Overview': 'Provide a single, well-crafted paragraph that captures the essence of the entire document.',
  'Detailed Chapter Breakdown': 'Break the document into logical sections or chapters. For each section, provide a heading and a detailed summary of its contents.',
  'Key Action Items': 'Extract all actionable items, tasks, deadlines, and recommendations from the document and present them as a prioritized list.',
};

const FOCUS_PROMPTS = {
  'General Summary': 'Cover the document holistically without bias toward any particular domain.',
  'Financial Metrics': 'Focus specifically on financial data, revenue figures, cost structures, budgets, projections, and monetary implications.',
  'Legal & Risks': 'Focus on legal obligations, compliance requirements, risk factors, liabilities, contractual terms, and regulatory concerns.',
  'Technical Details': 'Focus on technical specifications, architecture, methodology, implementation details, and engineering considerations.',
};

async function generateSummary(text, format, focus) {
  const formatInstruction = FORMAT_PROMPTS[format] || FORMAT_PROMPTS['Executive Bullet Points'];
  const focusInstruction = FOCUS_PROMPTS[focus] || FOCUS_PROMPTS['General Summary'];

  const truncatedText = text.length > 10000 ? text.substring(0, 10000) + '\n\n[Document truncated — free-tier token limit reached. First ~10,000 characters analyzed.]' : text;

  let response;
  try {
    response = await getGroq().chat.completions.create({
      model: 'llama-3.1-8b-instant',
      temperature: 0.3,
      max_tokens: 2048,
      messages: [
        {
          role: 'system',
          content: `You are an expert document analyst specializing in extracting and synthesizing key information from complex documents. You always respond in clean, well-structured markdown.`,
        },
        {
          role: 'user',
          content: `Analyze the following document and provide a summary.

**Summary Format:** ${formatInstruction}

**Focus Area:** ${focusInstruction}

**Additional Instructions:**
- Use clean markdown formatting with headers (##), bullet points (-), and bold text (**text**) where appropriate.
- Be precise and factual. Do not fabricate information not present in the document.
- If the document contains data or metrics, reference specific numbers when available.

---

**Document Text:**

${truncatedText}

---

Provide your analysis now:`,
        },
      ],
    });
  } catch (err) {
    if (err.status === 413 || (err.message && err.message.includes('tokens per minute'))) {
      throw new Error('Document is too large for the API free-tier limit. Try a smaller file or a shorter section of the document.');
    }
    throw err;
  }

  return response.choices[0].message.content;
}

module.exports = { generateSummary };
