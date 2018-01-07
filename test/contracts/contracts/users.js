import HttpStatus from 'http-status';
import jwt from 'jwt-simple';

describe('Routes: Users', () => {
  const Users = app.datasource.models.Users;
  const jwtSecret = app.config.jwtSecret;
  const defaultUser = {
    id: 1,
    name: 'Test User',
    email: 'test@mail.com',
    password: 'testPassword',
    data_nascimento: '1992-07-26',
    cpf:'',
    rg:'',
    cep:'',
    estado:'',
    cidade:'',
    logradouro:'',
    numero:666,
    url_profile:''
};
let token;


beforeEach(done => {
  Users
  .destroy({where: {}})
  .then(() => Users.create(defaultUser))
  .then(user => {
    token = jwt.encode({id: user.id}, jwtSecret);
    done();
  });
});


  describe('GET /users', () => {
    it('should validate a list of users', done => {
      request
      .get('/users')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        const usersList = Joi.array().items(Joi.object().keys({
          id: Joi.number(),
          name: Joi.string(),
          email: Joi.string(),
          password: Joi.string(),
          data_nascimento: Joi.string(),
          cpf: Joi.string(),
          rg: Joi.string(),
          cep: Joi.string(),
          estado: Joi.string(),
          cidade: Joi.string(),
          logradouro: Joi.string(),
          numero: Joi.number(),
          url_profile: Joi.string(),
          created_at: Joi.date().iso(),
          updated_at: Joi.date().iso(),
        }));

        joiAssert(res.body, usersList);
        done(err);
      });
    });
  });

  describe('GET /users/{id}', () => {
    it('should validate a single user schema', done => {
      request
      .get('/users/1')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        const usersList = Joi.object().keys({
          id: Joi.number(),
          name: Joi.string(),
          email: Joi.string(),
          password: Joi.string(),
          data_nascimento: Joi.string(),
          cpf: Joi.string(),
          rg: Joi.string(),
          cep: Joi.string(),
          estado: Joi.string(),
          cidade: Joi.string(),
          logradouro: Joi.string(),
          numero: Joi.number(),
          url_profile: Joi.string(),
          created_at: Joi.date().iso(),
          updated_at: Joi.date().iso(),
        });

        joiAssert(res.body, usersList);
        done(err);
      });
    });
  });

  describe('POST /users', () => {
    it('should validate a new user schema', done => {
      const user = {
        id: 2,
        name: 'Test User Created',
        email: 'test@mail.com',
        password: 'testPassword',
        data_nascimento: '1992-07-26',
        cpf:'',
        rg:'',
        cep:'',
        estado:'',
        cidade:'',
        logradouro:'',
        numero:666,
        url_profile:''
      };

      request
      .post('/users')
      .set('Authorization', `JWT ${token}`)
      .send(user)
      .end((err, res) => {
        const createdBook = Joi.object().keys({
          id: Joi.number(),
          name: Joi.string(),
          email: Joi.string(),
          password: Joi.string(),
          data_nascimento: Joi.string(),
          cpf: Joi.string(),
          rg: Joi.string(),
          cep: Joi.string(),
          estado: Joi.string(),
          cidade: Joi.string(),
          logradouro: Joi.string(),
          numero: Joi.number(),
          url_profile: Joi.string(),
          created_at: Joi.date().iso(),
          updated_at: Joi.date().iso(),
        });

        joiAssert(res.body, createdBook);
        done(err);
      });
    });
  });

  describe('PUT /users/{id}', () => {
    it('should validate a updated user', done => {
      const user = {
        id: 2,
        name: 'Test User Updated',
        email: 'test@mail.com',
        password: 'testPassword',
        data_nascimento: '1992-07-26',
        cpf:'',
        rg:'',
        cep:'',
        estado:'',
        cidade:'',
        logradouro:'',
        numero:666,
        url_profile:''
      };

      request
      .put('/users/2')
      .set('Authorization', `JWT ${token}`)
      .send(user)
      .end((err, res) => {
        const updatedCount = Joi.array().items(1);

        joiAssert(res.body, updatedCount);
        done(err);
      });
    });
  });

  describe('DELETE /users/{id}', () => {
    it('should validate a deleted user', done => {
      request
      .delete('/users/1')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        expect(res.statusCode).to.eql(HttpStatus.NO_CONTENT);
        done(err);
      });
    });
  });
});