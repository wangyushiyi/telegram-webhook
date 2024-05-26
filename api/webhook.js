// api/webhook.js
const express = require('express');
const fetch = require('node-fetch'); // 需要安装 node-fetch
const app = express();
app.use(express.json());

app.post('/api/webhook', (req, res) => {
    const data = req.body;

    // 处理Telegram消息逻辑
    if (data.message) {
        const chatId = data.message.chat.id;
        const responseMessage = '感谢您的消息！';
        sendTelegramMessage(chatId, responseMessage);
    }

    res.sendStatus(200);
});

const sendTelegramMessage = (chatId, message) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const data = {
        chat_id: chatId,
        text: message
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.error(err));
};

module.exports = app;
