describe('Routes pets', () => {
    const Users = app.datasource.models.Users;
    const Pets = app.datasource.models.Pets;
    const defaultPets = {
        id: 1,
        name: 'Teddy',
        description: 'Cachorro dócil'
    };

    let token;

    beforeEach(done => {
        Pets
            .destroy({where: {}})
            .then(() => Pets.create(defaultPets))
            .then(() => {
                done();
            });
    });


    describe('Route GET /pets', () => {
        it('should return a list of pets', done=> {
            const petsList = Joi.array().items(Joi.object().keys({
                id: Joi.number(),
                name: Joi.string(),
                description: Joi.string(),
                created_at: Joi.date().iso(),
                updated_at: Joi.date().iso()

            }));

            request
                .get('/pets')
                .set('Authorization', `JWT ${token}`)
                .end((err, res) =>{
                    joiAssert(res.body, petsList);            
                    done(err);
                })
        });
    });

    describe('Route GET /pets/{id}', () => {
        it('should return a pet', done=> {
            const pet = Joi.object().keys({
                id: Joi.number(),
                name: Joi.string(),
                description: Joi.string(),
                created_at: Joi.date().iso(),
                updated_at: Joi.date().iso()

            });
            request
                .get('/pets/1')
                .set('Authorization', `JWT ${token}`)
                .end((err, res) =>{
                    joiAssert(res.body, pet);          
                    done(err);
                })
        });
    });

    describe('Route POST /pets', () => {
        it('should create a pet', done=> {
            const newPet = {
                id: 2,
                name: 'Hamtaro',
                description: 'Hamster dócil'
            };

            const pet = Joi.object().keys({
                id: Joi.number(),
                name: Joi.string(),
                description: Joi.string(),
                created_at: Joi.date().iso(),
                updated_at: Joi.date().iso()

            });

            request
                .post('/pets')
                .set('Authorization', `JWT ${token}`)
                .send(newPet)
                .end((err, res) =>{
                    joiAssert(res.body, pet);             
                    done(err);
                })
        });
    });

    describe('Route PUT /pets/{id}', () => {
        it('should update a pet', done=> {
            
            const updatedPet = {
                id: 2,
                name: 'Hamtaro Hamster',
                description: 'Hamster dócil'
            };

            const updatedCount = Joi.array().items(1);
            
            request
                .put('/pets/1')
                .set('Authorization', `JWT ${token}`)
                .send(updatedPet)
                .end((err, res) =>{
                    joiAssert(res.body, updatedCount)           
                    done(err);
                })
        });
    });

    describe('Route DELETE /pets/{id}', () => {
        it('should delete a pet', done=> {
            request
                .delete('/pets/1')
                .set('Authorization', `JWT ${token}`)
                .end((err, res) =>{
                    expect(res.statusCode).to.be.eql(204);      
                    done(err);
                })
        });
    });


});