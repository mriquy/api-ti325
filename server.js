require('dotenv').config(); //carrega as variaveis do arquivo .env para o process.env
const express = require('express');
const cpfController =require('./cpfController.controller');
const app = express();

app.use(express.json());

// rota ou endpoint
            // request, response
app.get('/', (req, res) => {
    return res.json({message:'API TI325 rodando.....'});
})


app.post('/usuario', (req, res) => {
    const { nome, idade } = req.body;

    // transformações
    // 1. converte o nome para MAISCULAS
    // 2. calcula o ano aproximado de nascimento
    // 3. adiciona um status personalizado
    const nomeFormatado = nome ? nome.toUpperCase() : 'NÃO INFORMADO';
    const anoNascimento = new Date().getFullYear() - idade;



    return res.json({
        mensagem: 'dados recebidos e processados com sucesso',
        dadosOriginais: {nome, idade},
        dadosProcessados:{
        nomeFormatado,
        idade,
        anoNascimentoAproximado: anoNascimento,
        perfil: idade >= 18 ? 'adulto' : 'adolecente'
        }

    })
})



// rota post chamando diretamente a função do controller receboCpf
app.post('/cpf', cpfController.recebeCpf);


const PORT = process.env.PORT;
app.listen(PORT, () => {
//  console.log('servidor rodando... em http://localhost:3000')    
    console.log(`servidor rodando... em http://localhost:${PORT}`)
})

