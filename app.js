const { Client } = require("whatsapp-web.js");
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: "SUA API GROQ AQUI",
});

const client = new Client({
    puppeteer: { headless: false },
});

client.on("message", async (msg) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // ✅ seu modelo desejado
      messages: [
        { role: "system", content: "Você é um assistente útil." },
        { role: "user", content: msg.body }
      ],
    });

    // Use a variável correta
    msg.reply(chatCompletion.choices[0].message.content);

  } catch (error) {
    console.error("Erro ao responder:", error);
    msg.reply("⚠️ Ocorreu um erro ao tentar gerar a resposta com o Groq API.");
  }
});

client.initialize();
