const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messagesRoute');
const socket = require('socket.io');
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/messages', messageRoutes);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Conexão com o banco de dados realizada com sucesso");
})
.catch(err => {
    console.log(`Erro ao conectarse com o banco de dados: ${err.message}`);
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado na porta: ${process.env.PORT}`);
}); 

const io = socket(server, {
    cors: {
        origin: "*",
        credentials: true
    },
});

global.onlineUsers = new Map();

io.on('connection', (socket) => {
    global.chatSocket = socket;
    socket.on('add-user', (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on('send-msg', (data) => {
        const sendUserSocket = onlineUsers.get(data.to); 
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit('msg-receive', data.message);
        }
    });
});