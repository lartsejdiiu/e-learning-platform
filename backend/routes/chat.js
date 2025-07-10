const express = require('express')
const router = express.Router()
const OpenAI = require('openai') // ✅ modern OpenAI SDK

const openai = new OpenAI({
  // FIX: Use process.env.OPENAI_API_KEY to get the key loaded by dotenv
  apiKey: process.env.OPENAI_API_KEY // This will correctly pick up the key from your .env file
})

router.get('/', async (req, res) => {
  const { message, lesson } = req.body

  const context = `You are a helpful tutor. The student is learning this: ${lesson}.`
  
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: context },
        { role: 'user', content: message }
      ],
      max_tokens: 400
    })

    res.json({ reply: chatCompletion.choices[0].message.content })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Something went wrong' })
  }
})

module.exports = router