# AdotePet Api

API Node.js para doação e adoção de animais.

Projeto sem fins lucrativos, a idéia é desenvolver um aplicativo nos moldes do Tinder para centralizar a doação e a adoção de animais. Esta é apenas a API que suportará toda a integração com o Banco de Dados que persistirá as informações.

## Módulos

* [Express](http://expressjs.com/) - Web Framework
* [Sequelize](http://docs.sequelizejs.com/en/latest/) - ORM compatível com bancos de dados SQL
* [Passport](http://passportjs.org/) - Middleware para autenticação de usuários
* [Mocha](https://mochajs.org/) - Test Runner para Node.js
* [Chai](http://chaijs.com/) - Interface BDD e TDD para implementação de testes
* [ApiDoc](http://apidocjs.com/) - Gerador de documentação de APIs baseado em comentários no código
* [Babel](https://babeljs.io/) - Transpiler EcmaScript 6

E tem mais no [package.json](https://github.com/marcogorak/apiAdotePet/blob/master/package.json) do projeto.

## Instalação

* Clone o repositório: `git clone https://github.com/marcogorak/apiAdotePet.git`
* Acesse o diretório do projeto: `cd apiAdotePet`
* Instale as dependências: `npm install`
* Configure o ambiente de banco de dados que irá utilizar criando o arquivo ```config/config.js```:
    ```
    export default {
        database:'adotepet',
        username:'root',
        password: '',
        params:{
            dialect: 'mysql', //Você pode escolher sqlite ou mysql
            host: 'localhost',
            define:{
                underscored: true
            }
        },
        jwtSecret: 'Ad0t3p3t!',
        jwtSession: { session: false}
    }
    ```

* Inicie o servidor: `npm start`.
* Rodar os testes: `npm test`