import { Request, Response } from "express";
import { Usuario } from "../models/Usuario";


export const createUsuario = async (req: Request, res: Response) => {
    let { nome, rg, cpf, telefone, celular, email } = req.body;
    let dataAtual = new Date();
    let ano = dataAtual.getFullYear();
    let mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    let dia = String(dataAtual.getDate()).padStart(2, '0'); 
    let criado_em = `${ano}-${mes}-${dia}`;

    try {

        let id = await Usuario.createUsuario({nome, rg, cpf, telefone, celular, email, criado_em});

        res.status(201).json({
            id: id,
            nome,
            rg,
            cpf,
            telefone,
            celular,
            email,
            criado_em,
            status: 'Usuário criado com sucesso'
        });

    } catch(error: any){
        
        if(!error.message){
            res.json({status: 'Erro ao criar usuário'});
        } 
        
        res.json({status: error.message});
    }
}

export const listUsuarios = async (req: Request, res: Response) => {
    const page: number = parseInt(req.query.page as string) || 1;
    const pageSize: number = parseInt(req.query.pageSize as string) || 12;

    try {
        const usuarios = await Usuario.getUsuarios(page, pageSize);
        const totalUsuarios = await Usuario.getTotalUsuarios();
        res.json({
            page,
            pageSize,
            totalUsuarios,
            usuarios,
        });
    } catch (error: any) {
        if (!error.message) {
            res.json({ status: 'Erro ao consultar o banco de dados' });
        } 

        res.json({ status: error.message });
    }
}

export const listUsuario = async (req: Request, res: Response) => {
    let id: number = parseInt(req.params.id)

    try {
        let usuario = await Usuario.getUsuario(id);
        res.json({ usuario })
        
    } catch(error: any){
        if(!error.message){
            res.json({status: 'Erro ao consultar o banco de dados'});
        } 
        
        res.json({status: error.message});
    }
}

export const updateUsuario = async (req: Request, res: Response) => {
    let id: number = parseInt(req.params.id);
    let { telefone, celular, email } = req.body;
    let dataAtual = new Date();
    let ano = dataAtual.getFullYear();
    let mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    let dia = String(dataAtual.getDate()).padStart(2, '0'); 
    let atualizado_em = `${ano}-${mes}-${dia}`;

    try {
        await Usuario.updateUsuario(id, telefone, celular, email, atualizado_em);

        res.json({ 
            id,
            status: 'Usuário atualizado com sucesso'
        });
        
    } catch(error: any){
        if (error.message !== 'Usuário não encontrado') {
            res.json({ status: error.message });
        } else {
            res.json({ status: error.message });
        }
    }
}

export const deleteUsuario = async (req: Request, res: Response) => {
    let id: number = parseInt(req.params.id);
 
    try {
        await Usuario.deleteUsuario(id);
        res.json({
            id,
            status: 'Usuário excluido' 
        })

    } catch(error: any){
        if(!error.message){
            res.json({ status: 'Erro ao deletar o usuário' });
        } 
        
        res.json({ status: error.message});
    } 
}