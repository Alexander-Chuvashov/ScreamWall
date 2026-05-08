// server/index.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// 🔥 Socket.io с CORS
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
});

// Middleware
app.use(cors());
app.use(express.json());

// Подключение к MongoDB
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB подключена — крики будут лететь!'))
    .catch(err => console.error('❌ Ошибка MongoDB:', err));

// 🔥 Socket.io события
io.on('connection', socket => {
    console.log('🔗 Новый пользователь подключился:', socket.id);

    // Когда кто-то добавляет крик — уведомляем всех
    socket.on('scream:created', scream => {
        console.log('📢 Новый крик:', scream.text);
        io.emit('scream:new', scream); // Отправляем ВСЕМ подключённым
    });

    // Когда кто-то реагирует на крик
    socket.on('scream:reacted', ({ screamId, reaction }) => {
        console.log(`💥 Реакция ${reaction} на крик ${screamId}`);
        io.emit('scream:reaction-updated', { screamId, reaction });
    });

    socket.on('disconnect', () => {
        console.log('🔌 Пользователь отключился:', socket.id);
    });
});

// Тестовый роут
app.get('/api/health', (req, res) => {
    res.json({
        message: '📢 Стена Криков работает!',
        sockets: io.engine.clientsCount,
    });
});

// Запуск
server.listen(PORT, () => {
    console.log(`🔥 Сервер + Socket.io на порту ${PORT}`);
});
