export default {
    database:'adotepet',
    username: 'adotepet',
    password: 'superfacil',
    params:{
        dialect: 'sqlite',
        storange: `${process.env.NODE_ENV}_pets.sqlite`,
        define:{
            underscored: true
        }
    },
    jwtSecret: 'Ad0t3p3t!',
    jwtSession: { session: false}
}