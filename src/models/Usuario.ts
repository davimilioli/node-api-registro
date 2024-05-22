import { UsuarioDB } from '../instances/sqlite';

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
      await UsuarioDB.create({
        nome: usuario.nome,
        rg: usuario.rg,
        cpf: usuario.cpf,
        telefone: usuario.telefone,
        celular: usuario.celular,
        email: usuario.email,
        criado_em: usuario.criado_em,
      })

    }catch(error){
      console.error('Erro ao criar novo usuário', error);
      throw new Error('Erro ao criar novo usuário');
    }

  },
  async getUsuarios(page: number = 1, pageSize: number = 12) {

    try {
      const offset = (page - 1) * pageSize;

      const { rows: usuarios, count: totalUsuarios } = await UsuarioDB.findAndCountAll({
        offset: offset,
        limit: pageSize,
        order: [['id', 'ASC']],
      });

      return {
        usuarios: usuarios,
        qtd: totalUsuarios,
      };

    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw new Error('Erro ao buscar usuários');
    }

  },    
  async getUsuario(id: number) {

    try {
      return await UsuarioDB.findByPk(id);

    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw new Error('Erro ao buscar usuário');
    }

  },
  async updateUsuario(id: number,
    telefone: string | undefined,
    celular: string | undefined,
    email: string | undefined,
    atualizado_em: string
  ) {
    try {
      const updateUsuario: { [key: string]: any } = { atualizado_em };
  
      if (telefone !== undefined) {
        updateUsuario.telefone = telefone;
      }
  
      if (celular !== undefined) {
        updateUsuario.celular = celular;
      }
  
      if (email !== undefined) {
        updateUsuario.email = email;
      }
  
      const [result] = await UsuarioDB.update(updateUsuario, {
        where: { id },
      });
  
      if (result === 0) {
        throw new Error(`O ID ${id} não existe`);
      }
        
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw new Error('Erro ao atualizar usuário');
    }

  },
  async deleteUsuario(id: number){
    
    try {
      const delUsuario = await UsuarioDB.destroy({
        where: { id },
      });
  
      if (delUsuario === 0) {
        throw new Error(`O ID ${id} não existe`);
      }

    } catch (error) {

      console.error('Erro ao deletar usuário:', error);
      throw new Error('Erro ao deletar usuário');
    }

  }
};