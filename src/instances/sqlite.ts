import { Database } from 'sqlite3';
import dotenv from 'dotenv';

dotenv.config();

const db = new Database('./users.db', (err) => {
    if(err){
        console.log('Erro na conexão com o banco de dados', err.message);
    }else {
        console.log('Conexão com o banco de dados feita');
    }
})

/* Comando para criar a tabela USUARIOS */
/* db.serialize(() => {
    const criarTabela = 'CREATE TABLE "usuarios" (id INTEGER PRIMARY KEY, nome VARCHAR, rg VARCHAR(9), cpf VARCHAR(11), telefone VARCHAR(20), celular VARCHAR(20), email VARCHAR, criado_em DATE, atualizado_em DATE)';

    db.run(criarTabela, (err) => {
        if (err) {
            console.error('Erro', err.message);
        } else {
            console.log('Tabela usuarios criada');
        }
    });
}); */


export default db;