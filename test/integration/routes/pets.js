import HttpStatus from 'http-status';
import jwt from 'jwt-simple';

describe('Routes pets', () => {
   
    const Users = app.datasource.models.Users;
    const jwtSecret = app.config.jwtSecret; 
    
    const Pets = app.datasource.models.Pets;
    
    const defaultPet = {
        id: 1,
        name: 'Teddy',
        description: 'Cachorro dócil'
    };

    let token;

/**
 
     beforeEach(done => {
        Users
        .destroy({ where: {} })
        .then(() => Users.create({
          id: 1,
          name: 'John',
          email: 'john@gmail.com',
          password: '12345',
        }))
        .then(user => {
          Pets
          .destroy({ where: {} })
          .then(() => Pets.create(defaultPet))
          .then(() => {
            token = jwt.encode({ id: user.id }, jwtSecret);
            done();
          });
        });
      });
*/

    const defaultUser = {
        id: 1,
        name: 'Usuário Teste',
        email: 'teste@teste.com.br',
        password: 'teste1020'
    };

    beforeEach(done => {
        Users
        .destroy({where: {}})
        .then(() => Users.create(defaultUser))
        .then(user => {
          token = jwt.encode({id: user.id}, jwtSecret);
          done();
        });
      });

    describe('Route GET /pets', () => {
        it('should return a list of pets', done=> {
            request
                .get('/pets')
                .set('Authorization', `JWT ${token}`)
                .end((err, res) =>{
                    expect(res.body[0].id).to.be.eql(defaultPet.id);
                    expect(res.body[0].name).to.be.eql(defaultPet.name);
                    expect(res.body[0].description).to.be.eql(defaultPet.description);              
                    done(err);
                });
        });
    });

    describe('Route GET /pets/{id}', () => {
        it('should return a pet', done=> {
            request
                .get('/pets/1')
                .set('Authorization', `JWT ${token}`)
                .end((err, res) =>{
                    expect(res.body.id).to.be.eql(defaultPet.id);
                    expect(res.body.name).to.be.eql(defaultPet.name);
                    expect(res.body.description).to.be.eql(defaultPet.description);                
                    done(err);
                });
        });
    });

    describe('Route POST /pets', () => {
        it('should create a pet', done=> {
            const newPet = {
                id: 2,
                name: 'Hamtaro',
                description: 'Hamster dócil'
            };
            request
                .post('/pets')
                .set('Authorization', `JWT ${token}`)
                .send(newPet)
                .end((err, res) =>{
                    expect(res.body.id).to.be.eql(newPet.id);
                    expect(res.body.name).to.be.eql(newPet.name);
                    expect(res.body.description).to.be.eql(newPet.description);                
                    done(err);
                });
        });
    });

    describe('Route PUT /pets/{id}', () => {
        it('should update a pet', done=> {
            
            const updatedPet = {
                id: 2,
                name: 'Hamtaro Hamster',
                description: 'Hamster dócil'
            };
            request
                .put('/pets/1')
                .set('Authorization', `JWT ${token}`)
                .send(updatedPet)
                .end((err, res) =>{
                    expect(res.body).to.be.eql([1]);              
                    done(err);
                });
        });
    });

    describe('Route DELETE /pets/{id}', () => {
        it('should delete a pet', done=> {
            request
                .delete('/pets/1')
                .set('Authorization', `JWT ${token}`)
                .end((err, res) =>{
                    expect(res.statusCode).to.be.eql(HttpStatus.NO_CONTENT);      
                    done(err);
                });
        });
    });


});