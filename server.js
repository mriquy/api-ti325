require('dotenv').config(); //carrega as variaveis do arquivo .env para o process.env
const express = require('express');
const app = express();

// rota ou endpoint
            // request, response
app.get('/ping', (req, res) => {
    return res.json({message:'pong'});
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
//  console.log('servidor rodando... em http://localhost:3000')    
    console.log('servidor rodando... em http://localhost:3000:${PORT}')
})

