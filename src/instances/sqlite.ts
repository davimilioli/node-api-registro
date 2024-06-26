import { Sequelize, DataTypes } from 'sequelize';
import { resolve } from 'path';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: resolve(__dirname, '../../registro.db'),
});

const UsuarioDB = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
    },
    rg: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    celular: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    criado_em: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
    },
    atualizado_em: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
    },
}, {
    tableName: 'usuarios',
    timestamps: false
});

async function createTable() {
    try {
        await UsuarioDB.sync();
    } catch (error) {
        console.error('Erro', error);
    }
}

createTable();

export { sequelize, UsuarioDB };
