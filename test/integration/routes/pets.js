import HttpStatus from 'http-status';
import jwt from 'jwt-simple';

describe('Routes pets', () => {
   
    const Users = app.datasource.models.Users;

    const jwtSecret = app.config.jwtSecret;
    console.log(jwtSecret);
    
    const Pets = app.datasource.models.Pets;
    
    const defaultPet = {
        id: 1,
        name: 'Teddy',
        description: 'Cachorro dócil',
        img_pet: 'https://scontent.fcgh8-1.fna.fbcdn.net/v/t1.0-9/13256383_559531604228416_9042595307216890191_n.jpg?oh=6300c8557fe114b19e75689a7b256b49&oe=5ABFAF2C'
    };
let token;

     before(done => {
        Users
        .destroy({ where: {} })
        .then(() => Users.create({
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

    describe('Route GET /pets', () => {
        it('should return a list of pets', done=> {
            request
                .get('/pets')
                .set('Authorization', `JWT ${token}`)
                .end((err, res) =>{
                    expect(res.body[0].id).to.be.eql(defaultPet.id);
                    expect(res.body[0].name).to.be.eql(defaultPet.name);
                    expect(res.body[0].description).to.be.eql(defaultPet.description);
                    console.log(res.body);              
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
                    console.log(res.body);             
                    done(err);
                });
        });
    });

    describe('Route POST /pets', () => {
        it('should create a pet', done=> {
            const newPet = {
                id: 2,
                name: 'Hamtaro',
                description: 'Hamster dócil',
                img_pet: 'https://scontent.fcgh8-1.fna.fbcdn.net/v/t1.0-9/13256383_559531604228416_9042595307216890191_n.jpg?oh=6300c8557fe114b19e75689a7b256b49&oe=5ABFAF2C'
            };
            request
                .post('/pets')
                .set('Authorization', `JWT ${token}`)
                .send(newPet)
                .end((err, res) =>{
                    expect(res.body.id).to.be.eql(newPet.id);
                    expect(res.body.name).to.be.eql(newPet.name);
                    expect(res.body.description).to.be.eql(newPet.description);
                    console.log(res.body);                     
                    done(err);
                });
        });
    });

    describe('Route PUT /pets/{id}', () => {
        it('should update a pet', done=> {
            
            const updatedPet = {
                name: 'Hamtaro Hamster',
                description: 'Hamster dócil',
                img_pet: 'https://scontent.fcgh8-1.fna.fbcdn.net/v/t1.0-9/13256383_559531604228416_9042595307216890191_n.jpg?oh=6300c8557fe114b19e75689a7b256b49&oe=5ABFAF2C'
            };
            request
                .put('/pets/2')
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