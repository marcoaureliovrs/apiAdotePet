import app from './config/express';


app.datasource.sequelize.sync().done(() => {
    app.listen(app.get('port'), () => {
        console.log(`Aplicação executando na porta ${app.get('port')}`);
    });
});