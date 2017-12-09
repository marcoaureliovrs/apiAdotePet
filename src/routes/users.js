import UsersApi from '../api/users';

export default (app, Pets) => {

    const usersApi = new UsersApi(app.datasource.models.Users);

    app.route('/users')
    .all(app.auth.authenticate())
    .get((req, res) =>{
        usersApi.getAll()
            .then(response => {
                res.status(response.statusCode);
                res.json(response.data);
            });
    })
    .post((req, res) =>{
        usersApi.create(req.body)
            .then(response => {
                res.status(response.statusCode);
                res.json(response.data);
            });
    });
    
    app.route('/users/:id')
    .all(app.auth.authenticate())
    .get((req, res) =>{
        usersApi.getById(req.params)
            .then(response => {
                res.status(response.statusCode);
                res.json(response.data);
        });
        
    })
    .put((req, res) =>{
        usersApi.update(req.body, req.params)
            .then(response => {
                res.status(response.statusCode);
                res.json(response.data);
        });
        
    })
    .delete((req, res) =>{
        usersApi.delete(req.params)
            .then(response => {
                res.status(response.statusCode);
                res.json(response.data);
        });
    });

}

