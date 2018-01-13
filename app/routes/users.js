import HttpStatus from 'http-status';
import UsersApi from '../api/users';
import memcached from '../../config/memcached';

const TYPE_OBJECT = 'user';

export default (app, Pets) => {

    const usersApi = new UsersApi(app.datasource.models.Users);

    app.route('/user')
    .post((req, res) =>{
        console.log(req.body);
        usersApi.create(req.body)
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

    app.route('/users')
    .all(app.auth.authenticate())
    .get((req, res) =>{
        usersApi.getAll()
            .then(response => {
                res.status(response.statusCode);
                res.json(response.data);
            });
    });
    
    app.route('/users/:id')
    .all(app.auth.authenticate())
    .get((req, res) =>{
        memcached.get(TYPE_OBJECT+req.params.id)
            .then(sucess => {
                res.status(HttpStatus.Ok);   
                res.json(sucess);
                console.log(`HIT - valor ${JSON.stringify(suceess)}`);
            }).catch( err => {
                console.log(`MISS - chave não encontrada ${TYPE_OBJECT+req.params.id}`);
                usersApi.getById(req.params)
                    .then(response => {
                        if(response.statusCode == HttpStatus.OK){
                            memcached.set(TYPE_OBJECT+response.data.id, response.data, 60000)
                                .then(success => console.log(`Objeto ${TYPE_OBJECT+response.data.id} foi adicionado com sucesso`))
                                .catch(err => console.log(`Erro ao adicionar objeto ${TYPE_OBJECT+response.data.id}: \n ${err}`));
                        }
                        res.status(response.statusCode);
                        res.json(response.data);
                    });
            });    
              
    })
    .put((req, res) =>{
        console.log(req.body);
        usersApi.update(req.body, req.params)
            .then(response => {
                if(response.statusCode == HttpStatus.OK) {
                    //Removendo do cache o registro antigo
                    memcached.del(TYPE_OBJECT+req.params.id)
                        .then(sucess => console.log(`Objeto ${TYPE_OBJECT+req.params.id} foi removido com sucesso`))
                        .catch(err => console.log(`Erro ao remover o objeto ${TYPE_OBJECT+req.params.id}, provavelmente não exista no cache`));
                    //Adicionando ao cache o novo registro
                    memcached.set(TYPE_OBJECT+response.data.id, response.data, 60000)
                        .then(success => console.log(`Objeto ${TYPE_OBJECT}${response.data.id} foi atualizado com sucesso`))
                        .catch(err => console.log(`Erro ao adicionar objeto ${TYPE_OBJECT+response.data.id}: \n ${err}`));
                    }
                res.status(response.statusCode);
                res.json(response.data);
        });
        
    })
    .delete((req, res) =>{
        usersApi.delete(req.params)
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

