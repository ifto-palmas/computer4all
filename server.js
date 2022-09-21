const express = require('express');
const app = express();

app.use(express.static("public"));
app.use(express.json());

app.get('/', (_, res) => res.sendFile('/index.html'));

const DEFAULT_PORT = 8080;

//Porta usada externamente, quando o app é executado em um servidor como heroku.com
const PORT = process.env.PORT || DEFAULT_PORT;
const HOST = process.env.SERVER || "localhost"
const ADDRESS = PORT == 80 ? HOST : `${HOST}:${PORT}`;

app.listen(PORT, () => {
    console.log(`\n\nServidor iniciado. Abra o navegador em http://${ADDRESS}\n`);
});
