import PetsApi from '../api/pets';
import HttpStatus from 'http-status';
import memcached from '../../config/memcached';

const TYPE_OBJECT = 'pet';

export default (app, Pets) => {

    const petsApi = new PetsApi(app.datasource.models.Pets);

    app.route('/pets')
    .all(app.auth.authenticate())
    .get((req, res) =>{
        petsApi.getAll()
            .then(response => {
                res.status(response.statusCode);
                res.json(response.data);
            });
        
    })
    .post((req, res) =>{
        petsApi.create(req.body)
            .then(response => {
                if(response.statusCode == HttpStatus.CREATED){
                    memcached.set(TYPE_OBJECT+response.data.id, response.data, 60000)
                        .then(success => console.log(`Objeto ${TYPE_OBJECT+response.data.id} adicionado com sucesso`))
                        .catch(err => console.log(`Erro ao adicionar objeto ${TYPE_OBJECT+response.data.id}: \n ${err}`));
                }
                res.status(response.statusCode);
                res.json(response.data);
            });
    });
    
    app.route('/pets/:id')
    .all(app.auth.authenticate())
    .get((req, res) =>{
        memcached.get(TYPE_OBJECT+req.params.id)
            .then(sucess => {
                res.status(HttpStatus.Ok);
                res.json(sucess);
                console.log(`HIT - valor ${JSON.stringify(suceess)}`);
            }).catch( err => {
                console.log(`MISS - chave não encontrada ${TYPE_OBJECT+req.params.id}`);
                petsApi.getById(req.params)
                    .then(response => {
                        if(response.statusCode == HttpStatus.OK){
                            memcached.set(TYPE_OBJECT+response.data.id, response.data, 60000)
                                .then(success => console.log(`Objeto ${TYPE_OBJECT+response.data.id} adicionado com sucesso`))
                                .catch(err => console.log(`Erro ao adicionar objeto ${TYPE_OBJECT+response.data.id}: \n ${err}`));
                        }
                        res.status(response.statusCode);
                        res.json(response.data);
                    });
            });
        
    })
    .put((req, res) =>{
        petsApi.update(req.body, req.params)
            .then(response => {
                if(response.statusCode == HttpStatus.OK) {
                    //Removendo do cache o registro antigo
                    memcached.del(TYPE_OBJECT+req.params.id)
                        .then(sucess => console.log(`Objeto ${TYPE_OBJECT+req.params.id} foi removido com sucesso`))
                        .catch(err => console.log(`Erro ao remover o objeto ${TYPE_OBJECT+req.params.id}, provavelmente não exista no cache`));
                    //Adicionando ao cache o novo registro
                    memcached.set(TYPE_OBJECT+response.data.id, response.data, 60000)
                        .then(success => console.log(`Objeto ${TYPE_OBJECT+response.data.id} foi atualizado com sucesso`))
                        .catch(err => console.log(`Erro ao adicionar objeto ${TYPE_OBJECT+response.data.id}: \n ${err}`));
                }

                res.status(response.statusCode);
                res.json(response.data);
        });
        
    })
    .delete((req, res) =>{
        petsApi.delete(req.params)
            .then(response => {
                if(response.statusCode == HttpStatus.NO_CONTENT) {
                    memcached.del(TYPE_OBJECT+req.params.id)
                        .then(sucess => console.log(`Objeto ${TYPE_OBJECT+req.params.id} foi removido com sucesso`))
                        .catch(err => console.log(`Erro ao remover o objeto ${TYPE_OBJECT+req.params.id}, provavelmente não exista no cache`));
                }
                res.status(response.statusCode);
                res.json(response.data);
        });
    });

}

