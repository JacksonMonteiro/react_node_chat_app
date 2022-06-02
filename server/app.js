const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use('/api/auth', userRoutes);

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