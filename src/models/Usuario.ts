import db  from '../instances/sqlite';
import { UsuarioSequelize } from '../instances/sqlSequelize';

type Usuario = {
    id?: number,
    nome: string,
    rg: string,
    cpf: string,
    telefone: string,
    celular: string,
    email: string,
    criado_em: string,
    atualizado_em?: string
}

export const Usuario = {
    async createUsuario(usuario: Usuario) {

        try{   
            const novoUsuario = await UsuarioSequelize.create({
                nome: usuario.nome,
                rg: usuario.rg,
                cpf: usuario.cpf,
                telefone: usuario.telefone,
                celular: usuario.celular,
                email: usuario.email,
                criado_em: usuario.criado_em,
            })

            console.log('Novo usuário criado:', novoUsuario.toJSON());
        }catch(error){
            console.error('Erro ao criar novo usuário', error);
        }

/*         const dados = {
            nome: usuario.nome,
            rg: usuario.rg,
            cpf: usuario.cpf,
            telefone: usuario.telefone,
            celular: usuario.celular,
            email: usuario.email,
            criado_em: usuario.criado_em,
            atualizado_em: usuario.atualizado_em
        };
        
        const sql = `
            INSERT INTO usuarios (nome, rg, cpf, telefone, celular, email, criado_em) VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        return new Promise<number>((resolve, reject) => {
            db.run(sql, Object.values(dados), function(error) {
                if (error) {

                    reject(new Error('Erro ao inserir dados no banco de dados'));
                    return;
                } else {
                    resolve(this.lastID);
                }
            });  
        }); */
    },
    async getUsuarios(page: number, pageSize: number) {
        const lista: Usuario[] = [];
        const offset = (page - 1) * pageSize;
        const sql = `SELECT * FROM usuarios ORDER BY id LIMIT ? OFFSET ?`;
    
        return new Promise<Usuario[]>((resolve, reject) => {
            db.all(sql, [pageSize, offset], (error, rows) => {
                if (error) {
                    reject(new Error('Erro ao consultar usuários'));
                    return;
                }
    
                if (!rows) {
                    reject();
                    return;
                }
    
                rows.forEach((row) => {
                    const usuario: Usuario = row as Usuario;
                    lista.push(usuario);
                });
    
                resolve(lista);
            });
        });
    },    
    async getTotalUsuarios() {
        const sql = `SELECT COUNT(*) as total FROM usuarios`;
    
        return new Promise<number>((resolve, reject) => {
            db.get(sql, [], (error, row: any) => {
                if (error) {
                    reject(new Error('Erro ao contar usuários'));
                    return;
                }
    
                if (!row || !row.total) {
                    resolve(0);
                    return;
                }
    
                resolve(row.total);
            });
        });
    },
    async getUsuario(id: number) {
        const sql = `SELECT * FROM usuarios WHERE ID = ?`;

        return new Promise<Usuario[]>((resolve, reject) => {
            db.all(sql, [id], (error, rows) => {
                if (error) {
                    reject(new Error('Erro ao consultar usuário'));
                    return;
                }
                
                const usuario: Usuario[] = rows.map((row) => row as Usuario);

                if(usuario.length == 0){
                    reject(new Error(`O ID ${id} não existe`));
                }

                resolve(usuario)
            });
        });
    },
    async updateUsuario(id: number, telefone: string | undefined, celular: string | undefined, email: string | undefined, atualizado_em: string) {
        let sql = "UPDATE usuarios SET ";
        const values: any = [];
    
        if (telefone !== undefined) {
            sql += "telefone = ?, ";
            values.push(telefone);
        }
    
        if (celular !== undefined) {
            sql += "celular = ?, ";
            values.push(celular);
        }
    
        if (email !== undefined) {
            sql += "email = ?, ";
            values.push(email);
        }
    
        sql += "atualizado_em = ? WHERE id = ?";
        values.push(atualizado_em, id);
    
        return new Promise<void>((resolve, reject) => {
            db.run(sql, values, function(error) {
                if (error) {
                    reject(new Error('Erro ao atualizar usuário'));
                }
    
                if (this.changes === 0) {
                    reject(new Error(`O ID ${id} não existe`));
                    return;
                }
    
                resolve();
            });
        });
    },
    async deleteUsuario(id: number){
        const sql = `DELETE FROM usuarios WHERE id = ? `;

        return new Promise<void>((resolve, reject) => {
            db.run(sql, [id], function(error) {
                if(error){
                    reject(error);
                }

                if(this.changes === 0){
                    reject(new Error(`O ID ${id} não existe`));
                }

                resolve();
            })
        })
    }
};