import PetsApi from '../../../src/api/pets'


describe('API: Pets', () => {
    describe('Get all Pets: getAll()',() => {
        it('should return a list of pets', () => {
            const Pets = {
                findAll: td.function() 
            };
            const expectedResponse = [{
                id:1,
                name: 'Teddy',
                created_at: '2017-12-07 22:54:32.851',
                updated_at: '2017-12-07 22:54:32.851'
            }];

            td.when(Pets.findAll({})).thenResolve(expectedResponse);

            const petsApi = new PetsApi(Pets);
            return petsApi.getAll()
                .then(response => expect(response.data).to.be.eql(expectedResponse))
        });
    });


    describe('Get a Pet: getById()',() => {
        it('should return a pet', () => {
            const Pets = {
                findOne: td.function() 
            };

            const expectedResponse = {
                id:1,
                name: 'Teddy',
                created_at: '2017-12-07 22:54:32.851',
                updated_at: '2017-12-07 22:54:32.851'
            };

            td.when(Pets.findOne({where: {id: 1}})).thenResolve(expectedResponse);

            const petsApi = new PetsApi(Pets);
            return petsApi.getById({id:1})
                .then(response => expect(response.data).to.be.eql(expectedResponse))
        });
    });


    describe('Create a Pet: create()',() => {
        it('should create a pet', () => {
            const Pets = {
                create: td.function() 
            };

            const requestBody = {
                name: 'Hamtaro'
            }

            const expectedResponse = {
                id:1,
                name: 'Hamtaro',
                created_at: '2017-12-07 22:54:32.851',
                updated_at: '2017-12-07 22:54:32.851'
            };

            td.when(Pets.create(requestBody)).thenResolve(expectedResponse);

            const petsApi = new PetsApi(Pets);
            return petsApi.create(requestBody)
                .then(response => {
                    expect(response.statusCode).to.be.eql(201)
                    expect(response.data).to.be.eql(expectedResponse)
                });
        });
    });

    describe('Update a Pet: update()',() => {
        it('should update a pet', () => {
            const Pets = {
                update: td.function() 
            };

            const requestBody = {
                id: 1,
                name: 'Hamtaro Atualizado'
            }

            const expectedResponse = {
                id:1,
                name: 'Hamtaro',
                created_at: '2017-12-07 22:54:32.851',
                updated_at: '2017-12-07 22:54:32.851'
            };

            td.when(Pets.update(requestBody, {where: {id: 1}})).thenResolve(expectedResponse);

            const petsApi = new PetsApi(Pets);
            return petsApi.update(requestBody, {id: 1})
                .then(response => 
                    expect(response.data).to.be.eql(expectedResponse));
        });
    });


    describe('Delete a Pet: delete()',() => {
        it('should delete a pet', () => {
            const Pets = {
                destroy: td.function() 
            };

            td.when(Pets.destroy({where: {id: 1}})).thenResolve({});

            const petsApi = new PetsApi(Pets);
            return petsApi.delete({id: 1})
                .then(response => 
                    expect(response.statusCode).to.be.eql(204));
        });
    });

});