import bcrypt from 'bcrypt';

export default (sequelize, DataType) => {
    const Users = sequelize.define('Users', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataType.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        data_nascimento:{
            type: DataType.DATE,
        },
        cpf: {
            type: DataType.BIGINT,
            unique: true
        },
        rg: {
            type: DataType.STRING,
            unique: true
        },
        cep: {
            type: DataType.BIGINT
        },
        estado: {
            type: DataType.STRING
        },
        cidade: {
            type: DataType.STRING
        },
        logradouro: {
            type: DataType.STRING
        },
        numero: {
            type: DataType.INTEGER 
        },
        url_profile: {
            type: DataType.STRING
        }
    },
    {
        hooks: {
            beforeCreate: user => {
                const salt = bcrypt.genSaltSync();
                user.set('password', bcrypt.hashSync(user.password, salt));
            }
        },

        classMethods: {
            associate: models => Users.hasMany(models.Pets),
            isPassword: (encodedPassword, password) => bcrypt.compareSync(password, encodedPassword)
        }
    });
    return Users;
}