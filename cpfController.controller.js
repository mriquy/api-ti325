function validarCpfSimples(cpfOriginal) {
    if(!cpfOriginal) return { valido: false, motivo:`CPF não foi informado`};

    // remove caracteres especiais (pontos e traços), deixando apenas numeros
    // replace = trocar
    //\/D/g (expressão regular)
    // /... / as barras no inicio e no fim servem para delimitar onde começa e termina a expressão regular do javascript
    // g é a flag global, ela diz ao javascript para substituir todas as ocorrencias

    const apenasNumeros = string(cpfOriginal).replace(/\D/g, '');

    //2. verifica se possui exatamente 11 digitos
    if (apenasNumeros.length !== 11){
        return {
            valido: false,
            motivo: `O CPF deve ter 11 digitos (voce enviou ${apenasNumeros.length})`
        }
    }


    // 3. verifica se todos os digitos são iguais (ex: 111.111.111-11) é invalido
    const todosIguais = /^(\D)\1{10}\$/.test(apenasNumeros);
    if (todosIguais) {
        return { valido: false, motivo: 'CPF com todos os digitos iguais e invalido.'};
    }
    

    return {
    valido: true,
    motivo: 'CPF possui formato e tamanho validos!',
    cpfLimpo: apenasNumeros
    }

}

//==================================================//
// 2. OBJETO DO CONTROLADOR (contem os metodos chamados pelas rotas)
//==================================================//
const cpfController = {
    recebeCpf: (req, res) =>{
        const { cpf } = req.body

        return res.json({
            sucesso: true,
            mensagem: 'CPF recebido no controller com sucesso!',
            cpfEnviado: cpf

        
        });
    },
    // metodo 2: recebe e valida usando a função auxiliar
    validarCpf: (req, res) =>{
        const { cpf } = req.body
        // ligação: a função do controller chama a função auxiliar criada la no topo!
        const resultado = validarCpfSimples(cpf);
        if (!resultado.valido){
            return res.status(400).json({
                status:'erro',
                valido:false,
                mensagem: resultado.motivo  
            })
        }
    }
}


module.exports = cpfController;


