const express = require("express");
const robo = require("./robo");

const app = express();

app.use(express.json());

app.get('/', async (request, response) => {

    const noticias = await robo();

    return response.json({
        success: true,
        message: "Deu certo",
        noticias: noticias
    })
})

app.listen(3333, () => {
    console.log("Servidor rodando na porta 3333");
});