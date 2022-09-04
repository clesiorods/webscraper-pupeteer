const express = require("express");
const robo = require("./robo");

const app = express();

app.use(express.json());

app.get('/noticias', async (request, response) => {

    const noticias = await robo();

    return response.json({
        success: true,
        message: "Deu certo",
        noticias: noticias
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor rodando na porta 3000");
});