import HttpStatus from 'http-status';

const defaultResponse = (data, statusCode = HttpStatus.OK) =>({
    data,
    statusCode
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
    error: message
}, statusCode);


class PetsApi {
    constructor(Pets) {
        this.Pets = Pets;
    }

    getAll() {
    return this.Pets.findAll({})
            .then(result => defaultResponse(result))
            .catch(error => errorResponse(error.message));
    }

    getById(params) {
        return this.Pets.findOne({where: params})
            .then(result => defaultResponse(result))
            .catch(error => errorResponse(error.message));
    }

    create(data) {
        return this.Pets.create(data)
            .then(result => defaultResponse(result, HttpStatus.CREATED))
            .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
    }

    update(data, params) {
        return this.Pets.update(data, {where: params})
            .then(result => defaultResponse(result))
            .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
    }

    delete(params) {
        return this.Pets.destroy({where: params})
            .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
            .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
    }

}

export default PetsApi;