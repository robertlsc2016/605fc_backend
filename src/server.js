const app = require('./app');
const PORT = process.env.API_PORT;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
