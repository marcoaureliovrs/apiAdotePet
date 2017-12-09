import HttpStatus from 'http-status';
import jwt from 'jwt-simple';

export default app => {
  const config = app.config;
  const Users = app.datasource.models.Users;



  /**
   * @api {post} /token Token autenticado
   * @apiGroup Credencial
   * @apiParam {String} email Email de usuário
   * @apiParam {String} password Senha de usuário
   * @apiParamExample {json} Entrada
   *    {
   *      "email": "john@connor.net",
   *      "password": "123456"
   *    }
   * @apiSuccess {String} token Token de usuário autenticado
   * @apiSuccessExample {json} Sucesso
   *    HTTP/1.1 200 OK
   *    {
   *      "token": "xyz.abc.123.hgf"
   *    }
   * @apiErrorExample {json} Erro de autenticação
   *    HTTP/1.1 401 Unauthorized
   */
  
  app.post('/token', (req, res) => {
    if (req.body.email && req.body.password) {
      const email = req.body.email;
      const password = req.body.password;
      console.log(Users);
      Users.findOne({ where: { email } })
      .then(user => {
        console.log(user.password);
        if (Users.isPassword(user.password, password)) {
          const payload = { id: user.id };
          res.json({
            token: jwt.encode(payload, config.jwtSecret),
          });
        } else {
          res.sendStatus(HttpStatus.UNAUTHORIZED);
        }
      })
      .catch(() => res.sendStatus(HttpStatus.UNAUTHORIZED));
    } else {
      res.sendStatus(HttpStatus.UNAUTHORIZED);
    }
  });
};