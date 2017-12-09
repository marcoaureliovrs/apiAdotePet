import app from './app';

app.listen(app.get('port'), () => {
    console.log(`Aplicação executando na porta ${app.get('port')}`);
});