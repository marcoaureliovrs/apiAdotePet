import PetsApi from '../api/pets';

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
                res.status(response.statusCode);
                res.json(response.data);
            });
    });
    
    app.route('/pets/:id')
    .all(app.auth.authenticate())
    .get((req, res) =>{
        petsApi.getById(req.params)
            .then(response => {
                res.status(response.statusCode);
                res.json(response.data);
        });
        
    })
    .put((req, res) =>{
        petsApi.update(req.body, req.params)
            .then(response => {
                res.status(response.statusCode);
                res.json(response.data);
        });
        
    })
    .delete((req, res) =>{
        petsApi.delete(req.params)
            .then(response => {
                res.status(response.statusCode);
                res.json(response.data);
        });
    });

}

